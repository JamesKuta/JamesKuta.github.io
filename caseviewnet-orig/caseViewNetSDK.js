/**
 * caseViewNetSDK - JavaScript SDK to implement Case View Net in a Browser protocol
 *
 * @link    http://stenograph.com
 * @license For open source use: 
 *          For commercial use: 
 * @author  Daniel Bednarczyk
 * @version 1.0.0
 *
 */


"use strict";


var CaseViewNet = function (guid, demoMode) {
    //reference to self (this)
    var caseViewNet = this;

    /*
    *
    * mainBuffer is a main structure of the document that holds entire document data in a raw (json) format
    * Main components:
    *  - index of mainBuffer corresponds to line number of the document
    *  - timestamp - string - date and time of the line
    *  - data - string - content of the line
    *  - selected - user selected the line
    *  - page - int - page number on the line
    *  - paragraph - bool - starts a new paragraph
    *
    */
    this.mainBuffer = new Array();

    //byte buffer that holds the same data in byte form
    //this is needed to properly support all unicode characters
    //this data is uintArray
    this.mainByteBuffer = new Array();


    //url of SSE server
    this.URL = 'https://cvstream.cloud.stenograph.com/stream';
    //App guid
    this.GUID = guid;
    //eventID co communicate with the server
    this.lastEventId = 0;
    //EventSource object to manage SSE connection
    this.SSEHandler = null;
    //is connected to SSE
    this.Connected = false;

    this.ClientName = "";

    this.ClientEmail = "";

    this.SessionCode = "";


    this.LogMessage = '';

    this.ChatUsersList = new Array();

    


    this.LastReceivedHeartbeat = new Date();
    this.ReconnectTimeout = 10000; //10 sec
    this.ReconnectInterval;

    this.DemoMode = demoMode;
    /*
    * callback methods
    */
    this.cbOnConnectionOpen = null;
    this.cbOnConnectionError = null;
    this.cbOnMessage = null;
    this.cbOnSaveRights = null;
    this.cbOnEndOfDocument = null;
    this.cbOnCloseConnection = null;
    this.cbOnStartNewDocument = null;
    this.cbOnInsertLine = null;
    this.cbOnDeleteLine = null;
    this.cbOnReplaceLine = null;
    this.cbOnModifyLineInsert = null;
    this.cbOnModifyLineRemove = null;
    this.cbOnModifyLineReplace = null;
    this.cbOnUpdateLineDetail = null;
    this.cbOnLogMessage = null;
    this.cbOnChatUserList = null;
    this.cbOnChatMessage = null;

    
    //register callback methods
    this.registerCallbacks = function (cbOnConnectionOpen, 
                                        cbOnConnectionError, 
                                        cbOnMessage,
                                        cbOnSaveRights,
                                        cbOnEndOfDocument,
                                        cbOnCloseConnection,
                                        cbOnStartNewDocument,
                                        cbOnInsertLine,
                                        cbOnDeleteLine,
                                        cbOnReplaceLine,
                                        cbOnModifyLineInsert,
                                        cbOnModifyLineRemove,
                                        cbOnModifyLineReplace,
                                        cbOnUpdateLineDetail,
                                        cbOnLogMessage,
                                        cbOnChatUserList,
                                        cbOnChatMessage) {
        caseViewNet.cbOnConnectionOpen = cbOnConnectionOpen;
        caseViewNet.cbOnConnectionError = cbOnConnectionError;
        caseViewNet.cbOnMessage = cbOnMessage;
        caseViewNet.cbOnSaveRights = cbOnSaveRights;
        caseViewNet.cbOnEndOfDocument = cbOnEndOfDocument;
        caseViewNet.cbOnCloseConnection = cbOnCloseConnection;
        caseViewNet.cbOnStartNewDocument = cbOnStartNewDocument;
        caseViewNet.cbOnInsertLine = cbOnInsertLine;
        caseViewNet.cbOnDeleteLine = cbOnDeleteLine;
        caseViewNet.cbOnReplaceLine = cbOnReplaceLine;
        caseViewNet.cbOnModifyLineInsert = cbOnModifyLineInsert;
        caseViewNet.cbOnModifyLineRemove = cbOnModifyLineRemove;
        caseViewNet.cbOnModifyLineReplace = cbOnModifyLineReplace;
        caseViewNet.cbOnUpdateLineDetail = cbOnUpdateLineDetail;
        caseViewNet.cbOnLogMessage = cbOnLogMessage;
        caseViewNet.cbOnChatUserList = cbOnChatUserList;
        caseViewNet.cbOnChatMessage = cbOnChatMessage;
    };

    this.setURL = function (url) {
        caseViewNet.URL = url;
    };

    this.setClientName = function (name) {
        caseViewNet.ClientName = name;
    };

    this.setClientEmail = function (email) {
        caseViewNet.ClientEmail = email;
    };

    this.setSessionCode = function(sesionCode) {
        caseViewNet.SessionCode = sessionCode;
    };

    this.closeSSE = function () {
        if (caseViewNet.SSEHandler) {
            if(!caseViewNet.DemoMode) {
                caseViewNet.SSEHandler.close();
            }
            caseViewNet.SSEHandler = null;
        }
        caseViewNet.Connected = false;

        if(caseViewNet.ReconnectInterval) {
            clearInterval(caseViewNet.ReconnectInterval);
        }
    };



    this.openSSEPageInNewTab = function() {
        //console.log('openSSEPageInNewTab()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'openSSEPageInNewTab()\r\n';

        var url = caseViewNet.URL + '?GUID=' + caseViewNet.GUID + '&Last-Event-ID=' + caseViewNet.lastEventId;
        //for debugging purpose only, not enabled in production
        //window.open(url, '_blank');
    };

    this.resetSSEConnection = function () {
        //console.log('resetSSEConnection()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'resetSSEConnection()\r\n';

        caseViewNet.lastEventId = 0;
        caseViewNet.startSSEConnection();
    };

    /*
    * event handlers for SSE connection 
    */
    this.startSSEConnection = function () {
        //console.log('startSSEConnection()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'startSSEConnection()\r\n';
        var url = caseViewNet.URL + '?GUID=' + caseViewNet.GUID + '&Last-Event-ID=' + caseViewNet.lastEventId;
        
        caseViewNet.closeSSE();

        if(caseViewNet.DemoMode) {
            caseViewNet.SSEHandler = document.createElement('div');
        }
        else {
            caseViewNet.SSEHandler = new EventSource(url);
        }

        caseViewNet.LastReceivedHeartbeat = new Date();

        if(caseViewNet.ReconnectInterval) {
            clearInterval(caseViewNet.ReconnectInterval);
        }
        if(!caseViewNet.DemoMode)
        {
            caseViewNet.ReconnectInterval = setInterval(caseViewNet.checkReconnect, caseViewNet.ReconnectTimeout);
        }
        
        caseViewNet.SSEHandler.addEventListener('open', function (event) {
            ////console.log('CaseViewNet startSSEConnection on open');
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on open\r\n';
            caseViewNet.Connected = true;

            caseViewNet.LastReceivedHeartbeat = new Date();

            if (caseViewNet.cbOnConnectionOpen) {
                caseViewNet.cbOnConnectionOpen();
            }
            
        }, false);


        caseViewNet.SSEHandler.addEventListener('error', function (event) {
            //console.log('CaseViewNet startSSEConnection on error');
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on error\r\n';
            if (caseViewNet.cbOnConnectionError) {
                caseViewNet.cbOnConnectionError();
            }

        }, false);


        //Default receiver, All unspecified Event messages will end up here.
        caseViewNet.SSEHandler.addEventListener('message', function (event) {
            //console.log('CaseViewNet startSSEConnection on message');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on message\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            if (caseViewNet.cbOnMessage) {
                caseViewNet.cbOnMessage(event);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('Heartbeat', function (event) {
            //console.log('CaseViewNet startSSEConnection on Heartbeat');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on Heartbeat\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

        }, false);


        caseViewNet.SSEHandler.addEventListener('SaveRights', function (event) {
            //console.log('CaseViewNet startSSEConnection on SaveRights');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on SaveRights\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            if (caseViewNet.cbOnSaveRights) {
                caseViewNet.cbOnSaveRights(event.data == 'true');
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('EndOfDocument', function (event) {
            //console.log('CaseViewNet startSSEConnection on EndOfDocument');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on EndOfDocument\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            //disable auto reconnect
            caseViewNet.closeSSE();
            
            if (caseViewNet.cbOnEndOfDocument) {
                caseViewNet.cbOnEndOfDocument();
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('CloseConnection', function (event) {
            //console.log('CaseViewNet startSSEConnection on CloseConnection');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on CloseConnection\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.closeSSE();

            if (caseViewNet.cbOnCloseConnection) {
                caseViewNet.cbOnCloseConnection(event.data);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('StartNewDocument', function (event) {
            //console.log('CaseViewNet startSSEConnection on StartNewDocument');
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on StartNewDocument\r\n';

            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);
            var data = JSON.parse(event.data);

            caseViewNet.generateNewDocument(data);

            if (caseViewNet.cbOnStartNewDocument) {
                caseViewNet.cbOnStartNewDocument();
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('InsertLine', function (event) {
            //console.log('CaseViewNet startSSEConnection on InsertLine');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on InsertLine\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;
            var lineData = line.data;
            var uintArrayData = stringToUint(lineData);

            caseViewNet.mainByteBuffer.splice(lineNo, 0, uintArrayData);

            caseViewNet.mainBuffer.splice(lineNo, 0, { timestamp: line.timestamp, page: line.page, line: -1, paragraph: line.paragraph, selected: false, data: lineData });// insert one line

            caseViewNet.renumberLines(lineNo);

            if (caseViewNet.cbOnInsertLine) {
                caseViewNet.cbOnInsertLine(lineNo);
            }
            
        }, false);


        caseViewNet.SSEHandler.addEventListener('DeleteLine', function (event) {
            //console.log('CaseViewNet startSSEConnection on DeleteLine');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on DeleteLine\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;

            caseViewNet.mainByteBuffer.splice(lineNo, 1);

            caseViewNet.mainBuffer.splice(lineNo, 1);//remove 1 line

            caseViewNet.renumberLines(lineNo);

            if (caseViewNet.cbOnDeleteLine) {
                caseViewNet.cbOnDeleteLine(lineNo);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('ReplaceLine', function (event) {
            //console.log('CaseViewNet startSSEConnection on ReplaceLine');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on ReplaceLine\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;
            var lineData = line.data;

            var uintArrayData = stringToUint(lineData);

            caseViewNet.mainByteBuffer[lineNo] = uintArrayData;

            var pageNumber = caseViewNet.mainBuffer[lineNo].page;
            var lineNumber = caseViewNet.mainBuffer[lineNo].line;

            caseViewNet.mainBuffer[lineNo] = { timestamp: line.timestamp, page: line.page, line: lineNumber, paragraph: line.paragraph, selected: false, data: lineData };

            if (pageNumber != line.page) {
                caseViewNet.renumberLines(lineNo);
            }

            if (caseViewNet.cbOnReplaceLine) {
                caseViewNet.cbOnReplaceLine(lineNo);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('ModifyLineInsert', function (event) {
            //console.log('CaseViewNet startSSEConnection on ModifyLineInsert');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on ModifyLineInsert\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();
            
            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;
            var lineData = line.data;

            var uintArrayData = stringToUint(lineData);

            var currentUintArrayData = caseViewNet.mainByteBuffer[lineNo];

            var beforeArr = $(currentUintArrayData).slice(0, line.offset);
            var afterArr = $(currentUintArrayData).slice(line.offset);

            var newArr = new Uint8Array(beforeArr.length + uintArrayData.length + afterArr.length);
            newArr.set(beforeArr);
            newArr.set(uintArrayData, beforeArr.length);
            newArr.set(afterArr, beforeArr.length + uintArrayData.length);

            caseViewNet.mainByteBuffer[lineNo] = newArr;

            var bufferedLine = caseViewNet.mainBuffer[lineNo];

            var pageNumber = bufferedLine.page;
            var lineNumber = bufferedLine.line;

            caseViewNet.mainBuffer[lineNo] = { timestamp: line.timestamp, page: line.page, line: lineNumber, paragraph: line.paragraph, selected: bufferedLine.selected, data: uintToString(newArr) };

            if (pageNumber != line.page) {
                caseViewNet.renumberLines(lineNo);
            }
            
            if (caseViewNet.cbOnModifyLineInsert) {
                caseViewNet.cbOnModifyLineInsert(lineNo);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('ModifyLineRemove', function (event) {
            //console.log('CaseViewNet startSSEConnection on ModifyLineRemove');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on ModifyLineRemove\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;

            var currentUintArrayData = caseViewNet.mainByteBuffer[lineNo];

            var beforeArr = $(currentUintArrayData).slice(0, line.offset);
            var afterArr = $(currentUintArrayData).slice(line.offset + line.length);

            var newArr = new Uint8Array(beforeArr.length + afterArr.length);
            newArr.set(beforeArr);
            newArr.set(afterArr, beforeArr.length);

            caseViewNet.mainByteBuffer[lineNo] = newArr;

            var bufferedLine = caseViewNet.mainBuffer[lineNo];

            var pageNumber = bufferedLine.page;
            var lineNumber = bufferedLine.line;

            caseViewNet.mainBuffer[lineNo] = { timestamp: line.timestamp, page: line.page, line: lineNumber, paragraph: line.paragraph, selected: bufferedLine.selected, data: uintToString(newArr) };

            if (pageNumber != line.page) {
                caseViewNet.renumberLines(lineNo);
            }

            if (caseViewNet.cbOnModifyLineRemove) {
                caseViewNet.cbOnModifyLineRemove(line.line);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('ModifyLineReplace', function (event) {
            //console.log('CaseViewNet startSSEConnection on ModifyLineReplace');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on ModifyLineReplace\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;
            var lineData = line.data;

            var uintArrayData = stringToUint(lineData);

            var currentUintArrayData = caseViewNet.mainByteBuffer[lineNo];

            var beforeArr = $(currentUintArrayData).slice(0, line.offset);
            var afterArr = $(currentUintArrayData).slice(line.offset + line.length);

            var newArr = new Uint8Array(beforeArr.length + uintArrayData.length + afterArr.length);
            newArr.set(beforeArr);
            newArr.set(uintArrayData, beforeArr.length);
            newArr.set(afterArr, beforeArr.length + uintArrayData.length);

            caseViewNet.mainByteBuffer[lineNo] = newArr;

            var bufferedLine = caseViewNet.mainBuffer[lineNo];

            var pageNumber = bufferedLine.page;
            var lineNumber = bufferedLine.line;

            caseViewNet.mainBuffer[lineNo] = { timestamp: line.timestamp, page: line.page, line: lineNumber, paragraph: line.paragraph, selected: bufferedLine.selected, data: uintToString(newArr) };

            if (pageNumber != line.page) {
                caseViewNet.renumberLines(lineNo);
            }

            if (caseViewNet.cbOnModifyLineReplace) {
                caseViewNet.cbOnModifyLineReplace(line.line);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('UpdateLineDetail', function (event) {
            //console.log('CaseViewNet startSSEConnection on UpdateLineDetail');
            //console.log(event.data);
            caseViewNet.LogMessage += new Date() + '\r\n';
            caseViewNet.LogMessage += 'CaseViewNet startSSEConnection on UpdateLineDetail\r\n';
            caseViewNet.LogMessage += event.data + '\r\n';
            caseViewNet.LastReceivedHeartbeat = new Date();

            caseViewNet.lastEventId = parseInt(event.lastEventId);

            var line = JSON.parse(event.data);
            var lineNo = line.line;
            var pageNumber = caseViewNet.mainBuffer[lineNo].page;
            
            caseViewNet.mainBuffer[lineNo].timestamp = line.timestamp;
            caseViewNet.mainBuffer[lineNo].page = line.page;
            caseViewNet.mainBuffer[lineNo].paragraph = line.paragraph;

            if (pageNumber != line.page) {
                caseViewNet.renumberLines(lineNo);
            }

            if (caseViewNet.cbOnUpdateLineDetail) {
                caseViewNet.cbOnUpdateLineDetail(line.line);
            }

        }, false);


        caseViewNet.SSEHandler.addEventListener('ChatUserList', function (event) {
            //console.log('CaseViewNet startSSEConnection on ChatUserList');
            //console.log(event.data);
            
            caseViewNet.ChatUsersList = JSON.parse(event.data);

            if (caseViewNet.cbOnChatUserList) {
                caseViewNet.cbOnChatUserList();
            }
        }, false);


        caseViewNet.SSEHandler.addEventListener('ChatMessage', function (event) {
            //console.log('CaseViewNet startSSEConnection on ChatMessage');
            //console.log(event.data);
            
            var chatMessage = JSON.parse(event.data);

            if (caseViewNet.cbOnChatMessage) {
                caseViewNet.cbOnChatMessage(chatMessage);
            }
        }, false);


    };


    this.checkReconnect = function () {
        //console.log('checkReconnect()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'checkReconnect()\r\n';

        var currentTime = new Date();
        if(currentTime - caseViewNet.LastReceivedHeartbeat > caseViewNet.ReconnectTimeout)
        {
            caseViewNet.startSSEConnection();
        }
    };

    this.checkLogMessage = function() {
        //console.log('checkLogMessage()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'checkLogMessage()\r\n';
        if(caseViewNet.cbOnLogMessage) {
            caseViewNet.cbOnLogMessage(false);
        }
        caseViewNet.LogMessage = '';
    };
    setInterval(caseViewNet.checkLogMessage, 1 * 60 * 1000);//every 2 minute

    this.generateNewDocument = function (data) {
        //console.log('generateNewDocument()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'generateNewDocument()\r\n';
        var bufferSize = data.length;
        caseViewNet.mainBuffer = new Array(bufferSize);
        var line;
        for (var i = 0; i < bufferSize; ++i) {
            line = data[i];
            caseViewNet.mainBuffer[i] = { timestamp: line.timestamp, page: line.page, line: -1, 
                paragraph: line.paragraph, selected: line.selected || false, data: line.data };
            caseViewNet.mainByteBuffer[i] = stringToUint(line.data);
        }
        caseViewNet.renumberLines(0);
    };


    this.renumberLines = function(index) {
        //console.log('renumberLines()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'renumberLines()\r\n';
        var bufferSize = caseViewNet.mainBuffer.length;
        if (bufferSize == 0) {
            return;
        }

        var pageNumber = 1;
        var lineNumber = 1;
        if (index > 0) {
            pageNumber = parseInt(caseViewNet.mainBuffer[index - 1].page);
            lineNumber = parseInt(caseViewNet.mainBuffer[index - 1].line) + 1;
        }

        for (var i = index ; i < bufferSize; ++i)
        {
            if (pageNumber != caseViewNet.mainBuffer[i].page) {
                pageNumber = caseViewNet.mainBuffer[i].page;
                lineNumber = 1;
            }
            caseViewNet.mainBuffer[i].line = lineNumber++;
        }

    };

    this.generateFileName = function() {
        //console.log('generateFileName()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'generateFileName()\r\n';
        var documentDate = new Date();
        var year = '' + documentDate.getFullYear();
        var month = '' + (documentDate.getMonth() + 1);
        var day = '' + documentDate.getDate();

        var fileName = 'Transcript-' + zeroPad(year, 4) + '-' + zeroPad(month, 2) + '-' + zeroPad(day, 2);
        return fileName;
    };
    /*
    this.generateTxtFile = function () {
        //console.log('generateTxtFile()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'generateTxtFile()\r\n';
        var bufferSize = caseViewNet.mainBuffer.length;
        if (bufferSize == 0)
            return "";

        var file = '';
        for (var i = 0; i < bufferSize; ++i)
        {
            file += caseViewNet.mainBuffer[i].data + "\r\n";
        }
        return file;
    };
    */
    this.getDateString = function() {
        var bufferSize = caseViewNet.mainBuffer.length;

        if (bufferSize == 0)
            return "";

        var documentDate = new Date();

        var firstLine = caseViewNet.mainBuffer[0];
        var firstDocumentTs = firstLine.timestamp;
        if(firstDocumentTs.length > 0){
            documentDate.setHours(firstDocumentTs.substr(0,2), firstDocumentTs.substr(3,2), firstDocumentTs.substr(6,2));
        }

        // '' + int will convert to string
        var year = '' + documentDate.getFullYear();
        var month = '' + (documentDate.getMonth() + 1);
        var day = '' + documentDate.getDate();
        var hour = '' + documentDate.getHours();
        var minute = '' + documentDate.getMinutes();
        var second = '' + documentDate.getSeconds();


        var dateString = zeroPad(year, 4) + " " + zeroPad(month, 2) + " " + zeroPad(day, 2) + " ";
        dateString += zeroPad(hour, 2) + " " + zeroPad(minute, 2) + " " + zeroPad(second, 2);


        return dateString;
    };
    /*
    this.generatePtfFile = function () {
        //console.log('generatePtfFile()');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'generatePtfFile()\r\n';
        var bufferSize = caseViewNet.mainBuffer.length;

        if (bufferSize == 0)
            return "";

        var documentDate = new Date();

        var firstLine = caseViewNet.mainBuffer[0];
        var firstDocumentTs = firstLine.timestamp;
        if(firstDocumentTs.length > 0){
            documentDate.setHours(firstDocumentTs.substr(0,2), firstDocumentTs.substr(3,2), firstDocumentTs.substr(6,2));
        }

        // '' + int will convert to string
        var year = '' + documentDate.getFullYear();
        var month = '' + (documentDate.getMonth() + 1);
        var day = '' + documentDate.getDate();
        var hour = '' + documentDate.getHours();
        var minute = '' + documentDate.getMinutes();
        var second = '' + documentDate.getSeconds();


        var dateString = zeroPad(year, 4) + " " + zeroPad(month, 2) + " " + zeroPad(day, 2) + " ";
        dateString += zeroPad(hour, 2) + " " + zeroPad(minute, 2) + " " + zeroPad(second, 2);

        var file = "begin=Head\r\n";
        file += "type=ptf\r\n";
        file += "version=1.3\r\n";
        file += "end=Head\r\n";
        file += "begin=CaseInfo\r\n";
        file += "path=\r\n";
        file += "name=\r\n";
        file += "end=CaseInfo\r\n";
        file += "begin=TranscriptInfo\r\n";
        file += "datetime=" + dateString + "\r\n"; //2010 09 15 12 00 00
        file += "name=" + caseViewNet.ClientName + "\r\n";
        file += "begin=comments\r\n";
        file += "end=comments\r\n";
        
        var pages = parseInt(caseViewNet.mainBuffer[bufferSize - 1].page);

        file += "pagenames=";//1,2,3,4,5,6,7,8,9,10\r\n";

        for (var i = 1; i <= pages; ++i) {
            if (i < pages) {
                file += i + ",";
            }
            else {
                file += i + "\r\n";
            }
        }


        
        var lineNames = "linenames=";
        var lineTimestamps = "linetimestamps=";
        var annotations = '';
        var lineData = '';

        var pageNumber = firstLine.page;

        for (var i = 0; i < bufferSize; ++i)
        {
            var line = caseViewNet.mainBuffer[i];

            var ts = line.timestamp;
            if (ts && ts.length > 8) {
                ts = ts.substr(0, 8);
            }

            //line names
            //line Timestamps
            if (i < bufferSize - 1) {
                lineNames += line.line + ",";
                lineTimestamps += ts + ",";
            }
            else {
                lineNames += line.line + "\r\n";
                lineTimestamps += ts + "\r\n";
            }


            //annotations
            if (line.selected) {
                annotations += "quick=" + i + "\r\n";
            }

            //text
            if (pageNumber != line.page) {
                pageNumber = line.page;
                lineData += "fmt=pb\r\n";
            }

            lineData += i + "=" + line.data + "\r\n";
        }

        file += lineNames;
        file += lineTimestamps;

        file += "firstpage=1\r\n";
        file += "pagelen=" + pages + "\r\n";
        file += "end=TranscriptInfo\r\n";
        file += "begin=ActiveIssues\r\n";
        file += "99=\r\n";//workaround so that CaseViewNet imports marks
        file += "end=ActiveIssues\r\n";
        file += "begin=DeletedIssues\r\n";
        file += "end=DeletedIssues\r\n";
        file += "begin=Annotations\r\n";

        file += annotations;

        file += "end=Annotations\r\n";
        file += "begin=Text\r\n";

        file += lineData;


        file += "end=Text\r\n";

        return file;
    };
    */
};


function stringToUint(string) {
    var string = unescape(encodeURIComponent(string)),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
};

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
};

function zeroPad(stringNumber, size) {
    for (var i = stringNumber.length; i < size; ++i) {
        stringNumber = "0" + stringNumber;
    }
    return stringNumber;
};

//function toUTF8Array(str) {
//    var utf8 = [];
//    for (var i = 0; i < str.length; i++) {
//        var charcode = str.charCodeAt(i);
//        if (charcode < 0x80) utf8.push(charcode);
//        else if (charcode < 0x800) {
//            utf8.push(0xc0 | (charcode >> 6),
//                      0x80 | (charcode & 0x3f));
//        }
//        else if (charcode < 0xd800 || charcode >= 0xe000) {
//            utf8.push(0xe0 | (charcode >> 12),
//                      0x80 | ((charcode >> 6) & 0x3f),
//                      0x80 | (charcode & 0x3f));
//        }
//            // surrogate pair
//        else {
//            i++;
//            // UTF-16 encodes 0x10000-0x10FFFF by
//            // subtracting 0x10000 and splitting the
//            // 20 bits of 0x0-0xFFFFF into two halves
//            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
//                      | (str.charCodeAt(i) & 0x3ff))
//            utf8.push(0xf0 | (charcode >> 18),
//                      0x80 | ((charcode >> 12) & 0x3f),
//                      0x80 | ((charcode >> 6) & 0x3f),
//                      0x80 | (charcode & 0x3f));
//        }
//    }
//    return utf8;
//}


//function fromUTF8Array(data) { // array of bytes
//    var str = '',
//        i;

//    for (i = 0; i < data.length; i++) {
//        var value = data[i];

//        if (value < 0x80) {
//            str += String.fromCharCode(value);
//        } else if (value > 0xBF && value < 0xE0) {
//            str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
//            i += 1;
//        } else if (value > 0xDF && value < 0xF0) {
//            str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
//            i += 2;
//        } else {
//            // surrogate pair
//            var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

//            str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
//            i += 3;
//        }
//    }

//    return str;
//}




