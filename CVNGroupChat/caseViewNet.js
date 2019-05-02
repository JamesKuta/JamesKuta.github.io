//"use strict";

var isChrome = !!window.chrome && !!window.chrome.webstore;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

var demoMode = false;
var demoInterval;

var connected = false;
var follow = true;
var source;
var lastEventId = '0';
var viewMode = "TRANSCRIPT"; // or "CART"

var documentLoaded = false;

var fontSize = 20;
var leftRightMarginSize = 50;
var bottomMarginSize = 50;
var lineSpacing = 1.5;
var lineHeight = fontSize * lineSpacing; //good proximity but not exactly
var outlineSize = 0;

var topMarginSize = 100;
var shiftSize = 210;
var currentShiftSize = 210;

var showMenuTimer;
var showMenuTimeout = 3000;

var showLineNumbers = true;

var showTimestamps = true;

var fontBold = false;

var fontFamily = 'georgia';

var menuShowed = true;
var sideMenuShowed = true;
var searchFormShowed = false;
var emailFormShowed = false;
var chatFormShowed = false;

//document body
var body = document.getElementsByTagName('body')[0];

var styleNode = document.createElement('style');

//menu container
var divMenuContainer = document.getElementById('divMenuContainer');

//content of the body
var divContent = document.getElementById('divContent');

//transcript view
var divContainerScroll = document.getElementById("divContainerScroll");
var divContainerFullTranscript = document.getElementById("divContainerFullTranscript");
var divContainerPartialTranscript = document.getElementById("divContainerPartialTranscript");
var divContainerItemList = document.getElementById("divContainerItemList");

//cart view
var divCartOutter = document.getElementById('divCartOutter');
var divCartInner = document.getElementById('divCartInner');
var divCartParagraphFull = document.getElementById('divCartParagraphFull');
var divCartParagraphList = document.getElementById('divCartParagraphList');

//top menu buttons
var buttonConnect = document.getElementById('buttonConnect');
var buttonFollowRealTime = document.getElementById('buttonFollowRealTime');
var buttonEmail = document.getElementById('buttonEmail');
var buttonSearch = document.getElementById('buttonSearch');
var inputHiddenHamburgerMenu = document.getElementById('inputHiddenHamburgerMenu');

//side menu buttons
var buttonSwitchView = document.getElementById('buttonSwitchView');
var divLineLabels = document.getElementById('divLineLabels');


var inputFontSize = document.getElementById('inputFontSize');
var inputOutlineSize = document.getElementById('inputOutlineSize');
var inputLineSpacing = document.getElementById('inputLineSpacing');
var inputLeftRightMarginSize = document.getElementById('inputLeftRightMarginSize');
var inputBottomMarginSize = document.getElementById('inputBottomMarginSize');

//assign initial values
inputFontSize.value = fontSize;
inputOutlineSize.value = outlineSize;
inputLineSpacing.value = lineSpacing;
inputLeftRightMarginSize.value = leftRightMarginSize;
inputBottomMarginSize.value = bottomMarginSize;

//menu color pickers
var colorPickerFont = document.getElementById("colorPickerFont");
var colorPickerBackground = document.getElementById("colorPickerBackground");
var colorPickerOutline = document.getElementById("colorPickerOutline");


//font options

var inputFontGeorgia = document.getElementById('inputFontGeorgia');
var inputFontArial = document.getElementById('inputFontArial');
var inputFontCourier = document.getElementById('inputFontCourier');
var labelFontBold = document.getElementById('labelFontBold');


//search pane
var inputSearchText = document.getElementById('inputSearchText');
var divSearchToolContainer = document.getElementById('divSearchToolContainer');
var divSearchResult = document.getElementById('divSearchResult');
var divSearchResultInner = document.getElementById('divSearchResultInner');
var divSpinIconSearch = document.getElementById('divSpinIconSearch');
var lineHighlightedIndex = -1;

//email pane
var divEmailContainer = document.getElementById('divEmailContainer');
var inputEmail = document.getElementById('inputEmail');
var divSpinIconEmail = document.getElementById('divSpinIconEmail');


//chat pane
var divChatContainer = document.getElementById('divChatContainer');
var divChatContactListContainer = document.getElementById('divChatContactListContainer');
var divChatConversationContainer = document.getElementById('divChatConversationContainer');
var divChatContactListInner = document.getElementById('divChatContactListInner');
var divChatConversationHistory = document.getElementById('divChatConversationHistory');
var divChatConversationCurrent = document.getElementById('divChatConversationCurrent');
var divChatContactEveryone = document.getElementById('divChatContactEveryone');
var divCurrentSelectedUser = null;
var divCurrentUserConversationContainer = null;
var chatUserMap = new Map();
var chatConversationMap = new Map();




var buttonSendChatMessage = document.getElementById('buttonSendChatMessage');
var textareaChatMessage = document.getElementById('textareaChatMessage');




var labelTimestamps = document.getElementById('labelTimestamps');
var labelLineNumbers = document.getElementById('labelLineNumbers');


//variables to recalculate on change
var windowWidth = jQuery(window).width();
var windowHeight = jQuery(window).height();
var linesFit = Math.ceil(windowHeight / lineHeight);
var linesRender = linesFit * 5; //5 multiplier of pages to render
var maxlinesAllowed = Math.ceil(linesRender / 2);
var heightFullTranscript;
var heightFullCart;

//var maxDivHeight = 30000000;//max height we can set element to is 30 mln pxls







/*
 *
 * mainBuffer is a main structure of the document that holds entire document data in a raw (json) format
 * Main components:
 *  - index of mainBuffer corresponds to line number of the document
 *  - timestamp - date and time of the line
 *  - data - content of the line
 *  - selected - user selected the line
 *
 */
var caseViewNet = null;

var mainBufferCART = new Array();
var renderedBuffer = new Array();
var lineIndexTop = -1;
var lineIndexBottom = -2;

var lookupMap;
var reverseLookupMap;
var paragraphSizeArray;


var paragraphSizeArrayIndex;
var documentHeightCalculated = false;




var start, time;

var fullscreenEnabled = document.fullscreenEnabled ||
    document.msFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled;



var settingsTranscript = {
    fontSize: 20,
    leftRightMarginSize: 50,
    bottomMarginSize: 50,
    lineSpacing: 1.5,
    outlineSize: 0,
    minFontSize: 8,
    maxFontSize: 72,
    stepFontSize: 1,
    minLeftRightMarginSize: 0,
    maxLeftRightMarginSize: 150,
    stepLeftRightMarginSize: 5,
    minBottomMarginSize: 0,
    maxBottomMarginSize: 1000,
    stepBottomMarginSize: 5,
    minLineSpacing: 1,
    maxLineSpacing: 4,
    stepLineSpacing: 0.125,
    minOutlineSize: 0,
    maxOutlineSize: 5,
    stepOutlineSize: 0.25,
    colorFont: '#000000', //[0,0,0],//'#000000',
    colorBackground: '#F9FDE8', //[249, 253, 232],//'#',
    colorOutline: '#0D48FB', //[12, 72, 251]//'#0D48FB'
    fontBold: false,
    fontFamily: 'georgia'
};


var settingsCART = {
    fontSize: 30,
    leftRightMarginSize: 100,
    bottomMarginSize: 100,
    lineSpacing: 1.5,
    outlineSize: 0,
    minFontSize: 8,
    maxFontSize: 120,
    stepFontSize: 1,
    minLeftRightMarginSize: 0,
    maxLeftRightMarginSize: 300,
    stepLeftRightMarginSize: 10,
    minBottomMarginSize: 0,
    maxBottomMarginSize: 1000,
    stepBottomMarginSize: 5,
    minLineSpacing: 1,
    maxLineSpacing: 4,
    stepLineSpacing: 0.125,
    minOutlineSize: 0,
    maxOutlineSize: 10,
    stepOutlineSize: 0.5,
    colorFont: '#F4EB42', //[244, 235, 66],//'#f4eb42',
    colorBackground: '#264CF2', //[38, 76, 242],//'#264cf2',
    colorOutline: '#0D48FB', //[13, 72, 251]//'#0D48FB'
    fontBold: false,
    fontFamily: 'georgia'
};


var pickers = {};

pickers.backgroundColor = new ColorPicker(colorPickerBackground, changeBackgroundColor,
    settingsTranscript.colorBackground);
colorPickerBackground.style.backgroundColor = pickers.backgroundColor.getHexString();

pickers.fontColor = new ColorPicker(colorPickerFont, changeFontColor,
    settingsTranscript.colorFont);
colorPickerFont.style.backgroundColor = pickers.fontColor.getHexString();

pickers.outlineColor = new ColorPicker(colorPickerOutline, changeOutlineColor,
    settingsTranscript.colorOutline);
colorPickerOutline.style.backgroundColor = pickers.outlineColor.getHexString();

//cookie names
var fontSizeTranscriptCookie = 'fontSizeTranscript';
var outlineSizeTranscriptCookie = 'outlineSizeTranscript';
var lineSpaceTranscriptCookie = 'lineSpaceTranscript';
var leftRightMarginTranscriptCookie = 'leftRightMarginTranscript';
var bottomMarginTranscriptCookie = 'bottomMarginTranscript';
var fontColorTranscriptCookie = 'fontColorTranscript';
var backgroundColorTranscriptCookie = 'backgroundColorTranscript';
var outlineColorTranscriptCookie = 'outlineColorTranscript';
var fontBoldTranscriptCookie = 'fontBoldTranscript';
var fontFamilyTranscriptCookie = 'fontFamilyTranscript';

var fontSizeCartCookie = 'fontSizeCart';
var outlineSizeCartCookie = 'outlineSizeCart';
var lineSpaceCartCookie = 'lineSpaceCart';
var leftRightMarginCartCookie = 'leftRightMarginCart';
var bottomMarginCartCookie = 'bottomMarginCart';
var fontColorCartCookie = 'fontColorCart';
var backgroundColorCartCookie = 'backgroundColorCart';
var outlineColorCartCookie = 'outlineColorCart';
var fontBoldCartCookie = 'fontBoldCart';
var fontFamilyCartCookie = 'fontFamilyCart';

var showTimestampsCookie = 'showTimestamps';
var showPageLineNumbersCookie = 'showPageLineNumbers';


var fontMap = {
    georgia: 'Georgia, serif;',
    arial: 'Arial, Helvetica, sans-serif;',
    courier: '"Courier New", Courier, monospace;'
};

//setCookie(fontColorTranscriptCookie, '');
//setCookie(backgroundColorTranscriptCookie, '');
//setCookie(outlineColorTranscriptCookie, '');
//setCookie(fontColorCartCookie, '');
//setCookie(backgroundColorCartCookie, '');
//setCookie(outlineColorCartCookie, '');



window.onload = function () {
    console.log('window.onload');

    //at this point we start with TRANSCRIPT mode so we will remove DIV element that is used for CART view
    divContent.removeChild(divCartOutter);
    divContent.removeChild(divContainerScroll);

    if (sessionCode == 'DEMO') {
        demoMode = true;
    }
    caseViewNet = new CaseViewNet(guid, demoMode); //guid is defined in caseViewNet.php
    loadCookies();

    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'window.onload\r\n';
    mainBufferCART = new Array();
    renderedBuffer = new Array();
    recalculate(follow);

    // generate initial rows required in the transcript
    createInitialPageTranscript();

    //we have a GUID session cookie set
    //console.log('Session GUID: ' + document.cookie);

    //append style node
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    //start SSE and feed the document


    caseViewNet.setURL(sseUrl); // sseUrl is defined in caseViewNet.php
    caseViewNet.setClientName(name); // name is defined in caseViewNet.php
    caseViewNet.setClientEmail(email); // email is defined in caseViewNet.php
    caseViewNet.setSessionCode(sessionCode); // sessionCode is defined in caseViewNet.php

    caseViewNet.registerCallbacks(OnConnectionOpen,
        OnConnectionError,
        OnMessage,
        OnSaveRights,
        OnEndOfDocument,
        OnCloseConnection,
        OnStartNewDocument,
        OnInsertLine,
        OnDeleteLine,
        OnReplaceLine,
        OnModifyLineInsert,
        OnModifyLineRemove,
        OnModifyLineReplace,
        OnUpdateLineDetails,
        OnLogMessage,
        OnChatUserList,
        OnChatMessage);

    requestData();


    showMenuTimer = setTimeout(function () {
        showHideMenu()
    }, showMenuTimeout);

    // Register for long clicks on plus minus buttons
    registerLongClick(document.getElementById('buttonMinusFontSize'), decrementFontSize);
    registerLongClick(document.getElementById('buttonPlusFontSize'), incrementFontSize);
    registerLongClick(document.getElementById('buttonMinusOutlineSize'), decrementOutlineSize);
    registerLongClick(document.getElementById('buttonPlusOutlineSize'), incrementOutlineSize);
    registerLongClick(document.getElementById('buttonMinusLineSpacing'), decrementLineSpacing);
    registerLongClick(document.getElementById('buttonPlusLineSpacing'), incrementLineSpacing);
    registerLongClick(document.getElementById('buttonMinusLeftRightMarginSize'), decrementLeftRightMarginSize);
    registerLongClick(document.getElementById('buttonPlusLeftRightMarginSize'), incrementLeftRightMarginSize);
    registerLongClick(document.getElementById('buttonMinusBottomMarginSize'), decrementBottomMarginSize);
    registerLongClick(document.getElementById('buttonPlusBottomMarginSize'), incrementBottomMarginSize);

    setTimeout(function () {
        showHideSideMenu();
    }, 2000);

    inputEmail.value = caseViewNet.ClientEmail;
    divSpinIconEmail.style.cssText = 'display: none';
    divSpinIconSearch.style.cssText = 'display: none';

    documentLoaded = true;
};



function onDocumentResize() {
    console.log("onDocumentResize()");
    if (caseViewNet) {
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'onDocumentResize()\r\n';
    }
    recalculate(follow);

    if (viewMode == 'CART') {
        recalculateParagraphSizes();
    }

    //make sure that chat container is visible when width > 480
    if (windowWidth > 480) {
        divChatContactListContainer.style.cssText = '';
        divChatConversationContainer.style.cssText = '';
    } else if (divCurrentSelectedUser != null) {
        //select that user so that we see conversation history instead of the user list
        onChatUserChanged(null, divCurrentSelectedUser);
    }

};

var currentlyProcessing = false;
var needToReprocess = false;

function recalculateParagraphSizes() {
    console.log('recalculateParagraphSizes()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'recalculateParagraphSizes()\r\n';
    if (viewMode != 'CART') {
        return;
    }
    if (!currentlyProcessing) {
        currentlyProcessing = true;
        documentHeightCalculated = false;
        paragraphSizeArray = new Array(mainBufferCART.length);

        if (viewMode == 'CART') //hide search results
        {
            divSpinIconSearch.style.display = '';
            divSearchResultInner.style.display = 'none';
        }
        paragraphSizeArrayIndex = 0;
        setTimeout(calculateParagraphSizesAsync, 0);
    } else {
        //if it's currently running try again later
        needToReprocess = true;
    }
};


function calculateParagraphSizesAsync() {
    console.log('calculateParagraphSizesAsync() ' + paragraphSizeArrayIndex);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'calculateParagraphSizesAsync() ' + paragraphSizeArrayIndex + '\r\n';



    var start = new Date();
    do {


        var increment = paragraphSizeArrayIndex + 100 <= mainBufferCART.length ?
            100 : mainBufferCART.length - paragraphSizeArrayIndex;
        var from = paragraphSizeArrayIndex;
        var to = paragraphSizeArrayIndex + increment;
        paragraphSizeArrayIndex += increment;
        measureParagraphHeights(from, to);

        if (needToReprocess || viewMode != 'CART') {
            //rollback the changes and exit, we are not in cart view anymore
            divSpinIconSearch.style.display = 'none';
            divSearchResultInner.style.display = '';
            needToReprocess = false;
            currentlyProcessing = false;
            setTimeout(recalculateParagraphSizes, 0);
            return;
        }

    } while (paragraphSizeArrayIndex < mainBufferCART.length && (new Date() - start < 50))

    if (paragraphSizeArrayIndex < mainBufferCART.length > 0) {
        setTimeout(calculateParagraphSizesAsync, 0); //put it at the end of the queue
    } else {
        updateCARTDocumentHeight();
    }
};


function measureParagraphHeights(from, to) {
    console.log('measureParagraphHeights() from ' + from + ' to ' + to);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'measureParagraphHeights() from ' + from + ' to ' + to + '\r\n';

    var div = document.createElement('div');

    var tempArray = new Array(to - from);
    for (var i = from; i < to; i++) {
        var paragraph = createNewLineCART(mainBufferCART[i]);
        div.appendChild(paragraph);
        tempArray[i - from] = paragraph;
    }
    divCartParagraphList.appendChild(div);

    for (var i = from; i < to; i++) {
        paragraphSizeArray[i] = tempArray[i - from].clientHeight;
    }

    divCartParagraphList.removeChild(div);

};


function updateCARTDocumentHeight() {
    console.log('updateCARTDocumentHeight()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'updateCARTDocumentHeight()\r\n';
    try {
        var currentDocumentHeight = divCartParagraphFull.clientHeight;

        var reductionSum = 0;
        for (var i = 0; i < paragraphSizeArray.length; ++i) {
            reductionSum += paragraphSizeArray[i];
        }

        heightFullCart = reductionSum + (topMarginSize + bottomMarginSize);

        /*
        TODO
        these 2 lines of code needs to be executed separately on the first occasion when scrolling is not taking place
        */
        divCartParagraphFull.style.height = heightFullCart + 'px';
        divCartInner.scrollTop += heightFullCart - currentDocumentHeight; //shift back



        //console.log(paragraphSizeArray);
        //console.log('Total Height: ' + heightFullCart);

        documentHeightCalculated = true;
        currentlyProcessing = false;

        //show search results

        divSpinIconSearch.style.display = 'none';
        divSearchResultInner.style.display = '';


        adjustContentCART(false);
        if (needToReprocess) {
            needToReprocess = false;
            setTimeout(recalculateParagraphSizes(), 0);
        }
        if (follow)
            scrollToBottom();

    } catch (exception) {
        //alert(exception);
        handleException(exception);
    }
};


document.body.onkeyup = function (e) {
    if (e.keyCode == 32 && !searchFormShowed && viewMode == 'TRANSCRIPT' && caseViewNet.mainBuffer.length > 0) {
        var index = caseViewNet.mainBuffer.length - 1;
        highlightLine(renderedBuffer[index], index);
    }
}


document.onmousemove = function (event) {
    console.log('document.onmousemove');
    if (caseViewNet) {
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'document.onmousemove\r\n';
    }
    //console.log('(x, y) = (' + event.clientX + ', ' + event.clientY + ')');
    if (event.clientY <= 100) // if mouse goes close to top of screen then show menu
    {
        if (menuShowed) {
            if (showMenuTimer) {
                clearTimeout(showMenuTimer);
            }
            showMenuTimer = setTimeout(function () {
                showHideMenu()
            }, showMenuTimeout);
        } else {
            showHideMenu();
        }

    }
};

document.onmousedown = function (event) {
    console.log('document.onmousedown');
    if (caseViewNet) {
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'document.onmousedown\r\n';
    }
    if (menuShowed) {
        if (showMenuTimer) {
            clearTimeout(showMenuTimer);
        }
        showMenuTimer = setTimeout(function () {
            showHideMenu()
        }, showMenuTimeout);
    } else {
        showHideMenu();
    }
};

document.ontouchstart = function (event) {
    console.log('document.ontouchstart');
    if (caseViewNet) {
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'document.ontouchstart\r\n';
    }
    if (menuShowed) {
        if (showMenuTimer) {
            clearTimeout(showMenuTimer);
        }
        showMenuTimer = setTimeout(function () {
            showHideMenu()
        }, showMenuTimeout);
    } else {
        showHideMenu();
    }
};

var lastTouchTimestamp = 0;

document.ontouchend = function (event) {
    console.log('document.ontouchend');
    if (caseViewNet) {
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'document.ontouchend\r\n';
    }

    // disable touble tap zoom in IOS safari
    if (event.timeStamp - lastTouchTimestamp < 300) {
        event.preventDefault();
    }
    lastTouchTimestamp = event.timeStamp;
};


inputHiddenHamburgerMenu.onclick = function (event) {
    if (!inputHiddenHamburgerMenu.checked) {

        if (emailFormShowed) {
            showHideEmailForm();
        }
        if (searchFormShowed) {
            showHideSearchForm(true);
        }
        if (chatFormShowed) {
            showHideChatForm();
        }
    }
};


function showHideMenu() {
    console.log("showHideMenu()");
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideMenu()\r\n';
    if (menuShowed && !follow) {
        return;
    }

    if (menuShowed && (sideMenuShowed || searchFormShowed || emailFormShowed || chatFormShowed ||
            inputHiddenHamburgerMenu.checked)) {
        return;
    }

    showHideTopMenu();
};

var toggleTopMenuInProgress = 0;
var toggleSideMenuInProgress = 0;

function showHideTopMenu() {
    console.log("showHideTopMenu()");
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideTopMenu()\r\n';
    if (toggleSideMenuInProgress > 0 || toggleTopMenuInProgress > 0) {
        if (showMenuTimer) {
            clearTimeout(showMenuTimer);
        }
        if (menuShowed) {

            showMenuTimer = setTimeout(function () {
                showHideMenu()
            }, showMenuTimeout);
        }
        return;
    }

    //hide hamburger menu if open
    if (menuShowed && inputHiddenHamburgerMenu.checked) {
        inputHiddenHamburgerMenu.click();
    }

    // Set the effect type
    var effect = 'slide';
    toggleTopMenuInProgress = 2; //2 elements to complete
    // Set the options for the effect type chosen
    var optionsMenu = {
        direction: 'up'
    };
    var optionsButton = {
        direction: 'left'
    };
    // Set the duration (default: 400 milliseconds)
    var duration = 700;

    $('#divTopMenuContainer').toggle(effect, optionsMenu, duration, function () {
        toggleTopMenuInProgress--;
    });
    $('#divShowHideSideMenu').toggle(effect, optionsButton, duration, function () {
        toggleTopMenuInProgress--;
    });
    menuShowed = !menuShowed;

    if (showMenuTimer) {
        clearTimeout(showMenuTimer);
    }
    if (menuShowed) {

        showMenuTimer = setTimeout(function () {
            showHideMenu()
        }, showMenuTimeout);
    }
};


function showHideSideMenu() {
    console.log("showHideSideMenu()");
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideSideMenu()\r\n';
    if (toggleSideMenuInProgress > 0 || toggleTopMenuInProgress > 0) {
        return;
    }

    toggleSideMenuInProgress = 3; // 3 elements to complete
    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = {
        direction: 'left'
    };

    // Set the duration (default: 400 milliseconds)
    var duration = 1000;

    $('#divSideMenuContainer').toggle(effect, options, duration, function () {
        toggleSideMenuInProgress--;
    });
    if (sideMenuShowed) {
        currentShiftSize = 0;
        $('#divContent').animate({
            "left": "-=" + shiftSize + "px"
        }, {
            duration: duration,
            queue: false,
            complete: function () {
                toggleSideMenuInProgress--;
            }
        });
        $('#divShowHideSideMenu').animate({
            "left": "-=" + shiftSize + "px"
        }, {
            duration: duration,
            queue: false,
            complete: function () {
                $('#buttonShowHideSideMenu').text('>>');
                toggleSideMenuInProgress--;
                recalculate(follow);

                if (viewMode == 'CART') {
                    recalculateParagraphSizes();
                }
            }
        });

    } else {
        currentShiftSize = shiftSize;
        $('#divContent').animate({
            "left": "+=" + shiftSize + "px"
        }, {
            duration: duration,
            queue: false,
            complete: function () {
                toggleSideMenuInProgress--;
            }
        });
        $('#divShowHideSideMenu').animate({
            "left": "+=" + shiftSize + "px"
        }, {
            duration: duration,
            queue: false,
            complete: function () {
                $('#buttonShowHideSideMenu').text('<<');
                toggleSideMenuInProgress--;
                recalculate(follow);

                if (viewMode == 'CART') {
                    recalculateParagraphSizes();
                }
            }
        });
    }
    sideMenuShowed = !sideMenuShowed;

    if (showMenuTimer) {
        clearTimeout(showMenuTimer);
    }
    if (menuShowed) {

        showMenuTimer = setTimeout(function () {
            showHideMenu()
        }, showMenuTimeout);
    }

};

function scrollToBottom() {
    console.log('scrollToBottom()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'scrollToBottom()\r\n';
    switch (viewMode) {
        case "CART":
            divCartInner.scrollTop = divCartInner.scrollHeight;
            break;
        case "TRANSCRIPT":
            divContainerScroll.scrollTop = divContainerScroll.scrollHeight;
            break;
    }
};

function recalculate(didFollow) {
    console.log('recalculate() documentHeightCalculated = ' + documentHeightCalculated);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'recalculate()\r\n';
    windowWidth = jQuery(window).width();
    windowHeight = jQuery(window).height();
    lineHeight = fontSize * lineSpacing; //good proximity but not exactly
    if (viewMode == 'TRANSCRIPT' && lineIndexTop > -1) //if we can let's measure exactly the size
    {
        lineHeight = divContainerItemList.firstChild.clientHeight;
        if (caseViewNet.mainBuffer[lineIndexTop].data.trim().length == 0) {
            var i = lineIndexTop;

            while (true) {
                if (caseViewNet.mainBuffer[i].data.trim().length > 0 && renderedBuffer[i].clientHeight > 0) {
                    lineHeight = renderedBuffer[i].clientHeight;
                    break;
                }
                if (i >= lineIndexBottom) {
                    break;
                }
                i++;
            }
        }
    }
    //linesFit = Math.ceil(windowHeight / lineSpacing);
    linesFit = Math.ceil(windowHeight / lineHeight);
    linesRender = linesFit * 5; //multiplier of pages to render
    maxlinesAllowed = Math.ceil(linesRender / 2);
    switch (viewMode) {
        case "CART":
            if (documentHeightCalculated) {

                var reductionSum = 0;
                for (var i = 0; i < paragraphSizeArray.length; ++i) {
                    reductionSum += paragraphSizeArray[i];
                }
                heightFullCart = reductionSum + (topMarginSize + bottomMarginSize);
                divCartParagraphFull.style.height = heightFullCart + 'px';

                var slice = $(paragraphSizeArray).slice(lineIndexBottom + 1);

                reductionSum = 0;
                for (var i = 0; i < slice.length; ++i) {
                    reductionSum += slice[i];
                }
                var pixelsOffsetBottom = reductionSum;
                divCartParagraphList.style.bottom = pixelsOffsetBottom + 'px';
            }
            break;
        case "TRANSCRIPT":

            heightFullTranscript = (caseViewNet.mainBuffer.length * lineHeight) + (topMarginSize + bottomMarginSize);
            divContainerFullTranscript.style.height = heightFullTranscript + 'px';

            var bufferSize = caseViewNet.mainBuffer.length;

            var pixelsOffsetBottom = (bufferSize - 1 - lineIndexBottom) * lineHeight;
            divContainerPartialTranscript.style.bottom = pixelsOffsetBottom + 'px';

            break;
    }
    if (didFollow) {
        follow = didFollow;
        scrollToBottom();
    }
};



function createInitialPageTranscript() {
    console.log('createInitialPageTranscript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'createInitialPageTranscript()\r\n';
    try {
        var bufferSize = caseViewNet.mainBuffer.length;
        if (bufferSize == 0) {
            divContent.appendChild(divContainerScroll);

            updateStyle(false);
            scrollToBottom();

            return;
        }
        var end = bufferSize - 1;
        var start = Math.max(0, end - maxlinesAllowed);
        lineIndexTop = start;
        lineIndexBottom = end;

        renderedBuffer = new Array(bufferSize);
        var line = null;
        for (; start <= end; start++) {
            line = createNewLineTranscript(start, caseViewNet.mainBuffer[start]);
            renderedBuffer[start] = line;
            divContainerItemList.appendChild(line);
        }
    } catch (exception) {
        //alert(exception);
        handleException(exception);
    }

    divContent.appendChild(divContainerScroll);

    updateStyle(false);
    scrollToBottom();
};



function createInitialPageCART() {
    console.log('createInitialPageCART()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'createInitialPageCART()\r\n';
    try {
        var bufferSizeCART = mainBufferCART.length;;

        if (bufferSizeCART == 0) {
            //this needs to go somewhere else too
            divContent.appendChild(divCartOutter);
            updateStyle(false);
            scrollToBottom();
            return;
        }

        renderedBuffer = new Array(bufferSizeCART);

        recalculate(follow);
        var end = bufferSizeCART - 1;
        var start = Math.max(0, end - maxlinesAllowed);
        lineIndexTop = start;
        lineIndexBottom = end;

        var numOfLines = 0;

        for (var index = lineIndexTop; index <= lineIndexBottom; index++) {
            addLineTaleCART(index, mainBufferCART[index]);
            numOfLines += lookupMap[index].length;
        }
        //this needs to go somewhere else too
        divContent.appendChild(divCartOutter);
        updateStyle(false);

        heightFullCart = divCartParagraphList.clientHeight + (topMarginSize + bottomMarginSize);
        divCartParagraphFull.style.height = heightFullCart + 'px';
        divCartParagraphList.style.bottom = '0 px';

        paragraphSizeArray = new Array(bufferSizeCART);

        scrollToBottom();

        recalculateParagraphSizes();
    } catch (exception) {
        //alert(exception);
        handleException(exception);
    }
};










function startNewDocument() {
    console.log('startNewDocument()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'startNewDocument()\r\n';
    switch (viewMode) {
        case "CART":
            removeLinesCART();
            //this will be attached later inside createInitialPageCART() possibly for now
            divContent.removeChild(divCartOutter);
            createInitialPageCART();
            break;
        case "TRANSCRIPT":
            removeLinesTranscript();
            divContent.removeChild(divContainerScroll);
            createInitialPageTranscript();
            break;
    }


};

var tappedOnce = false;
var tappedDivId = -1;
var lineTouchMove = false;

function createNewLineTranscript(index, json) {
    //console.log('createNewLineTranscript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'createNewLineTranscript()\r\n';
    var div = document.createElement('div');

    div.setAttribute('id', index);
    div.setAttribute('class', 'div-row');

    if (json.selected) {
        div.style.backgroundColor = '#ff7f7f';
    } else {
        div.style.backgroundColor = 'transparent';
    }

    if (showTimestamps) {
        var div1 = document.createElement('div');

        //if we show line numbers we don't need 25px margin, only 10px
        if (showLineNumbers) {
            div1.setAttribute('class', 'div-float-left div-timestamp');
        } else {
            div1.setAttribute('class', 'div-float-left div-timestamp div_right_margin25');
        }
        if (json.timestamp && json.timestamp.length > 8) {
            div1.appendChild(document.createTextNode(json.timestamp.substr(0, 8)));
        } else {
            div1.appendChild(document.createTextNode(json.timestamp));
        }
        div.appendChild(div1);
    }
    if (showLineNumbers) {
        var div2 = document.createElement('div');
        div2.setAttribute('class', 'div-float-left div-line-number div_right_margin25');
        div2.appendChild(document.createTextNode(json.page + '-' + json.line));
        div.appendChild(div2);
    }


    var div3 = document.createElement('div');

    div3.setAttribute('class', 'div-float-left div-data');

    if (json.paragraph) {
        //check how many spaces are at the beginning of the string
        var num = 0;
        while (json.data && json.data.length > num && json.data.charAt(num) == ' ') {
            ++num;
        }
        num *= 10; //10 px per space
        div3.setAttribute('style', 'text-indent: ' + num + 'px;');
    }


    if (json.data && json.data.trim().length > 0) {
        div3.appendChild(document.createTextNode(json.data));
    } else {
        div3.appendChild(document.createTextNode("\u00A0"));
    }




    div.appendChild(div3);
    div.ondblclick = function (event) {
        console.log('div.ondblclick');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'div.ondblclick\r\n';
        highlightLine(this);
    };

    div.ontouchend = function (event) {
        console.log('div.ontouchend');
        caseViewNet.LogMessage += new Date() + '\r\n';
        caseViewNet.LogMessage += 'div.ontouchend\r\n';
        if (lineTouchMove) {
            lineTouchMove = false;
            return;
        }
        var currentElement = this;
        if (!tappedOnce) {
            if (currentElement) {
                tappedDivId = currentElement.id;
                tappedOnce = true;
                setTimeout(function () {
                    tappedOnce = false;
                    tappedDivId = -1;
                }, 300);
            }
        } else if (currentElement && currentElement.id == tappedDivId) {
            highlightLine(this);
            tappedOnce = false;
            tappedDivId = -1;
        }
    };
    div.ontouchmove = function () {
        lineTouchMove = true;
    };

    return div;
};

function highlightLine(div, id) {

    var index = id;

    if (div) {
        index = parseInt(div.id);
    }

    var line = caseViewNet.mainBuffer[index];
    line.selected = !line.selected;

    if (div) {
        if (line.selected) {
            div.style.backgroundColor = '#ff7f7f';
        } else {
            div.style.backgroundColor = 'transparent';
        }
    }
};


function createNewLineCART(data) {
    //console.log('createNewLineCART()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'createNewLineCART()\r\n';
    var p = document.createElement('p');
    p.setAttribute('class', 'highlight');
    if (data && data.trim().length > 0) {
        p.appendChild(document.createTextNode(data));
    } else {
        p.appendChild(document.createTextNode("\u00A0"));
    }

    var num = 0;
    while (data && data.length > num && data.charAt(num) == ' ') {
        ++num;
    }
    num *= 10; //10 px per space
    p.setAttribute('style', 'text-indent: ' + num + 'px;');

    return p;
};


function removeLinesTranscript() {
    console.log('removeLinesTranscript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'removeLinesTranscript()\r\n';
    divContainerItemList.innerHTML = '';
    lineIndexTop = -1;
    lineIndexBottom = -2;
    renderedBuffer = new Array();
};

function removeLinesCART() {
    console.log('removeLinesCART()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'removeLinesCART()\r\n';
    divCartParagraphList.innerHTML = '';
    lineIndexTop = -1;
    lineIndexBottom = -2;
    renderedBuffer = new Array();
};

function addLineHeadTranscript(index, json) {
    console.log('addLineHeadTranscript() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineHeadTranscript()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }
    var line = createNewLineTranscript(index, json);
    renderedBuffer[index] = line;
    divContainerItemList.insertBefore(line, divContainerItemList.firstChild);
};

function addLineHeadCART(index, data) {
    console.log('addLineHeadCART() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineHeadCART()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }

    var line = createNewLineCART(data);
    renderedBuffer[index] = line;
    divCartParagraphList.insertBefore(line, divCartParagraphList.firstChild);
};


function addLineTaleTranscript(index, json) {
    console.log('addLineTaleTranscript() index + ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineTaleTranscript()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }

    var line = createNewLineTranscript(index, json);
    renderedBuffer[index] = line;
    divContainerItemList.appendChild(line);
};

function addLineTaleCART(index, data) {
    console.log('addLineTaleCART() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineTaleCART()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }

    var line = createNewLineCART(data);
    renderedBuffer[index] = line;
    divCartParagraphList.appendChild(line);
};

function addLineIndexTranscript(index, json) {
    console.log('addLineIndexTranscript() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineIndexTranscript()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }

    if (renderedBuffer[index + 1] == null) {
        //alert('required line does not exists');
        handleException('required line does not exists');
        return;
    }

    var line = createNewLineTranscript(index, json);
    renderedBuffer[index] = line;
    divContainerItemList.insertBefore(line, renderedBuffer[index + 1]);
};

function addLineIndexCART(index, data) {
    console.log('addLineIndexCART() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'addLineIndexCART()\r\n';
    if (renderedBuffer[index] != null) {
        //alert('line already exists.')
        handleException('line already exists.');
        return;
    }

    if (renderedBuffer[index + 1] == null) {
        //alert('required line does not exists');
        handleException('required line does not exists');
        return;
    }

    var line = createNewLineCART(data);
    renderedBuffer[index] = line;
    divCartParagraphList.insertBefore(line, renderedBuffer[index + 1]);
};

function removeLineTranscript(index) {
    console.log('removeLineTranscript() index = ' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'removeLineTranscript()\r\n';
    if (renderedBuffer[index] == null) {
        //alert('line already deleted.')
        handleException('line already deleted.');
        return;
    }

    var element = renderedBuffer[index];
    element.parentElement.removeChild(element);
    renderedBuffer[index] = null;
};


function removeLineCART(index) {
    console.log('removeLineCART() index=' + index);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'removeLineCART()\r\n';
    if (renderedBuffer[index] == null) {
        //alert('line already deleted.')
        handleException('line already deleted.');
        return;
    }

    var element = renderedBuffer[index];
    element.parentElement.removeChild(element);
    renderedBuffer[index] = null;
};

divContainerScroll.onscroll = function () {
    console.log('divContainerScroll.onscroll');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'divContainerScroll.onscroll\r\n';
    switch (viewMode) {
        case "CART":
            break;
        case "TRANSCRIPT":
            adjustContentTranscript();
            break;
    }
};


divCartInner.onscroll = function () {
    console.log('divCartInner.onscroll');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'divCartInner.onscroll\r\n';
    switch (viewMode) {
        case "CART":
            adjustContentCART(true);
            break;
        case "TRANSCRIPT":
            break;
    }
};


function adjustContentCART(changeFollow) {
    console.log('adjustContentCART() documentHeightCalculated = ' + documentHeightCalculated);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'adjustContentCART()\r\n';
    //within marginSize+lineSpacing from bottom of screen
    var endOfDocument = divCartParagraphFull.clientHeight - divCartInner.scrollTop - windowHeight
        //< marginSize + lineSpacing;
        <
        bottomMarginSize + lineHeight;
    //console.log('endOfDocument: ' + endOfDocument);

    if (documentHeightCalculated && lineIndexTop >= 0 && lineIndexBottom >= 0) {

        var scrollTop = divCartInner.scrollTop;
        var bufferSizeCART = mainBufferCART.length;


        var midIndex = calculateMidIndexCART(scrollTop);
        //console.log('midIndex: ' + midIndex);

        var newLineIndexTop = Math.max(midIndex - maxlinesAllowed, 0);
        var newLineIndexBottom = Math.min(midIndex + maxlinesAllowed, bufferSizeCART - 1);


        if (newLineIndexTop > lineIndexBottom || newLineIndexBottom < lineIndexTop) {
            removeLinesCART();
            lineIndexTop = newLineIndexTop;
            lineIndexBottom = newLineIndexBottom;
            for (var i = lineIndexTop; i <= lineIndexBottom; i++) {
                addLineTaleCART(i, mainBufferCART[i]);
            }
        } else {
            while (newLineIndexTop > lineIndexTop) {
                removeLineCART(lineIndexTop);
                lineIndexTop++;
            }

            while (newLineIndexBottom < lineIndexBottom) {
                removeLineCART(lineIndexBottom);
                lineIndexBottom--;
            }

            while (newLineIndexTop < lineIndexTop) {
                lineIndexTop--;
                addLineHeadCART(lineIndexTop, mainBufferCART[lineIndexTop]);
            }

            while (newLineIndexBottom > lineIndexBottom) {
                lineIndexBottom++;
                addLineTaleCART(lineIndexBottom, mainBufferCART[lineIndexBottom]);
            }
        }

        var slice = $(paragraphSizeArray).slice(lineIndexBottom + 1);

        var reductionSum = 0;
        for (var i = 0; i < slice.length; ++i) {
            reductionSum += slice[i];
        }

        var pixelsOffsetBottom = reductionSum;

        divCartParagraphList.style.bottom = pixelsOffsetBottom + 'px';
    }
    if (changeFollow &&
        ((endOfDocument && !follow) || (!endOfDocument && follow)))
        followRealTime();
};

function calculateMidIndexCART(scrollTop) {
    console.log('calculateMidIndexCART()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'calculateMidIndexCART()\r\n';
    var offsetScroll = Math.ceil(heightFullCart - (scrollTop + (windowHeight / 2) - bottomMarginSize));
    var bufferSizeCART = mainBufferCART.length;

    var index = bufferSizeCART;

    do {
        index--;
        offsetScroll -= paragraphSizeArray[index];
    }
    while (offsetScroll > 0 && index >= 0);

    if (index < 0)
        index = 0;
    if (index > bufferSizeCART - 1)
        index = bufferSizeCART - 1;
    return index;
};



function adjustContentTranscript() {
    console.log('adjustContentTranscript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'adjustContentTranscript()\r\n';
    var scrollTop = divContainerScroll.scrollTop;
    //within marginSize+lineSpacing from the bottom of screen
    var endOfDocument = divContainerFullTranscript.clientHeight - divContainerScroll.scrollTop - windowHeight <
        bottomMarginSize + lineHeight;

    //console.log('endOfDocument: ' + endOfDocument);


    //console.log('scroll top: ' + scrollTop);
    //var shift = scrollTop - previousScrollTop;

    //previousScrollTop = scrollTop;
    //if the client just keeps scrolling it is more efficint to not rerender intermediate states.
    // in this case we are delaying the process of refreshing the page until client is done scrolling
    // we are cancelling previous timer if new scroll is executed.
    //if (scrollTimerSet || Math.abs(shift) > 1000) {
    //    clearTimeout(scrollTimer);
    //    scrollTimerSet = true;
    //    scrollTimer = setTimeout(resetScreenTranscript(), 100);
    //    return;
    //}
    var midIndex = calculateMidIndexTranscript(scrollTop);
    var bufferSize = caseViewNet.mainBuffer.length;

    var newLineIndexTop = Math.max(midIndex - maxlinesAllowed, 0);
    var newLineIndexBottom = Math.min(midIndex + maxlinesAllowed, bufferSize - 1);

    if (lineIndexTop >= 0 && lineIndexBottom >= 0) {
        if (newLineIndexTop > lineIndexBottom || newLineIndexBottom < lineIndexTop) {
            removeLinesTranscript();
            lineIndexTop = newLineIndexTop;
            lineIndexBottom = newLineIndexBottom;
            for (var i = lineIndexTop; i <= lineIndexBottom; i++) {
                addLineTaleTranscript(i, caseViewNet.mainBuffer[i]);
            }
        } else {
            while (newLineIndexTop > lineIndexTop) {
                removeLineTranscript(lineIndexTop);
                lineIndexTop++;
            }

            while (newLineIndexBottom < lineIndexBottom) {
                removeLineTranscript(lineIndexBottom);
                lineIndexBottom--;
            }

            while (newLineIndexTop < lineIndexTop) {
                lineIndexTop--;
                addLineHeadTranscript(lineIndexTop, caseViewNet.mainBuffer[lineIndexTop]);
            }

            while (newLineIndexBottom > lineIndexBottom) {
                lineIndexBottom++;
                addLineTaleTranscript(lineIndexBottom, caseViewNet.mainBuffer[lineIndexBottom]);
            }
        }

        //var pixelsOffsetBottom = (bufferSize - 1 - lineIndexBottom) * lineSpacing;
        var pixelsOffsetBottom = (bufferSize - 1 - lineIndexBottom) * lineHeight;
        divContainerPartialTranscript.style.bottom = pixelsOffsetBottom + 'px';
    }

    if ((endOfDocument && !follow) || (!endOfDocument && follow))
        followRealTime();

    //console.log('pixels bottom: ' + pixelsOffsetBottom);
    //console.log(divContainerPartialTranscript.style.bottom);
};

function calculateMidIndexTranscript(scrollTop) {
    console.log('calculateMidIndexTranscript');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'calculateMidIndexTranscript()\r\n';
    //console.log('lineSpacing: ' + lineSpacing);
    var index = Math.ceil((scrollTop + (windowHeight / 2) - bottomMarginSize) / lineHeight) - 1;

    if (index < 0)
        index = 0;
    if (index > caseViewNet.mainBuffer.length - 1)
        index = caseViewNet.mainBuffer.length - 1;
    return index;

};





function switchView() {
    console.log('switchView()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'switchView()\r\n';

    var needToSwitchFontBold = false;
    switch (viewMode) {
        case "CART":
            //save off the settings
            settingsCART.fontSize = fontSize;
            settingsCART.lineSpacing = lineSpacing;
            settingsCART.leftRightMarginSize = leftRightMarginSize;
            settingsCART.bottomMarginSize = bottomMarginSize;
            settingsCART.outlineSize = outlineSize;
            settingsCART.colorBackground = pickers.backgroundColor.getHexString();
            settingsCART.colorFont = pickers.fontColor.getHexString();
            settingsCART.colorOutline = pickers.outlineColor.getHexString();
            settingsCART.fontBold = fontBold;
            settingsCART.fontFamily = fontFamily;
            //load settings
            fontSize = settingsTranscript.fontSize;
            lineSpacing = settingsTranscript.lineSpacing;
            leftRightMarginSize = settingsTranscript.leftRightMarginSize;
            bottomMarginSize = settingsTranscript.bottomMarginSize;
            outlineSize = settingsTranscript.outlineSize;
            pickers.backgroundColor.fromHexString(settingsTranscript.colorBackground);
            colorPickerBackground.style.backgroundColor = pickers.backgroundColor.getHexString();
            pickers.fontColor.fromHexString(settingsTranscript.colorFont);
            colorPickerFont.style.backgroundColor = pickers.fontColor.getHexString();
            pickers.outlineColor.fromHexString(settingsTranscript.colorOutline);
            colorPickerOutline.style.backgroundColor = pickers.outlineColor.getHexString();
            //fontBold = settingsTranscript.fontBold;
            needToSwitchFontBold = fontBold != settingsTranscript.fontBold;
            fontFamily = settingsTranscript.fontFamily;

            viewMode = 'TRANSCRIPT';
            buttonSwitchView.innerText = 'CARTView';
            buttonFollowRealTime.innerText = 'Follow Realtime';
            break;
        case "TRANSCRIPT":
            //save off the settings
            settingsTranscript.fontSize = fontSize;
            settingsTranscript.lineSpacing = lineSpacing;
            settingsTranscript.leftRightMarginSize = leftRightMarginSize;
            settingsTranscript.bottomMarginSize = bottomMarginSize;
            settingsTranscript.outlineSize = outlineSize;
            settingsTranscript.colorBackground = pickers.backgroundColor.getHexString();
            settingsTranscript.colorFont = pickers.fontColor.getHexString();
            settingsTranscript.colorOutline = pickers.outlineColor.getHexString();
            settingsTranscript.fontBold = fontBold;
            settingsTranscript.fontFamily = fontFamily;
            //load settings
            fontSize = settingsCART.fontSize;
            lineSpacing = settingsCART.lineSpacing;
            leftRightMarginSize = settingsCART.leftRightMarginSize;
            bottomMarginSize = settingsCART.bottomMarginSize;
            outlineSize = settingsCART.outlineSize;
            pickers.backgroundColor.fromHexString(settingsCART.colorBackground);
            colorPickerBackground.style.backgroundColor = pickers.backgroundColor.getHexString();
            pickers.fontColor.fromHexString(settingsCART.colorFont);
            colorPickerFont.style.backgroundColor = pickers.fontColor.getHexString();
            pickers.outlineColor.fromHexString(settingsCART.colorOutline);
            colorPickerOutline.style.backgroundColor = pickers.outlineColor.getHexString();
            //fontBold = settingsCART.fontBold;
            needToSwitchFontBold = fontBold != settingsCART.fontBold;
            fontFamily = settingsCART.fontFamily;

            viewMode = 'CART';
            buttonSwitchView.innerText = 'Transcript View';
            buttonFollowRealTime.innerText = 'Follow Captions';
            break;
    }

    inputFontSize.value = fontSize;
    inputOutlineSize.value = outlineSize;
    inputLineSpacing.value = lineSpacing;
    inputLeftRightMarginSize.value = leftRightMarginSize;
    inputBottomMarginSize.value = bottomMarginSize;




    switchUIComponents();

    switch (fontFamily) {
        case "georgia":
            inputFontGeorgia.checked = true;
            break;
        case "arial":
            inputFontArial.checked = true;
            break;
        case "courier":
            inputFontCourier.checked = true;
            break;
    }
    //after UI is switched we can check of fontBold needs to be flipped
    if (needToSwitchFontBold)
        labelFontBold.click();

};

function switchUIComponents() {
    console.log('switchUIComponents()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'switchUIComponents()\r\n';
    switch (viewMode) {
        case "CART":
            divContent.removeChild(divContainerScroll);

            removeLinesTranscript();

            if (fullscreenEnabled)
                makeFullscreen(body);

            $(divLineLabels).hide();

            generateNewDocument();
            createInitialPageCART();

            break;
        case "TRANSCRIPT":
            if (fullscreenEnabled)
                cancelFullscreen();
            divContent.removeChild(divCartOutter);

            removeLinesCART();

            $(divLineLabels).show();

            createInitialPageTranscript();

            scrollToBottom();
            break;
    }
};


var errorCount = 0;
var displayPage = false;

function requestData() {
    console.log('requestData()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'requestData()\r\n';

    if (caseViewNet.Connected) {
        caseViewNet.closeSSE();
        buttonConnect.innerText = 'Connect';
        $(buttonConnect).removeClass('div-app-menu-button-selected');

        clearChatUsers();

        if (demoMode && demoInterval) {
            clearInterval(demoInterval);
        }
    } else {
        caseViewNet.startSSEConnection();
        if (demoMode) {
            demoInterval = setInterval(feedDemo, 100);

            //fake notify open connection
            var event = document.createEvent('MessageEvent');
            var eventData = JSON.stringify(new Array());
            var origin = window.location.protocol + '//' + window.location.host;
            event.initMessageEvent('open', true, false, eventData, origin, currentUpdateIndex, window); //, null);

            caseViewNet.SSEHandler.dispatchEvent(event);

        }

        if (displayPage) {
            displayPage = false;
            errorCount = 0;
            caseViewNet.openSSEPageInNewTab();
        }
    }
};


function OnConnectionOpen() {
    console.log('OnConnectionOpen()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnConnectionOpen()\r\n';
    buttonConnect.innerText = 'Disconnect';

    $(buttonConnect).addClass('div-app-menu-button-selected');
};


function OnConnectionError() {
    console.log('OnConnectionError()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnConnectionError()\r\n';
    errorCount++;
    if (errorCount > 10) {
        displayPage = true;
    }
    //alert('on error');
};

//Default receiver, All unspecified Event messages will end up here.
function OnMessage(event) {

    console.log('OnMessage');
    console.log(event.data);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnMessage()\r\n';
    caseViewNet.LogMessage += event.data + '\r\n';
};

function OnSaveRights(save) {
    console.log('OnSaveRights()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnSaveRights()\r\n';
    buttonEmail.disabled = !save;
    if (save) {
        $(body).removeClass('noselect');
    } else {
        $(body).addClass('noselect');
    }

};

function OnEndOfDocument() {
    console.log('OnEndOfDocument()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnEndOfDocument()\r\n';
    //console.log(event.data);
    buttonConnect.innerText = 'Connect';
    $(buttonConnect).removeClass('div-app-menu-button-selected');

    alert('Streaming of the document has ended!');
};


function OnCloseConnection(message) {
    console.log('OnCloseConnection()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnCloseConnection()\r\n';
    //console.log(event.data);
    buttonConnect.innerText = 'Connect';
    $(buttonConnect).removeClass('div-app-menu-button-selected');

    alert('Server Closed Connection! Server Reason: ' + message);

    var index = window.location.href.indexOf('application');

    var str = window.location.href.substring(0, index);

    window.location.replace(str);
};


function OnStartNewDocument() {
    console.log('OnStartNewDocument()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnStartNewDocument()\r\n';
    switch (viewMode) {
        case "CART":
            removeLinesCART();
            break;
        case "TRANSCRIPT":
            removeLinesTranscript();
            break;
    }

    generateNewDocument();

    startNewDocument();

};


function OnInsertLine(index) {
    console.log('OnInsertLine()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnInsertLine()\r\n';
    switch (viewMode) {
        case "CART":

            //if it is a new first line create a new document
            if (lineIndexTop < 0 || lineIndexBottom < 0) {
                removeLinesCART();
                generateNewDocument();
                startNewDocument();
                return;
            }
            var isNextNewLine = index == reverseLookupMap.length;
            var cartIndex = isNextNewLine ? reverseLookupMap[index - 1] : reverseLookupMap[index];
            var indexValues = lookupMap[cartIndex];

            reverseLookupMap.splice(index, 0, cartIndex);

            if (isNextNewLine) {
                indexValues[indexValues.length] = index;
                //lookupMap[cartIndex] = indexValues; it is already assigned there

            } else {
                var newIndexValues = new Array(indexValues.length + 1);

                var k = 0;

                for (var i = 0; i < indexValues.length; ++i) {
                    if (indexValues[i] < index) {
                        newIndexValues[k] = indexValues[i];
                        k++;
                    } else if (indexValues[i] == index) {
                        newIndexValues[k] = index;
                        k++;
                        newIndexValues[k] = index + 1;
                        k++;
                    } else if (indexValues[i] > index) {
                        newIndexValues[k] = indexValues[i] + 1;
                        k++;
                    }
                }
                lookupMap[cartIndex] = newIndexValues;
                incrementMapIndeces(cartIndex + 1);
            }
            break;
        case "TRANSCRIPT":
            //if it is a new first line create a new document
            if (lineIndexTop < 0 || lineIndexBottom < 0) {
                removeLinesTranscript();
                generateNewDocument();
                startNewDocument();
                return;
            }
            // otherwise add line to document

            renderedBuffer.splice(index, 0, null);
            if (index < lineIndexTop) {
                lineIndexTop++;
                lineIndexBottom++;
            } else if (index <= lineIndexBottom) {
                lineIndexBottom++;
            }
            //need to add a line
            if (index >= lineIndexTop && index < lineIndexBottom) {
                addLineIndexTranscript(index, caseViewNet.mainBuffer[index]);
            } else if (index == lineIndexBottom) {
                addLineTaleTranscript(index, caseViewNet.mainBuffer[index]);
            }



            break;
    }


    renderUpdate(index, true);


    //in Cart when insert line it could potentially start a new Paragraph,
    //so everything from that point on needs to be recalculated 
    // or at least to the next paragraph
    // we need to recalculate only that one paragraph or if there is more than 25 lines start a new paragraph
    //but also need to reset indeces for all maps
};

function OnDeleteLine(index) {
    console.log('OnDeleteLine()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnDeleteLine()\r\n';
    switch (viewMode) {
        case "CART":
            //if we remove the only one line
            if (caseViewNet.mainBuffer.length == 0) {
                removeLinesCART();
                return;
            }

            //we should not remove something that is not there
            //therefore it will not be a new not existing line yet


            var cartIndex = reverseLookupMap[index];
            var indexValues = lookupMap[cartIndex];


            //if we remove the paragraph we don't need to regenerate all paragraphs outside of this one
            // improvement can be made to just measure the document and update without regenerating any paragraphs
            if (indexValues.length == 1) {
                if (cartIndex < lineIndexTop) {
                    lineIndexTop--;
                    lineIndexBottom--;
                } else if (cartIndex >= lineIndexTop && cartIndex <= lineIndexBottom) //we will remove paragraph from UI
                {
                    removeLineCART(cartIndex);
                    lineIndexBottom--;
                }
                renderedBuffer.splice(cartIndex, 1);
                lookupMap.splice(cartIndex, 1);
                reverseLookupMap.splice(index, 1);
                paragraphSizeArray.splice(cartIndex, 1);
                mainBufferCART.splice(cartIndex, 1);
                decrementMapIndeces(cartIndex);
            } else {
                var newIndexValues = new Array(indexValues.length - 1);
                reverseLookupMap.splice(index, 1);

                var k = 0;

                for (var i = 0; i < indexValues.length; ++i) {
                    if (indexValues[i] < index) {
                        newIndexValues[k] = indexValues[i];
                        k++;
                    } else if (indexValues[i] > index) {
                        newIndexValues[k] = indexValues[i] - 1;
                        reverseLookupMap[newIndexValues[k]] = cartIndex;
                        k++;
                    }
                }
                lookupMap[cartIndex] = newIndexValues;
                decrementMapIndeces(cartIndex + 1);

            }
            break;
        case "TRANSCRIPT":
            //if we remove the only one line
            if (caseViewNet.mainBuffer.length == 0) {
                removeLinesTranscript();
                return;
            }

            if (index < lineIndexTop) {
                lineIndexTop--;
                lineIndexBottom--;
            } else if (index <= lineIndexBottom) {
                removeLineTranscript(index);
                lineIndexBottom--;
            }
            renderedBuffer.splice(index, 1);
            break;
    }
    renderUpdate(index, true);

    // In Cart when removing a line it makes the paragraph shorter by 1 line,
    //or removes entire paragraph if it contains 1 line
    //need to recalculate only that one paragraph
    //but also need to reset indeces for all maps
};

function OnReplaceLine(index) {
    console.log('OnReplaceLine()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnReplaceLine()\r\n';
    renderUpdate(index, false);

    //need to recalculate previous and current paragraph
};

function OnModifyLineInsert(index) {
    console.log('OnModifyLineInsert()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnModifyLineInsert()\r\n';
    renderUpdate(index, false);
    //need to recalculate previous and current paragraph
};

function OnModifyLineRemove(index) {
    console.log('OnModifyLineRemove()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnModifyLineRemove()\r\n';
    renderUpdate(index, false);
    //need to recalculate previous and current paragraph
};

function OnModifyLineReplace(index) {
    console.log('OnModifyLineReplace()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnModifyLineReplace()\r\n';
    renderUpdate(index, false);
    //need to recalculate previous and current paragraph
};

function OnUpdateLineDetails(index) {
    console.log('OnUpdateLineDetails()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnUpdateLineDetails()\r\n';
    renderUpdate(index, true);
};


function incrementMapIndeces(index) {
    console.log('incrementMapIndeces()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementMapIndeces()\r\n';
    var indexValues;
    for (var i = index; i < lookupMap.length; ++i) {
        indexValues = lookupMap[i];
        for (var j = 0; j < indexValues.length; j++) {
            indexValues[j]++;
            reverseLookupMap[indexValues[j]] = i;
        }
        //lookupMap[i] = indexValues;
    }
};

function decrementMapIndeces(index) {
    console.log('decrementMapIndeces()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'decrementMapIndeces()\r\n';
    var indexValues;
    for (var i = index; i < lookupMap.length; ++i) {
        indexValues = lookupMap[i];
        for (var j = 0; j < indexValues.length; j++) {
            indexValues[j]--;
            reverseLookupMap[indexValues[j]] = i;
        }
        //lookupMap[i] = indexValues;
    }
};


function generateNewDocument() {
    console.log('generateNewDocument()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'generateNewDocument()\r\n';
    try {

        var bufferSize = caseViewNet.mainBuffer.length;

        mainBufferCART = new Array();
        lookupMap = new Array();
        reverseLookupMap = new Array(bufferSize);
        var values = new Array();

        if (bufferSize == 0)
            return;



        var end = bufferSize - 1;
        var index = 0; // index for mainBufferCART
        var start = 0 // idnex for mainBuffer

        //reset buffers

        values.push(start);


        //algorithm temp variables
        var line = caseViewNet.mainBuffer[start];
        var paragraphString = line.data;

        start++;

        var lineString = '';

        for (; start <= end; start++) {
            line = caseViewNet.mainBuffer[start];

            lineString = line.data;

            if (line.paragraph) {
                if (values.length > 0) {

                    mainBufferCART[index] = paragraphString;
                    lookupMap[index] = values;

                    for (var b = 0; b < values.length; b++) {
                        reverseLookupMap[values[b]] = index;
                    }
                    index++;
                    values = new Array();
                }
                paragraphString = lineString;
                values.push(start);
            } else {
                paragraphString += lineString;
                values.push(start);
            }
        }

        if (values.length > 0) {

            mainBufferCART[index] = paragraphString;
            lookupMap[index] = values;
            for (var b = 0; b < values.length; b++) {
                reverseLookupMap[values[b]] = index;
            }
        }
    } catch (exception) {
        //alert(exception);
        handleException(exception);
    }
};


function renderUpdate(index, renumbered) {
    console.log('renderUpdate()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'renderUpdate()\r\n';
    switch (viewMode) {
        case "TRANSCRIPT":
            renderUpdateTranscript(index, renumbered);
            break;

        case "CART":
            renderUpdateCart(index, renumbered);
            break;
    }

    //we may need to render more lines that can fit
    if (linesRender - lineIndexBottom > 1) {
        switch (viewMode) {
            case "CART":
                adjustContentCART();
                break;
            case "TRANSCRIPT":
                adjustContentTranscript();
                break;
        }
    }
};

function renderUpdateTranscript(index, renumbered) {
    console.log('renderUpdateTranscript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'renderUpdateTranscript()\r\n';
    if (renumbered) {
        for (var i = Math.max(index, lineIndexTop); i <= lineIndexBottom; i++) {
            updateLineTrascript(i);
        }
    } else {
        if (index >= lineIndexTop && index <= lineIndexBottom) {
            updateLineTrascript(index);
        }
    }

    recalculate(follow);

    if (follow)
        scrollToBottom();
};


function updateLineTrascript(index) {
    console.log('updateLineTrascript()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'updateLineTrascript()\r\n';
    var renderedLine = renderedBuffer[index];
    var bufferLine = caseViewNet.mainBuffer[index];
    var generatedLine = createNewLineTranscript(index, bufferLine);
    renderedLine.innerHTML = generatedLine.innerHTML;
};

function renderUpdateCart(index, renumbered) {
    console.log('renderUpdateCart()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'renderUpdateCart()\r\n';
    //console.log('index: ' + index + ' renumbered: ' + renumbered);
    //console.log('mainBuffer size: ' + caseViewNet.mainBuffer.length);
    //console.log('reverseLookupMap size: ' + reverseLookupMap.length);


    //these are all things that I have to maintain during updates

    //lineIndexTop
    //lineIndexBottom
    //renderedBuffer
    //mainBufferCART
    //lookupMap; 1 - many
    //reverseLookupMap; 1 - 1
    //paragraphSizeArray;


    //additional improvements can be made
    //we don't always need to reprocess 2 paragraphs, most of the time it is only 1
    //additionally it is most often last 1 pararaph
    // we need to consider passing a flag to look at 1 paragraph only


    //the risk is that I am trying to reprocess 2 paragraphs however they may 
    //end up being 1, 2 or 3 paragraph(s) 
    // if that occurs we need to reincrement or redecrement values again

    var paragraph = '';

    var isLastLineDeleted = index == reverseLookupMap.length;
    var secondCartIndex = isLastLineDeleted ? reverseLookupMap[index - 1] : reverseLookupMap[index];
    var firstCartIndex = secondCartIndex;
    if (firstCartIndex > 0 && !isLastLineDeleted)
        firstCartIndex--;

    var firstCartIndexValues = lookupMap[firstCartIndex];
    var secondCartIndexValues = lookupMap[secondCartIndex];

    //firstCartIndexValues where we start recalculating
    var start = firstCartIndexValues[0];
    var end = secondCartIndexValues[secondCartIndexValues.length - 1];


    var availableParagraphs = secondCartIndex + 1 - firstCartIndex;
    var createdParagraphs = 0;

    try {

        var values = new Array();

        //var start = indexValues[0];// index for mainBuffer
        //var end = bufferSize - 1;
        var cartIndex = firstCartIndex; // index for mainBufferCART


        //reset buffers
        if (start < caseViewNet.mainBuffer.length) {

            values.push(start);


            //algorithm temp variables
            var line = caseViewNet.mainBuffer[start];
            var paragraphString = line.data;

            start++;
            var lineString = '';

            for (; start <= end; start++) {
                line = caseViewNet.mainBuffer[start];

                lineString = line.data;

                if (line.paragraph) {
                    if (values.length > 0) {
                        createdParagraphs++;
                        if (createdParagraphs > availableParagraphs) {

                            //we are adding new paragraph
                            // need to add entry in lookupMap, mainBufferCART, paragraphSizeArray, renderedBuffer
                            lookupMap.splice(cartIndex, 0, values);
                            mainBufferCART.splice(cartIndex, 0, paragraphString);
                            paragraphSizeArray.splice(cartIndex, 0, 0);
                            renderedBuffer.splice(cartIndex, 0, null);

                            if (cartIndex <= lineIndexTop) {
                                lineIndexTop++;
                                lineIndexBottom++;
                            } else if (cartIndex <= lineIndexBottom) {
                                lineIndexBottom++;
                            }

                            if (cartIndex >= lineIndexTop && cartIndex < lineIndexBottom) {
                                addLineIndexCART(cartIndex, paragraphString);
                            } else if (cartIndex == lineIndexBottom) {
                                addLineTaleCART(cartIndex, paragraphString);
                            }

                            //needs to increment reverseLookupMap for all following paragraphs
                            for (var i = values[values.length - 1]; i < reverseLookupMap.length; ++i) {
                                reverseLookupMap[i]++;
                            }

                        } else {
                            lookupMap[cartIndex] = values;
                            mainBufferCART[cartIndex] = paragraphString;
                        }


                        for (var b = 0; b < values.length; b++) {
                            reverseLookupMap[values[b]] = cartIndex;
                        }
                        cartIndex++;
                        values = new Array();
                    }
                    paragraphString = lineString;
                    values.push(start);
                } else {
                    paragraphString += lineString;
                    values.push(start);
                }
            }

            if (values.length > 0) {

                createdParagraphs++;
                if (createdParagraphs > availableParagraphs) {

                    //we are adding new paragraph
                    // need to add entry in lookupMap, mainBufferCART, paragraphSizeArray, renderedBuffer
                    lookupMap.splice(cartIndex, 0, values);
                    mainBufferCART.splice(cartIndex, 0, paragraphString);
                    paragraphSizeArray.splice(cartIndex, 0, 0);
                    renderedBuffer.splice(cartIndex, 0, null);

                    if (cartIndex <= lineIndexTop) {
                        lineIndexTop++;
                        lineIndexBottom++;
                    } else if (cartIndex <= lineIndexBottom) {
                        lineIndexBottom++;
                    }
                    if (cartIndex >= lineIndexTop && cartIndex < lineIndexBottom) {
                        addLineIndexCART(cartIndex, paragraphString);
                    } else if (cartIndex == lineIndexBottom) {
                        addLineTaleCART(cartIndex, paragraphString);
                    }

                    //needs to increment reverseLookupMap for all following paragraphs
                    for (var i = values[values.length - 1] + 1; i < reverseLookupMap.length; ++i) {
                        reverseLookupMap[i]++;
                    }

                } else {
                    mainBufferCART[cartIndex] = paragraphString;
                    lookupMap[cartIndex] = values;
                }

                for (var b = 0; b < values.length; b++) {
                    reverseLookupMap[values[b]] = cartIndex;
                }
            }
        }

        if (createdParagraphs < availableParagraphs) {
            cartIndex++;
            //needs to remove paragraph
            if (cartIndex < lineIndexTop) {
                lineIndexTop--;
                lineIndexBottom--;
            } else if (cartIndex >= lineIndexTop && cartIndex <= lineIndexBottom) //we will remove paragraph from UI
            {
                removeLineCART(cartIndex);
                lineIndexBottom--;
            }
            renderedBuffer.splice(cartIndex, 1);
            lookupMap.splice(cartIndex, 1);
            mainBufferCART.splice(cartIndex, 1);
            paragraphSizeArray.splice(cartIndex, 1);

            for (var i = values[values.length - 1] + 1; i < reverseLookupMap.length; ++i) {
                reverseLookupMap[i]--;
            }
        }

        for (var i = firstCartIndex; i < firstCartIndex + createdParagraphs; ++i) {
            if (i >= lineIndexTop && i <= lineIndexBottom) {
                var p = createNewLineCART(mainBufferCART[i]);
                renderedBuffer[i].innerText = p.innerText;
                paragraphSizeArray[i] = renderedBuffer[i].clientHeight;
            } else {
                var line = createNewLineCART(mainBufferCART[i]);
                divCartParagraphList.appendChild(line);
                paragraphSizeArray[i] = line.clientHeight;
                line.parentElement.removeChild(line);
            }
        }
        recalculate(follow);

        if (follow)
            scrollToBottom();
    } catch (exception) {
        //alert(exception);
        handleException(exception);
    }
};

function followRealTimeClicked() {
    console.log('followRealTimeClicked()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'followRealTimeClicked()\r\n';
    if (toggleSideMenuInProgress > 0) {
        return;
    }


    if (follow) {
        scrollToBottom();
        if (menuShowed) {
            showHideMenu();
        }
    } else {
        followRealTime();
    }
    //loose focus
    buttonFollowRealTime.blur();
};


function followRealTime() {
    console.log('followRealTime()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'followRealTime()\r\n';
    follow = !follow;

    if (follow) {
        $(buttonFollowRealTime).removeClass('btn-danger');
        $(buttonFollowRealTime).addClass('btn-default');
    } else {
        $(buttonFollowRealTime).removeClass('btn-default');
        $(buttonFollowRealTime).addClass('btn-danger');
    }


    if (follow) {
        scrollToBottom();
        if (menuShowed) {
            showHideMenu();
        }
    } else {
        if (!menuShowed) {
            showHideMenu();
        }
    }
};





function sanitizeInput(input) {
    console.log('sanitizeInput()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'sanitizeInput()\r\n';
    input.value = input.value.replace(/\D/g, '');
    var value = parseFloat(input.value);
    //console.log(input.value);
    switch (input) {
        case inputFontSize:
            if (isFontSizeValid(value)) {
                fontSize = value;
                updateStyle(true);

                switch (viewMode) {
                    case "TRANSCRIPT":
                        setCookie(fontSizeTranscriptCookie, fontSize);
                        break;
                    case "CART":
                        setCookie(fontSizeCartCookie, fontSize);
                        break;
                }
            }
            break;
        case inputOutlineSize:
            if (isOutlineSizeValid(value)) {
                outlineSize = value;
                updateStyle(true);
                switch (viewMode) {
                    case "TRANSCRIPT":
                        setCookie(outlineSizeTranscriptCookie, outlineSize);
                        break;
                    case "CART":
                        setCookie(outlineSizeCartCookie, outlineSize);
                        break;
                }
            }
            break;
        case inputLineSpacing:
            if (isLineSpacingValid(value)) {
                lineSpacing = value;
                updateStyle(true);
                switch (viewMode) {
                    case "TRANSCRIPT":
                        setCookie(lineSpaceTranscriptCookie, lineSpacing);
                        break;
                    case "CART":
                        setCookie(lineSpaceCartCookie, lineSpacing);
                        break;
                }
            }
            break;
        case inputLeftRightMarginSize:
            if (isLeftRightMarginSizeValid(value)) {
                leftRightMarginSize = value;
                updateStyle(true);
                switch (viewMode) {
                    case "TRANSCRIPT":
                        setCookie(leftRightMarginTranscriptCookie, leftRightMarginSize);
                        break;
                    case "CART":
                        setCookie(leftRightMarginCartCookie, leftRightMarginSize);
                        break;
                }
            }
            break;
        case inputBottomMarginSize:
            if (isBottomMarginSizeValid(value)) {
                bottomMarginSize = value;
                updateStyle(true);
                switch (viewMode) {
                    case "TRANSCRIPT":
                        setCookie(bottomMarginTranscriptCookie, bottomMarginSize);
                        break;
                    case "CART":
                        setCookie(bottomMarginCartCookie, bottomMarginSize);
                        break;
                }
            }
            break;
    }
};

function validateInput(input) {
    console.log('validateInput()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateInput()\r\n';
    switch (input) {
        case inputFontSize:
            validateFontSize('NONE');
            break;
        case inputOutlineSize:
            validateOutlineSize('NONE');
            break;
        case inputLineSpacing:
            validateLineSpacing('NONE');
            break;
        case inputLeftRightMarginSize:
            validateLeftRightMarginSize('NONE');
            break;
        case inputBottomMarginSize:
            validateBottomMarginSize('NONE');
            break;
    }
};





function registerLongClick(btn, action) {
    console.log('registerLongClick()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'registerLongClick()\r\n';
    var t;
    var start = 500;

    // this is used because IOS safari fires onmouse down right after ontouchstart
    // we dont want to duplicate event so skip the second one
    var eventFired = false;

    var repeat = function () {
        console.log('registerLongClick.repeat()');
        action();
        if (showMenuTimer) {
            clearTimeout(showMenuTimer);
        }
        showMenuTimer = setTimeout(function () {
            showHideMenu()
        }, showMenuTimeout);

        t = setTimeout(repeat, start);
        if (start > 100) {
            start -= 50;
        }
    }

    btn.onmousedown = function () {
        if (!eventFired) {
            eventFired = false;
            repeat();
        }
    }

    btn.ontouchstart = function () {
        eventFired = true;
        repeat();
    }

    btn.onmouseup = function () {
        start = 500;
        clearTimeout(t);
    }
    btn.onmouseout = function () {
        start = 500;
        clearTimeout(t);
    }

    btn.ontouchend = function () {
        start = 500;
        clearTimeout(t);
    }
};


function incrementFontSize() {
    console.log('incrementFontSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementFontSize()\r\n';
    validateFontSize('UP');
};

function decrementFontSize() {
    console.log('decrementFontSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'decrementFontSize()\r\n';
    validateFontSize('DOWN');
};


function isFontSizeValid(size) {
    console.log('isFontSizeValid()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'isFontSizeValid()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minFontSize;
            max = settingsTranscript.maxFontSize;
            step = settingsTranscript.stepFontSize;
            break;
        case "CART":
            min = settingsCART.minFontSize;
            max = settingsCART.maxFontSize;
            step = settingsCART.stepFontSize;
            break;
    }

    if (size >= min && size <= max) {
        return true;
    } else {
        return false;
    }
};

function validateFontSize(direction) {
    console.log('validateFontSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateFontSize()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minFontSize;
            max = settingsTranscript.maxFontSize;
            step = settingsTranscript.stepFontSize;
            break;
        case "CART":
            min = settingsCART.minFontSize;
            max = settingsCART.maxFontSize;
            step = settingsCART.stepFontSize;
            break;
    }
    switch (direction) {
        case 'UP':
            fontSize += step;
            break;
        case 'DOWN':
            fontSize -= step;
            break;
        case 'NONE':
            break;
    }

    if (fontSize < min) {
        fontSize = min;
    } else if (fontSize > max) {
        fontSize = max;
    }

    inputFontSize.value = fontSize;
    updateStyle(true);

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(fontSizeTranscriptCookie, fontSize);
            break;
        case "CART":
            setCookie(fontSizeCartCookie, fontSize);
            break;
    }
};




function incrementOutlineSize() {
    console.log('incrementOutlineSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementOutlineSize()\r\n';
    validateOutlineSize('UP');
};

function decrementOutlineSize() {
    console.log('decrementOutlineSize()');
    caseViewNet.LogMessage += 'decrementOutlineSize()\r\n';
    validateOutlineSize('DOWN');
};


function isOutlineSizeValid(size) {
    console.log('isOutlineSizeValid()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'isOutlineSizeValid()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minOutlineSize;
            max = settingsTranscript.maxOutlineSize;
            step = settingsTranscript.stepOutlineSize;
            break;
        case "CART":
            min = settingsCART.minOutlineSize;
            max = settingsCART.maxOutlineSize;
            step = settingsCART.stepOutlineSize;
            break;
    }

    if (size >= min && size <= max) {
        return true;
    } else {
        return false;
    }
};

function validateOutlineSize(direction) {
    console.log('validateOutlineSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateOutlineSize()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minOutlineSize;
            max = settingsTranscript.maxOutlineSize;
            step = settingsTranscript.stepOutlineSize;
            break;
        case "CART":
            min = settingsCART.minOutlineSize;
            max = settingsCART.maxOutlineSize;
            step = settingsCART.stepOutlineSize;
            break;
    }
    switch (direction) {
        case 'UP':
            outlineSize += step;
            break;
        case 'DOWN':
            outlineSize -= step;
            break;
        case 'NONE':
            break;
    }

    if (outlineSize < min) {
        outlineSize = min;
    } else if (outlineSize > max) {
        outlineSize = max;
    }

    inputOutlineSize.value = outlineSize;
    updateStyle(true);

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(outlineSizeTranscriptCookie, outlineSize);
            break;
        case "CART":
            setCookie(outlineSizeCartCookie, outlineSize);
            break;
    }
};


function incrementLineSpacing() {
    console.log('incrementLineSpacing()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementLineSpacing()\r\n';
    validateLineSpacing('UP');
};

function decrementLineSpacing() {
    console.log('decrementLineSpacing()');
    caseViewNet.LogMessage += 'decrementLineSpacing()\r\n';
    validateLineSpacing('DOWN');

};

function isLineSpacingValid(size) {
    console.log('isLineSpacingValid()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'isLineSpacingValid()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minLineSpacing;
            max = settingsTranscript.maxLineSpacing;
            step = settingsTranscript.stepLineSpacing;
            break;
        case "CART":
            min = settingsCART.minLineSpacing;
            max = settingsCART.maxLineSpacing;
            step = settingsCART.stepLineSpacing;
            break;
    }

    if (size >= min && size <= max) {
        return true;
    } else {
        return false;
    }
};

function validateLineSpacing(direction) {
    console.log('validateLineSpacing()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateLineSpacing()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minLineSpacing;
            max = settingsTranscript.maxLineSpacing;
            step = settingsTranscript.stepLineSpacing;
            break;
        case "CART":
            min = settingsCART.minLineSpacing;
            max = settingsCART.maxLineSpacing;
            step = settingsCART.stepLineSpacing;
            break;
    }
    switch (direction) {
        case 'UP':
            lineSpacing += step;
            break;
        case 'DOWN':
            lineSpacing -= step;
            break;
        case 'NONE':
            break;
    }

    if (lineSpacing < min) {
        lineSpacing = min;
    } else if (lineSpacing > max) {
        lineSpacing = max;
    }

    inputLineSpacing.value = lineSpacing;
    updateStyle(true);

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(lineSpaceTranscriptCookie, lineSpacing);
            break;
        case "CART":
            setCookie(lineSpaceCartCookie, lineSpacing);
            break;
    }
};



function incrementLeftRightMarginSize() {
    console.log('incrementLeftRightMarginSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementLeftRightMarginSize()\r\n';
    validateLeftRightMarginSize('UP');
};

function decrementLeftRightMarginSize() {
    console.log('decrementLeftRightMarginSize()');
    caseViewNet.LogMessage += 'decrementLeftRightMarginSize()\r\n';
    validateLeftRightMarginSize('DOWN');
};

function isLeftRightMarginSizeValid(size) {
    console.log('isLeftRightMarginSizeValid()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'isLeftRightMarginSizeValid()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minLeftRightMarginSize;
            max = settingsTranscript.maxLeftRightMarginSize;
            step = settingsTranscript.stepLeftRightMarginSize;
            break;
        case "CART":
            min = settingsCART.minLeftRightMarginSize;
            max = settingsCART.maxLeftRightMarginSize;
            step = settingsCART.stepLeftRightMarginSize;
            break;
    }

    if (size >= min && size <= max) {
        return true;
    } else {
        return false;
    }
};

function validateLeftRightMarginSize(direction) {
    console.log('validateLeftRightMarginSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateLeftRightMarginSize()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minLeftRightMarginSize;
            max = settingsTranscript.maxLeftRightMarginSize;
            step = settingsTranscript.stepLeftRightMarginSize;
            break;
        case "CART":
            min = settingsCART.minLeftRightMarginSize;
            max = settingsCART.maxLeftRightMarginSize;
            step = settingsCART.stepLeftRightMarginSize;
            break;
    }
    switch (direction) {
        case 'UP':
            leftRightMarginSize += step;
            break;
        case 'DOWN':
            leftRightMarginSize -= step;
            break;
        case 'NONE':
            break;
    }

    if (leftRightMarginSize < min) {
        leftRightMarginSize = min;
    } else if (leftRightMarginSize > max) {
        leftRightMarginSize = max;
    }

    inputLeftRightMarginSize.value = leftRightMarginSize;
    updateStyle(true);

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(leftRightMarginTranscriptCookie, leftRightMarginSize);
            break;
        case "CART":
            setCookie(leftRightMarginCartCookie, leftRightMarginSize);
            break;
    }
};

function incrementBottomMarginSize() {
    console.log('incrementBottomMarginSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'incrementBottomMarginSize()\r\n';
    validateBottomMarginSize('UP');
};

function decrementBottomMarginSize() {
    console.log('decrementBottomMarginSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'decrementBottomMarginSize()\r\n';
    validateBottomMarginSize('DOWN');
};


function isBottomMarginSizeValid(size) {
    console.log('isBottomMarginSizeValid()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'isBottomMarginSizeValid()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minBottomMarginSize;
            max = settingsTranscript.maxBottomMarginSize;
            step = settingsTranscript.stepBottomMarginSize;
            break;
        case "CART":
            min = settingsCART.minBottomMarginSize;
            max = settingsCART.maxBottomMarginSize;
            step = settingsCART.stepBottomMarginSize;
            break;
    }

    if (size >= min && size <= max) {
        return true;
    } else {
        return false;
    }
};

function validateBottomMarginSize(direction) {
    console.log('validateBottomMarginSize()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'validateBottomMarginSize()\r\n';
    var min = 0,
        max = 0,
        step = 0;
    switch (viewMode) {
        case "TRANSCRIPT":
            min = settingsTranscript.minBottomMarginSize;
            max = settingsTranscript.maxBottomMarginSize;
            step = settingsTranscript.stepBottomMarginSize;
            break;
        case "CART":
            min = settingsCART.minBottomMarginSize;
            max = settingsCART.maxBottomMarginSize;
            step = settingsCART.stepBottomMarginSize;
            break;
    }
    switch (direction) {
        case 'UP':
            bottomMarginSize += step;
            break;
        case 'DOWN':
            bottomMarginSize -= step;
            break;
        case 'NONE':
            break;
    }

    if (bottomMarginSize < min) {
        bottomMarginSize = min;
    } else if (bottomMarginSize > max) {
        bottomMarginSize = max;
    }

    inputBottomMarginSize.value = bottomMarginSize;
    updateStyle(true);

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(bottomMarginTranscriptCookie, bottomMarginSize);
            break;
        case "CART":
            setCookie(bottomMarginCartCookie, bottomMarginSize);
            break;
    }
};


function changeFontColor() {
    console.log('changeFontColor()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'changeFontColor()\r\n';
    colorPickerFont.style.backgroundColor = pickers.fontColor.getHexString();
    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(fontColorTranscriptCookie, pickers.fontColor.getHexString());
            break;
        case "CART":
            setCookie(fontColorCartCookie, pickers.fontColor.getHexString());
            break;
    }
    updateStyle(false);
};

function changeBackgroundColor() {
    console.log('changeBackgroundColor()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'changeBackgroundColor()\r\n';
    colorPickerBackground.style.backgroundColor = pickers.backgroundColor.getHexString();
    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(backgroundColorTranscriptCookie, pickers.backgroundColor.getHexString());
            break;
        case "CART":
            setCookie(backgroundColorCartCookie, pickers.backgroundColor.getHexString());
            break;
    }
    updateStyle(false);
};


function changeOutlineColor() {
    console.log('changeOutlineColor()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'changeOutlineColor()\r\n';
    colorPickerOutline.style.backgroundColor = pickers.outlineColor.getHexString();
    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(outlineColorTranscriptCookie, pickers.outlineColor.getHexString());
            break;
        case "CART":
            setCookie(outlineColorCartCookie, pickers.outlineColor.getHexString());
            break;
    }
    updateStyle(false);
};


function changeFontBold() {
    console.log('changeFontBold()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'changeFontBold()\r\n';

    if (!documentLoaded) {
        return;
    }

    fontBold = !fontBold;

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(fontBoldTranscriptCookie, fontBold);
            break;
        case "CART":
            setCookie(fontBoldCartCookie, fontBold);
            break;
    }
    updateStyle(true);

};

function changeFontFamily(input) {
    console.log('changeFontFamily()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'changeFontFamily()\r\n';

    fontFamily = input.value;

    switch (viewMode) {
        case "TRANSCRIPT":
            setCookie(fontFamilyTranscriptCookie, fontFamily);
            break;
        case "CART":
            setCookie(fontFamilyCartCookie, fontFamily);
            break;
    }

    updateStyle(true);
};


function updateStyle(resized) {
    console.log('updateStyle() resized = ' + resized);
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'updateStyle()\r\n';
    var didFollow = follow;
    var colorOutline = pickers.outlineColor.getHexString();
    var attribute = '';

    if (outlineSize > 0) {
        attribute = "-webkit-text-stroke: " + outlineSize + "px " + colorOutline + "; ";
        if (!isChrome && !isSafari) {
            attribute = "text-shadow: ";

            var rules = [];
            var steps = 24;

            for (var t = 0; t <= (2 * Math.PI); t += (2 * Math.PI) / steps) {

                var x = outlineSize * Math.cos(t);
                var y = outlineSize * Math.sin(t);

                x = (Math.abs(x) < 1e-6) ? 0 : x;
                y = (Math.abs(y) < 1e-6) ? 0 : y;

                x = x.toFixed(1).toString();
                y = y.toFixed(1).toString();
                rules.push(x + "px " + y + "px 0px " + colorOutline);

            }
            attribute += rules.join(" , ") + "; ";
        }
    }
    var fontFamilyValue = '';
    switch (fontFamily) {
        case "georgia":
            fontFamilyValue = fontMap.georgia;
            break;
        case "arial":
            fontFamilyValue = fontMap.arial;
            break;
        case "courier":
            fontFamilyValue = fontMap.courier;
            break;
    }

    attribute += "color: " + pickers.fontColor.getHexString() + "; ";
    attribute += "font-size: " + fontSize + "pt; ";
    attribute += "font-family: " + fontFamilyValue + ";";
    attribute += "font-weight: " + (fontBold ? "bold" : "normal") + ";";
    attribute += "line-height: " + lineSpacing + "; ";
    attribute += "left: " + currentShiftSize + "px;";


    var complimentColor = pickers.backgroundColor.getComplimentColor();

    var textHighlightColor = pickers.backgroundColor.isComplimentColorLight() ? '#000' : '#FFF';
    var textBackgroundColor = pickers.backgroundColor.isLight() ? '#000' : '#FFF';


    var cssText = 'div.div-data::selection {background: ' + complimentColor + ';\r\n' +
        'color: ' + textHighlightColor + '; } \r\n' +
        'div.div-data::-moz-selection {background: ' + complimentColor + ';\r\n' +
        'color: ' + textHighlightColor + '; } \r\n' +
        'div.div-timestamp {color: ' + textBackgroundColor + '; } \r\n' +
        'div.div-timestamp::selection {background: transparent;\r\n' +
        'color: ' + textBackgroundColor + '; } \r\n' +
        'div.div-timestamp::-moz-selection {background: transparent;\r\n' +
        'color: ' + textBackgroundColor + '; } \r\n' +

        'div.div-line-number {color: ' + textBackgroundColor + '; } \r\n' +
        'div.div-line-number::selection {background: transparent;\r\n' +
        'color: ' + textBackgroundColor + '; } \r\n' +
        'div.div-line-number::-moz-selection {background: transparent;\r\n' +
        'color: ' + textBackgroundColor + '; } \r\n' +
        'p.highlight::selection {background: ' + complimentColor + ';\r\n' +
        'color: ' + textHighlightColor + '; } \r\n' +
        'p.highlight::-moz-selection {background: ' + complimentColor + ';\r\n' +
        'color: ' + textHighlightColor + '; } \r\n';



    styleNode.innerText = cssText;

    divContent.style.cssText = attribute;
    body.style.backgroundColor = pickers.backgroundColor.getHexString();
    divContent.style.backgroundColor = pickers.backgroundColor.getHexString();
    divShowHideSideMenu.style.backgroundColor = pickers.backgroundColor.getHexString();
    switch (viewMode) {
        case "CART":
            divCartParagraphList.style.marginLeft = leftRightMarginSize + 'px';
            divCartParagraphList.style.marginRight = leftRightMarginSize + 'px';
            divCartParagraphList.style.marginBottom = bottomMarginSize + 'px';
            var bothMargins = 2 * leftRightMarginSize;
            divCartParagraphList.style.width = 'calc(100% - ' + bothMargins + 'px)';
            //needs to measure size of all paragraphs since it might have changed.
            if (resized) {
                recalculateParagraphSizes();
            }

            break;
        case "TRANSCRIPT":
            divContainerPartialTranscript.style.paddingLeft = leftRightMarginSize + 'px';
            divContainerPartialTranscript.style.paddingRight = leftRightMarginSize + 'px';
            divContainerPartialTranscript.style.paddingBottom = bottomMarginSize + 'px';
            break;
    }
    recalculate(didFollow);
    if (resized) {
        switch (viewMode) {
            case "CART":
                adjustContentCART(false);
                break;
            case "TRANSCRIPT":
                adjustContentTranscript();
                break;
        }
    }
};


function showHideSearchForm(clearResult) {
    console.log('showHideSearchForm()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideSearchForm()\r\n';
    if (emailFormShowed) {
        showHideEmailForm();
    }

    if (chatFormShowed) {
        showHideChatForm();
    }

    if (searchFormShowed && clearResult) {
        clearSearchResults();
    }

    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = {
        direction: 'right'
    };

    // Set the duration (default: 400 milliseconds)
    var duration = 1000;

    $('#divSearchToolContainer').toggle(effect, options, duration);
    searchFormShowed = !searchFormShowed;
    if (searchFormShowed) {
        inputSearchText.focus();
    }

    if (searchFormShowed && !inputHiddenHamburgerMenu.checked) {
        inputHiddenHamburgerMenu.click();
    }


};


var lastFound = '';

function onSearchChange(input) {
    console.log('onSearchChange()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'onSearchChange()\r\n';
    var searchText = input.value.toLowerCase();

    if (lastFound == searchText) {
        return;
    }
    lastFound = searchText;

    var searchAnnotations = false;

    if (viewMode == 'TRANSCRIPT' && searchText == ' ') {
        searchAnnotations = true;
    }

    //var t0 = performance.now();

    divSearchResult.removeChild(divSearchResultInner);
    divSearchResultInner.innerHTML = '';

    //var t1 = performance.now();

    //var t = t1 - t0;
    //alert('time ' + t);
    clearSearchResultsFromDocument();

    if (searchText.length > 0) {

        var bufferSize = caseViewNet.mainBuffer.length;

        var count = 0;
        //limit result set to 500
        var maxResultCount = 500;
        var resultBuffer = new Array();
        for (var i = 0; i < bufferSize; ++i) {

            if (count >= maxResultCount) {
                break;
            }

            var lineData = caseViewNet.mainBuffer[i].data.toLowerCase();

            var index = -1;

            if (searchAnnotations) {
                //search for annotations only
                if (caseViewNet.mainBuffer[i].selected) {
                    index = 0;
                } else {
                    continue;
                }
            } else {
                //regular search
                for (var j = 0; j < lineData.length; ++j) {
                    if (lineData.charAt(j) == searchText.charAt(0)) {
                        index = j;
                        break;
                    }
                }
                if (index == -1) {
                    continue;
                }

                index = lineData.indexOf(searchText, index);
            }




            while (index != -1) {
                if (count >= maxResultCount) {
                    break;
                }
                count++;
                var div = document.createElement('div');

                div.setAttribute('class', 'divSearchResultRow');
                div.setAttribute('onclick', "goToSearchResult(" + i + ", " + index + ", '" + searchText + "');");
                //div.setAttribute('ontouchend', "goToSearchResult(" + i + ", " + index + ", '" + searchText + "');");
                //div.setAttribute('ontouchmove', "onSearchTouchMove()");
                var div1 = document.createElement('div');
                div1.setAttribute('class', 'divSearchResultHeader');

                var headerText = 'Page ' + caseViewNet.mainBuffer[i].page + ', Line ' + caseViewNet.mainBuffer[i].line + ' - ' + count + ' of ';
                div1.appendChild(document.createTextNode(headerText));
                div.appendChild(div1);

                var div3 = document.createElement('div');
                div3.setAttribute('class', 'divSearchResultData');
                var dataText = caseViewNet.mainBuffer[i].data;

                div3.appendChild(document.createTextNode(''));

                var innerHTML = '';
                if (searchAnnotations) {
                    innerHTML = dataText;
                } else {
                    innerHTML = dataText.substring(0, index) + "<span class='spanBold spanHighlight'>" +
                        dataText.substring(index, index + searchText.length) + "</span>" +
                        dataText.substring(index + searchText.length);
                }

                div3.innerHTML = innerHTML

                div.appendChild(div3);

                resultBuffer.push(div);

                if (searchAnnotations) {
                    index = -1;
                } else {
                    var j = index + 1;
                    index = -1;
                    for (; j < lineData.length; ++j) {
                        if (lineData.charAt(j) == searchText.charAt(0)) {
                            index = j;
                            break;
                        }

                    }
                    if (index == -1) {
                        break;
                    }

                    index = lineData.indexOf(searchText, index);
                }

            }
        }

        if (count > 0) {

            for (var i = 0; i < resultBuffer.length; ++i) {
                var div = resultBuffer[i];
                div.firstChild.innerText += count;

                divSearchResultInner.appendChild(div);
                if (i < count - 1) {
                    divSearchResultInner.appendChild(document.createElement('hr'));
                }
            }
        }
    }
    divSearchResult.appendChild(divSearchResultInner);

};

//var searchTouchMove = false;
//function onSearchTouchMove() {
//    searchTouchMove = true;

//};

function goToSearchResult(indexLine, offset, searchText) {
    console.log('goToSearchResult()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'goToSearchResult()\r\n';
    //if (searchTouchMove)
    //{
    //    searchTouchMove = false;
    //    return;
    //}

    var searchAnnotations = false;

    if (viewMode == 'TRANSCRIPT' && searchText == ' ') {
        searchAnnotations = true;
    }

    clearSearchResultsFromDocument();

    //turn off follow real time

    if (follow) {
        followRealTime();
    }
    if (indexLine < caseViewNet.mainBuffer.length) {
        switch (viewMode) {
            case "CART":
                if (documentHeightCalculated) {
                    var cartIndex = reverseLookupMap[indexLine];
                    var indexValues = lookupMap[cartIndex];

                    var slice = $(paragraphSizeArray).slice(0, cartIndex);

                    var reductionSum = 0;
                    for (var i = 0; i < slice.length; ++i) {
                        reductionSum += slice[i];
                    }

                    var scrollTop = reductionSum - (windowHeight / 2) + topMarginSize;
                    //scroll to the paragraph, where searched text is
                    divCartInner.scrollTop = scrollTop;

                    //if the line is not rendered yet lets make a trick and wait for it to render
                    if (cartIndex < lineIndexTop || cartIndex > lineIndexBottom) {
                        //put the request next in a queue
                        setTimeout(function () {
                            goToSearchResult(indexLine, offset, searchText);
                        }, 0);
                        return;
                    }

                    //we need to recheck if its still there, it could have been changed
                    // in that case refresh search result
                    var offsetLine = 0;
                    for (var i = 0; i < indexValues.length; ++i) {
                        if (indexValues[i] < indexLine) {
                            offsetLine++;
                            offset += caseViewNet.mainBuffer[indexValues[i]].data.length;
                        }
                    }
                    scrollTop += paragraphSizeArray[cartIndex] * offsetLine / indexValues.length;
                    // adjust the scroll by where in paragraph the line is
                    divCartInner.scrollTop = scrollTop;

                    var p = renderedBuffer[cartIndex];

                    var paragraphData = mainBufferCART[cartIndex];



                    var innerHTML = ''; //p.innerHTML;
                    var index = paragraphData.toLowerCase().indexOf(searchText, offset);
                    if (index != offset) {
                        //the text is no longer there - refresh search results
                        onSearchChange(inputSearchText);
                        return;
                    }
                    lineHighlightedIndex = indexLine;

                    innerHTML = paragraphData.substring(0, index) + "<span class='spanBold spanHighlight'>" +
                        paragraphData.substring(index, index + searchText.length) + "</span>" +
                        paragraphData.substring(index + searchText.length);
                    p.innerHTML = innerHTML

                    if (windowWidth < 700 && searchFormShowed) {
                        showHideSearchForm(false);
                    }
                } else {
                    return;
                    //postpone search result until document height is calculated
                    //setTimeout(function () { goToSearchResult(indexLine, offset, searchText); }, 5000);
                }
                break;
            case "TRANSCRIPT":

                var scrollTop = (lineHeight * indexLine) - (windowHeight / 2) + topMarginSize;
                //scroll to the line, where searched text is
                divContainerScroll.scrollTop = scrollTop;

                //if the line is not rendered yet lets make a trick and wait for it to render
                if (indexLine < lineIndexTop || indexLine > lineIndexBottom) {
                    //put the request next in a queue
                    setTimeout(function () {
                        goToSearchResult(indexLine, offset, searchText);
                    }, 0);
                    return;
                }

                //we need to recheck if its still there, it could have been changed
                // in that case refresh search result

                var div = renderedBuffer[indexLine].lastChild;

                var lineData = caseViewNet.mainBuffer[indexLine].data;




                if (searchAnnotations) {
                    if (!caseViewNet.mainBuffer[indexLine].selected) {
                        onSearchChange(inputSearchText);
                        return;
                    }

                } else {
                    var index = lineData.toLowerCase().indexOf(searchText, offset);
                    if (index != offset) {
                        //the text is no longer there - refresh search results
                        onSearchChange(inputSearchText);
                        return;
                    }

                    var innerHTML = '';

                    innerHTML = lineData.substring(0, index) + "<span class='spanBold spanHighlight'>" +
                        lineData.substring(index, index + searchText.length) + "</span>" +
                        lineData.substring(index + searchText.length);
                    div.innerHTML = innerHTML;
                }

                lineHighlightedIndex = indexLine;

                if (windowWidth < 700 && searchFormShowed) {
                    showHideSearchForm(false);
                }
                break;
        }
    }

};


function clearSearchResults() {
    console.log('clearSearchResults()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'clearSearchResults()\r\n';
    inputSearchText.value = '';
    onSearchChange(inputSearchText);
}

function clearSearchResultsFromDocument() {
    console.log('clearSearchResultsFromDocument()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'clearSearchResultsFromDocument()\r\n';
    switch (viewMode) {
        case "CART":
            if (lineHighlightedIndex != -1) {
                var cartIndex = reverseLookupMap[lineHighlightedIndex];
                if (cartIndex >= lineIndexTop && cartIndex <= lineIndexBottom) {
                    renderUpdateCart(lineHighlightedIndex, false);
                }
            }
            break;
        case "TRANSCRIPT":
            if (lineHighlightedIndex != -1 && lineHighlightedIndex >= lineIndexTop && lineHighlightedIndex <= lineIndexBottom) {
                updateLineTrascript(lineHighlightedIndex);
            }
            break;
    }
    lineHighlightedIndex = -1;
};


function showHideEmailForm() {

    console.log('showHideEmailForm()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideEmailForm()\r\n';
    if (searchFormShowed) {
        showHideSearchForm(true);
    }

    if (chatFormShowed) {
        showHideChatForm();
    }


    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = {
        direction: 'right'
    };

    // Set the duration (default: 400 milliseconds)
    var duration = 1000;

    $('#divEmailContainer').toggle(effect, options, duration);
    emailFormShowed = !emailFormShowed;

    if (emailFormShowed && !inputHiddenHamburgerMenu.checked) {
        inputHiddenHamburgerMenu.click();
    }

};

function OnLogMessage(log) {
    console.log('OnLogMessage()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'OnLogMessage()\r\n';

    //if(caseViewNet.SessionCode == 'MERILEE') {
    if (log) {
        var url = 'emailException.php';

        var http = new XMLHttpRequest();
        http.open('POST', url, true);

        var clientName = 'undefined';
        if (caseViewNet)
            clientName = caseViewNet.ClientName;

        http.setRequestHeader('clientName', clientName);

        http.onreadystatechange = function () {

        };
        http.send(encodeURIComponent(caseViewNet.LogMessage));
    }
};


function sendEmail() {
    console.log('sendEmail()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'sendEmail()\r\n';
    if (inputEmail && inputEmail.value && inputEmail.value !== '' && inputEmail.value.trim() !== '') {

        //show spinning icon
        divSpinIconEmail.style.cssText = '';

        var data = JSON.stringify(caseViewNet.mainBuffer);

        var url = 'emailDocument.php';

        var http = new XMLHttpRequest();
        http.open('POST', url, true);


        var fileName = caseViewNet.generateFileName();
        var dateString = caseViewNet.getDateString();

        http.setRequestHeader('dateString', dateString);
        http.setRequestHeader('fileName', fileName);
        http.setRequestHeader('emailTo', inputEmail.value);
        http.setRequestHeader('nameTo', caseViewNet.ClientName);

        http.onreadystatechange = function () {
            if (http.readyState == 4) {

                divSpinIconEmail.style.cssText = 'display: none';
                if (http.status == 200) {
                    if (http.responseText == 'Message sent!') {
                        showHideEmailForm();
                    } else {
                        alert(http.responseText);
                    }
                } else {
                    alert('Cannot reach server.');
                }
            }
        };
        http.send(encodeURIComponent(data));
    } else {
        alert('Email address is missing.\r\nCould not send an email.');
        inputEmail.focus();
    }
};

function showHideTimestamps() {
    console.log('showHideTimestamps()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideTimestamps()\r\n';
    if (!documentLoaded) {
        return;
    }

    showTimestamps = !showTimestamps;

    setCookie(showTimestampsCookie, showTimestamps);

    if (showTimestamps) {
        if (viewMode == 'TRANSCRIPT')
            renderUpdateTranscript(lineIndexTop, true);
    } else {
        if (viewMode == 'TRANSCRIPT')
            renderUpdateTranscript(lineIndexTop, true);
    }
};

function showHideLineNumbers() {
    console.log('showHideLineNumbers()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideLineNumbers()\r\n';
    if (!documentLoaded) {
        return;
    }

    showLineNumbers = !showLineNumbers;

    setCookie(showPageLineNumbersCookie, showLineNumbers);

    if (showLineNumbers) {
        if (viewMode == 'TRANSCRIPT')
            renderUpdateTranscript(lineIndexTop, true);
    } else {
        if (viewMode == 'TRANSCRIPT')
            renderUpdateTranscript(lineIndexTop, true);
    }
};


function makeFullscreen(element) {
    console.log('makeFullscreen()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'makeFullscreen()\r\n';
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
};

function cancelFullscreen() {
    console.log('cancelFullscreen()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'cancelFullscreen()\r\n';

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
};


function setCookie(cname, cvalue) {
    console.log('setCookie()');
    var now = new Date();
    now.setFullYear(now.getFullYear() + 10);
    caseViewNet.LogMessage += 'setCookie()\r\n';
    document.cookie = cname + "=" + cvalue + "; expires=" + now.toUTCString() + "; path=/";
};

function getCookie(cname) {
    console.log('getCookie()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'getCookie()\r\n';
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};


function loadCookies() {
    console.log('loadCookies()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'loadCookies()\r\n';
    var value = '';

    value = getCookie(fontSizeTranscriptCookie);
    if (value != '') {
        settingsTranscript.fontSize = parseInt(value);
        fontSize = settingsTranscript.fontSize;
        inputFontSize.value = fontSize;
    } else {
        setCookie(fontSizeTranscriptCookie, settingsTranscript.fontSize);
    }

    value = getCookie(outlineSizeTranscriptCookie);
    if (value != '') {
        settingsTranscript.outlineSize = parseFloat(value);
        outlineSize = settingsTranscript.outlineSize;
        inputOutlineSize.value = outlineSize;
    } else {
        setCookie(outlineSizeTranscriptCookie, settingsTranscript.outlineSize);
    }

    value = getCookie(lineSpaceTranscriptCookie);
    if (value != '') {
        settingsTranscript.lineSpacing = parseFloat(value);
        lineSpacing = settingsTranscript.lineSpacing;
        inputLineSpacing.value = lineSpacing;
    } else {
        setCookie(lineSpaceTranscriptCookie, settingsTranscript.lineSpacing);
    }

    value = getCookie(leftRightMarginTranscriptCookie);
    if (value != '') {
        settingsTranscript.leftRightMarginSize = parseInt(value);
        leftRightMarginSize = settingsTranscript.leftRightMarginSize;
        inputLeftRightMarginSize.value = leftRightMarginSize;
    } else {
        setCookie(leftRightMarginTranscriptCookie, settingsTranscript.leftRightMarginSize);
    }

    value = getCookie(bottomMarginTranscriptCookie);
    if (value != '') {
        settingsTranscript.bottomMarginSize = parseInt(value);
        bottomMarginSize = settingsTranscript.bottomMarginSize;
        inputBottomMarginSize.value = bottomMarginSize;
    } else {
        setCookie(bottomMarginTranscriptCookie, settingsTranscript.bottomMarginSize);
    }

    value = getCookie(fontColorTranscriptCookie);
    if (value != '') {
        settingsTranscript.colorFont = value;
        pickers.fontColor.fromHexString(settingsTranscript.colorFont);
        colorPickerFont.style.backgroundColor = pickers.fontColor.getHexString();
    } else {
        setCookie(fontColorTranscriptCookie, settingsTranscript.colorFont);
    }

    value = getCookie(backgroundColorTranscriptCookie);
    if (value != '') {
        settingsTranscript.colorBackground = value;
        pickers.backgroundColor.fromHexString(settingsTranscript.colorBackground);
        colorPickerBackground.style.backgroundColor = pickers.backgroundColor.getHexString();
    } else {
        setCookie(backgroundColorTranscriptCookie, settingsTranscript.colorBackground);
    }

    value = getCookie(outlineColorTranscriptCookie);
    if (value != '') {
        settingsTranscript.colorOutline = value;
        pickers.outlineColor.fromHexString(settingsTranscript.colorOutline);
        colorPickerOutline.style.backgroundColor = pickers.outlineColor.getHexString();
    } else {
        setCookie(outlineColorTranscriptCookie, settingsTranscript.colorOutline);
    }

    value = getCookie(fontBoldTranscriptCookie);
    if (value != '') {
        settingsTranscript.fontBold = value == 'true';
        fontBold = settingsTranscript.fontBold;
        if (fontBold) { //if the checkbox should be checked, let's do it
            labelFontBold.click();
        }
    } else {
        setCookie(fontBoldTranscriptCookie, fontBold);
    }

    value = getCookie(fontFamilyTranscriptCookie);
    if (value != '') {
        settingsTranscript.fontFamily = value;
        fontFamily = settingsTranscript.fontFamily;
        //need to check the proper radio button
        switch (fontFamily) {
            case "georgia":
                inputFontGeorgia.checked = true;
                break;
            case "arial":
                inputFontArial.checked = true;
                break;
            case "courier":
                inputFontCourier.checked = true;
                break;
        }
    } else {
        setCookie(fontFamilyTranscriptCookie, fontFamily);
    }


    value = getCookie(fontSizeCartCookie);
    if (value != '') {
        settingsCART.fontSize = parseInt(value);
    } else {
        setCookie(fontSizeCartCookie, settingsCART.fontSize);
    }

    value = getCookie(outlineSizeCartCookie);
    if (value != '') {
        settingsCART.outlineSize = parseFloat(value);
    } else {
        setCookie(outlineSizeCartCookie, settingsCART.outlineSize);
    }

    value = getCookie(lineSpaceCartCookie);
    if (value != '') {
        settingsCART.lineSpacing = parseFloat(value);
    } else {
        setCookie(lineSpaceCartCookie, settingsCART.lineSpacing);
    }

    value = getCookie(leftRightMarginCartCookie);
    if (value != '') {
        settingsCART.leftRightMarginSize = parseInt(value);
    } else {
        setCookie(leftRightMarginCartCookie, settingsCART.leftRightMarginSize);
    }

    value = getCookie(bottomMarginCartCookie);
    if (value != '') {
        settingsCART.bottomMarginSize = parseInt(value);
    } else {
        setCookie(bottomMarginCartCookie, settingsCART.bottomMarginSize);
    }

    value = getCookie(fontColorCartCookie);
    if (value != '') {
        settingsCART.colorFont = value;
    } else {
        setCookie(fontColorCartCookie, settingsCART.colorFont);
    }

    value = getCookie(backgroundColorCartCookie);
    if (value != '') {
        settingsCART.colorBackground = value;
    } else {
        setCookie(backgroundColorCartCookie, settingsCART.colorBackground);
    }

    value = getCookie(outlineColorCartCookie);
    if (value != '') {
        settingsCART.colorOutline = value;
    } else {
        setCookie(outlineColorCartCookie, settingsCART.colorOutline);
    }

    value = getCookie(fontBoldCartCookie);
    if (value != '') {
        settingsCART.fontBold = value == 'true';
    } else {
        setCookie(fontBoldCartCookie, settingsCART.fontBold);
    }

    value = getCookie(fontFamilyCartCookie);
    if (value != '') {
        settingsCART.fontFamily = value;
    } else {
        setCookie(fontFamilyCartCookie, settingsCART.fontFamily);
    }




    value = getCookie(showTimestampsCookie);
    if (value != '') {
        showTimestamps = value == 'true';
        if (!showTimestamps) {
            labelTimestamps.click();
        }
    } else {
        setCookie(showTimestampsCookie, showTimestamps);
    }

    value = getCookie(showPageLineNumbersCookie);
    if (value != '') {
        showLineNumbers = value == 'true';
        if (!showLineNumbers) {
            labelLineNumbers.click();
        }
    } else {
        setCookie(showPageLineNumbersCookie, showLineNumbers);
    }
};


function handleException(exception) {
    console.log('handleException()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'handleException()\r\n';
    caseViewNet.LogMessage += 'Exception occured: ' + exception + '\r\n';

    OnLogMessage(true);

    caseViewNet.resetSSEConnection();
};


var demoArray = new Array();
var sentDemoRequest = false;

function feedDemo() {
    if (!sentDemoRequest) {
        sentDemoRequest = true;
        requestDemoFile();
    }
    if (demoArray.length > 0) {
        processNewUpdateDemo();
    }
};

function requestDemoFile() {
    var url = 'demo.txt';

    var http = new XMLHttpRequest();
    http.open('GET', url, true);

    http.onreadystatechange = function () {
        if (http.readyState == 4) {

            if (http.status == 200) {
                parseDemoFile(http.responseText);
            } else {
                //resend request to receive a demo file
                sentDemoRequest = false;
            }
        }
    };
    http.send();

};

function parseDemoFile(demoText) {
    demoArray = demoText.split('\r');
};



var currentUpdateIndex = 0;
var previousTimestamp = 0;
var lastUpdate = performance.now();

function processNewUpdateDemo() {
    if (demoArray.length < currentUpdateIndex + 1) {
        return;
    }
    var timestamp = demoArray[currentUpdateIndex];
    var message = JSON.parse(demoArray[currentUpdateIndex + 1]);

    if (previousTimestamp == 0) {
        previousTimestamp = parseInt(timestamp);
    }

    var currentTimestamp = parseInt(timestamp);
    var diffMills = currentTimestamp - previousTimestamp;

    var currentUpdate = performance.now();

    if (currentUpdate - lastUpdate >= diffMills) {
        lastUpdate = currentUpdate;
        previousTimestamp = currentTimestamp;
    } else {
        //don't process it yet
        return;
    }

    var eventName;
    switch (message.operation) {
        case 'INSERT': //event: ModifyLineInsert
            eventName = 'ModifyLineInsert';
            break;

        case 'INSERT_LINE': //event: InsertLine
            eventName = 'InsertLine';
            break;

        case 'DELETE': //event: ModifyLineRemove
            eventName = 'ModifyLineRemove';
            break;

        case 'DELETE_LINE': //event: DeleteLine
            eventName = 'DeleteLine';
            break;

        case 'REPLACE': //event: ModifyLineReplace
            eventName = 'ModifyLineReplace';
            break;

        case 'REPLACE_LINE': //event: ReplaceLine
            eventName = 'ReplaceLine';
            break;

        case 'UPDATE_LINE_DETAIL': //event: UpdateLineDetail
            eventName = 'UpdateLineDetail';
            break;

        default:
            break;

    }
    //09:25:45.17
    var currentTime = new Date();

    var hours = '' + currentTime.getHours();
    var minutes = '' + currentTime.getMinutes();
    var seconds = '' + currentTime.getSeconds();

    var messageTimestamp = zeroPad(hours, 2) + ':' + zeroPad(minutes, 2) + ':' + zeroPad(seconds, 2);

    message.timestamp = messageTimestamp;

    //var event = new MessageEvent(eventName,{
    // data: JSON.stringify(message)
    //});


    var event = document.createEvent('MessageEvent');
    var eventData = JSON.stringify(message);
    var origin = window.location.protocol + '//' + window.location.host;
    event.initMessageEvent(eventName, true, false, eventData, origin, currentUpdateIndex, window); //, null);

    caseViewNet.SSEHandler.dispatchEvent(event);




    currentUpdateIndex += 2;
    if (demoArray.length <= currentUpdateIndex)
    //if(currentUpdateIndex > 100)
    {
        currentUpdateIndex = 0;

        //reset the document and start over
        //event = new MessageEvent('StartNewDocument',{
        //    data: JSON.stringify(new Array())
        //});


        event = document.createEvent('MessageEvent');
        eventData = JSON.stringify(new Array());
        event.initMessageEvent('StartNewDocument', true, false, eventData, origin, currentUpdateIndex, window); //, null);

        caseViewNet.SSEHandler.dispatchEvent(event);

    }

};


function OnChatUserList() {
    //chat UserList has changed, need to update UI

    //delete users that are currently in chat but are not in the new list

    var keys = new Array();

    chatUserMap.forEach(function (value, key, map) {
        keys.push(key);
    });


    for (var k = 0; k < keys.length; ++k) {
        var key = keys[k];

        var deletedKey = true;

        if (key == 'broadcast') {
            deletedKey = false;
        }

        for (var i = 0; i < caseViewNet.ChatUsersList.length; ++i) {
            if (caseViewNet.ChatUsersList[i].guid == key) {
                deletedKey = false;
            }
        }
        if (deletedKey) {
            if (chatUserMap.has(key)) {
                var user = chatUserMap.get(key);
                user.setAttribute('online', 'false');
            }
        }
    }

    //don't use Map.keys() since IE 11 does not support that 

    // var keys = chatUserMap.keys();
    // var nextKey = keys.next();
    // while(!nextKey.done)
    // {
    //     var key = nextKey.value;

    //     var deletedKey = true;

    //     if(key == 'broadcast')
    //     {
    //         deletedKey = false;
    //     }

    //     for(var i = 0; i < caseViewNet.ChatUsersList.length; ++i)
    //     {
    //         if(caseViewNet.ChatUsersList[i].guid == key) {
    //             deletedKey = false;
    //         }
    //     }
    //     if(deletedKey)
    //     {
    //          if(chatUserMap.has(key))
    //          {
    //             var user = chatUserMap.get(key);
    //             user.setAttribute('online', 'false');
    //          }
    //     }
    //     nextKey = keys.next();
    // }

    //first time run will setup the broadcast user
    if (!chatUserMap.has('broadcast')) {
        //add everyone user to the list
        chatUserMap.set('broadcast', divChatContactEveryone);

        //create conversation history container for this user
        container = createChatConversationHistoryContainer('Everyone');

        //add to the conversation map
        chatConversationMap.set('broadcast', container);

    }

    //set correct active status for broadcast
    var broadcastUser = chatUserMap.get('broadcast');
    if (caseViewNet.ChatUsersList.length > 0) {
        broadcastUser.setAttribute('online', 'true');
    } else {
        broadcastUser.setAttribute('online', 'false');
    }


    //add users that are not there yet
    for (var i = 0; i < caseViewNet.ChatUsersList.length; ++i) {
        //if it is a new user, add it to the list
        if (chatUserMap.has(caseViewNet.ChatUsersList[i].guid)) {
            //make sure that the user is online
            var user = chatUserMap.get(caseViewNet.ChatUsersList[i].guid);
            user.setAttribute('online', 'true');
        } else {

            var user = document.createElement('div');
            

            user.setAttribute('class', 'divContactListRow');


            user.setAttribute('name', caseViewNet.ChatUsersList[i].name);
            user.setAttribute('company', caseViewNet.ChatUsersList[i].company);
            user.setAttribute('email', caseViewNet.ChatUsersList[i].email);
            user.setAttribute('guid', caseViewNet.ChatUsersList[i].guid);
            user.setAttribute('sessionCode', caseViewNet.ChatUsersList[i].sessionCode);
            user.setAttribute('broadcast', 'false');
            user.setAttribute('online', 'true');
            user.setAttribute('onclick', 'onChatUserChanged(event, this);');
            //div.setAttribute('ontouchend', 'onChatUserChanged(event, this);');
            //div.setAttribute('ontouchmove', "onChatTouchMove()");
            
            // JK Testing user content structure. Remove!
            addUserToGroupChatArray(user);

            var firstLetter = '';
            if (caseViewNet.ChatUsersList[i].name.length > 0) {
                firstLetter = caseViewNet.ChatUsersList[i].name.substring(0, 1);
            }

            var divCircle = document.createElement('div');
            divCircle.setAttribute('class', 'divChatContactCircle');
            divCircle.appendChild(document.createTextNode(firstLetter));

            var divContactName = document.createElement('div');
            divContactName.setAttribute('class', 'divChatContactName');
            divContactName.appendChild(document.createTextNode(caseViewNet.ChatUsersList[i].name));

            user.appendChild(divCircle);
            user.appendChild(divContactName);

            divChatContactListInner.appendChild(user);

            //add user to the map
            chatUserMap.set(caseViewNet.ChatUsersList[i].guid, user);

            //create conversation history container for this user
            var container = createChatConversationHistoryContainer(caseViewNet.ChatUsersList[i].name);

            //add to the conversation map
            chatConversationMap.set(caseViewNet.ChatUsersList[i].guid, container);

            divChatContactListInner.appendChild(document.createElement('hr'));
            
            
        }

    }


    //set the correct color of a circle if the user is online/offline

    keys = new Array();

    chatUserMap.forEach(function (value, key, map) {
        keys.push(key);
    });

    for (var k = 0; k < keys.length; ++k) {
        var key = keys[k];
        if (chatUserMap.has(key)) {
            var user = chatUserMap.get(key);
            var userOnline = user.getAttribute('online') == 'true';
            if (userOnline) {

                user.firstElementChild.setAttribute('class', 'divChatContactCircle');
            } else {
                user.firstElementChild.setAttribute('class', 'divChatContactCircleOffline');
            }
        }
    }


    //set default container, but only if the container is visible
    if (divCurrentSelectedUser == null) {
        //set everyone as default selected user
        onChatUserChanged(null, divChatContactEveryone);

        //for smaller devices go back to main screen
        if (windowWidth <= 480) {
            onChatUserBack(null);
        }
    }

};


function createChatConversationHistoryContainer(userName) {

    var div = document.createElement('div');
    div.setAttribute('class', 'divConversationHistoryOutter');

    var div1 = document.createElement('div')
    div1.setAttribute('class', 'divConversationHistoryHeader');

    var div2 = document.createElement('div');
    div2.setAttribute('class', 'divConversationHistoryInner');

    var divChatBackButton = document.createElement('div');
    divChatBackButton.setAttribute('class', 'divChatBackButton');
    divChatBackButton.appendChild(document.createTextNode('<'));

    divChatBackButton.setAttribute('onclick', 'onChatUserBack(event);');
    //divChatBackButton.setAttribute('ontouchend', 'onChatUserBack(event);');


    var divConversationHistoryHeaderText = document.createElement('div');
    divConversationHistoryHeaderText.setAttribute('class', 'divConversationHistoryHeaderText');
    divConversationHistoryHeaderText.appendChild(document.createTextNode(userName));


    div1.appendChild(divChatBackButton);
    div1.appendChild(divConversationHistoryHeaderText);

    div.appendChild(div1);
    div.appendChild(div2);
    return div;
};


function onChatUserBack(event) {
    if (event != null) {
        event.preventDefault();
    }
    //this should not be called for bigger screens
    if (windowWidth > 480) {
        return;
    }
    //switch user
    if (divCurrentSelectedUser != null) {
        $(divCurrentSelectedUser).removeClass('divContactListRowSelected')
    }

    divChatContactListContainer.style.cssText = 'display: inline-block';
    divChatConversationContainer.style.cssText = 'display: none';

    divCurrentSelectedUser = null;

};


function onChatUserChanged(event, divSelectedUser) {
    if (event != null) {
        event.preventDefault();
    }
    //if object is hidden
    if (windowWidth <= 480) {
        divChatConversationContainer.style.cssText = 'display: inline-block';
        divChatContactListContainer.style.cssText = 'display: none';
    }

    var broadcast = divSelectedUser.getAttribute('broadcast');
    var guid = divSelectedUser.getAttribute('guid');

    var key = broadcast == 'true' ? 'broadcast' : guid;


    if (chatUserMap.has(key) && chatConversationMap.has(key)) {
        //switch user
        if (divCurrentSelectedUser != null) {
            $(divCurrentSelectedUser).removeClass('divContactListRowSelected')
        }

        divCurrentSelectedUser = chatUserMap.get(key);
        divCurrentUserConversationContainer = chatConversationMap.get(key);

        $(divCurrentSelectedUser).addClass('divContactListRowSelected');

        //delete child node from old contact
        if (divChatConversationHistory.children.length > 0) {
            divChatConversationHistory.removeChild(divChatConversationHistory.firstElementChild);
        } else {
            //initial clear of the node
            divChatConversationHistory.innerHTML = '';
        }

        divChatConversationHistory.appendChild(divCurrentUserConversationContainer);
        divCurrentUserConversationContainer.lastElementChild.scrollTop = divCurrentUserConversationContainer.lastElementChild.scrollHeight;

        //if there is a new message notification, remove it
        var user = chatUserMap.get(key);

        if (user.getElementsByClassName('divChatContactMessageNotification').length > 0) {
            var node = user.getElementsByClassName('divChatContactMessageNotification')[0];
            node.parentNode.removeChild(node);
        }

    }
    textareaChatMessage.focus();
};



buttonSendChatMessage.onclick = function () {
    OnSendChatMessage();
};

//if enter pressed, send the message
textareaChatMessage.onkeydown = function (e) {
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        OnSendChatMessage()
    }
};

//make sure that space in chat does not mark the line in transcript
textareaChatMessage.onkeyup = function (e) {
    if (e.keyCode == 32) {
        e.stopPropagation();
        e.cancelBubble = true;
    }
};



function OnSendChatMessage() {
    var message = textareaChatMessage.value;

    if (divCurrentSelectedUser != null && message != null && message.length > 0) {

        var userOnline = divCurrentSelectedUser.getAttribute('online') == 'true';
        if (userOnline) {
            sendChatMessage(divCurrentSelectedUser, message);
        }
        textareaChatMessage.value = '';

        //append outgoing message 
        AddChatMessage('Outgoing', divCurrentUserConversationContainer, name, message, userOnline);
    }
};



var notificationDiv = null;
var notificationTimer = null;

function OnChatMessage(chatMessage) {
    //received chat message
    var broadcast = chatMessage.broadcast == 'true';
    var fromGuid = chatMessage.guid;
    var message = chatMessage.message;
    var key = broadcast ? 'broadcast' : fromGuid;

    if (chatUserMap.has(key) && chatConversationMap.has(key)) {
        var conversationContainer = chatConversationMap.get(key);
        AddChatMessage('Incoming', conversationContainer, chatMessage.name, message, true);


        var isThisChatDisplayed = chatFormShowed && divCurrentSelectedUser == chatUserMap.get(key);

        //if this user is not displayed, create a notification message to the user,
        // and auto hide it after a couple seconds
        if (!isThisChatDisplayed) {
            if (notificationDiv != null) {
                //there is existing notification, remove it and create a new one
                notificationDiv.parentElement.removeChild(notificationDiv);
                notificationDiv = null;
                if (notificationTimer) {
                    clearTimeout(notificationTimer);
                    notificationTimer = null;
                }
            }


            notificationDiv = document.createElement('div');
            notificationDiv.setAttribute('class', 'divChatNotification');
            notificationDiv.setAttribute('key', key);
            notificationDiv.setAttribute('onclick', 'changeActiveChatUser(event);');

            notificationTimer = setTimeout(closeChatNotification, 4000);

            var notificationHeader = document.createElement('div');
            notificationHeader.setAttribute('class', 'divChatNotificationHeader');


            var firstLetter = '';
            if (chatMessage.name.length > 0) {
                firstLetter = chatMessage.name.substring(0, 1);
            }

            var divCircle = document.createElement('div');
            divCircle.setAttribute('class', 'divChatContactCircle');
            divCircle.appendChild(document.createTextNode(firstLetter));

            var divContactName = document.createElement('div');
            divContactName.setAttribute('class', 'divChatContactName');
            divContactName.appendChild(document.createTextNode(chatMessage.name));

            notificationHeader.appendChild(divCircle);
            notificationHeader.appendChild(divContactName);


            notificationDiv.appendChild(notificationHeader);

            var notificationBody = document.createElement('div');
            notificationBody.setAttribute('class', 'divChatNotificationBody');
            notificationBody.appendChild(document.createTextNode(message));

            notificationDiv.appendChild(notificationBody);

            //add functions to the div

            divMenuContainer.appendChild(notificationDiv);


            //add new message notification if not there yet
            var user = chatUserMap.get(key);

            if (user.getElementsByClassName('divChatContactMessageNotification').length == 0) {
                var divCircle = document.createElement('div');
                divCircle.setAttribute('class', 'divChatContactMessageNotification');
                user.appendChild(divCircle);
            }

        }
    }


};


function closeChatNotification() {
    if (notificationDiv == null) {
        return;
    }
    notificationDiv.parentElement.removeChild(notificationDiv);
    notificationDiv = null;

};


function changeActiveChatUser(event) {

    if (event != null) {
        event.preventDefault();
    }

    if (notificationDiv == null) {
        return;
    }

    if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
    }

    var key = notificationDiv.getAttribute('key');
    if (chatUserMap.has(key)) {

        var currentUser = chatUserMap.get(key);

        //if chat form is not displayed
        if (!chatFormShowed) {
            showHideChatForm();
        }

        onChatUserChanged(null, currentUser);

        notificationDiv.parentElement.removeChild(notificationDiv);
        notificationDiv = null;
    }

};


function AddChatMessage(direction, conversationContainer, name, chatMessage, userOnline) {
    if (divCurrentUserConversationContainer != null) {
        var conversationRow = document.createElement('div');
        conversationRow.setAttribute('class', 'divConversationHistoryRow');


        var messageHeader = document.createElement('div');


        var currentTime = new Date();

        var hour = currentTime.getHours();
        var ampm = 'AM';
        if (hour >= 12) {
            if (hour > 12) {
                hour -= 12;
            }
            ampm = 'PM';
        }


        var hours = '' + hour;
        var minutes = '' + currentTime.getMinutes();
        //var seconds = '' + currentTime.getSeconds();

        var messageTimestamp = zeroPad(hours, 2) + ':' + zeroPad(minutes, 2) +
            //+ zeroPad(seconds, 2) 
            ' ' + ampm;

        if (userOnline) {
            messageHeader.appendChild(document.createTextNode(name + ' • ' + messageTimestamp));
        } else {
            if (caseViewNet.Connected) {
                messageHeader.appendChild(document.createTextNode('User Offline • Message not sent!'));
            } else {
                messageHeader.appendChild(document.createTextNode('You are Offline • Message not sent!'));
            }
        }

        var divConversationHistoryMessage = document.createElement('div');



        if (direction == 'Outgoing') {
            if (userOnline) {
                messageHeader.setAttribute('class', 'divConversationHistoryRowFooter divAlignRight');
            } else {
                messageHeader.setAttribute('class', 'divConversationHistoryRowFooterOffline divAlignRight');
            }
            divConversationHistoryMessage.setAttribute('class', 'divConversationHistoryMessage divFloatRight');
        }
        if (direction == 'Incoming') {
            messageHeader.setAttribute('class', 'divConversationHistoryRowFooter divAlignLeft');
            divConversationHistoryMessage.setAttribute('class', 'divConversationHistoryMessage divFloatLeft');
        }

        divConversationHistoryMessage.appendChild(document.createTextNode(chatMessage));

        conversationRow.appendChild(divConversationHistoryMessage);

        conversationRow.appendChild(messageHeader);

        conversationContainer.lastChild.appendChild(conversationRow);
        conversationContainer.lastChild.scrollTop = conversationContainer.lastChild.scrollHeight;
    }
}



function showHideChatForm() {
    console.log('showHideChatForm()');
    caseViewNet.LogMessage += new Date() + '\r\n';
    caseViewNet.LogMessage += 'showHideChatForm()\r\n';
    if (emailFormShowed) {
        showHideEmailForm();
    }

    if (searchFormShowed) {
        showHideSearchForm(true);
    }

    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = {
        direction: 'right'
    };

    // Set the duration (default: 400 milliseconds)
    var duration = 1000;

    $('#divChatContainer').toggle(effect, options, duration);
    chatFormShowed = !chatFormShowed;

    if (chatFormShowed && !inputHiddenHamburgerMenu.checked) {
        inputHiddenHamburgerMenu.click();
    }
    if (chatFormShowed) {
        textareaChatMessage.focus();
    }


};


function clearChatUsers() {
    //clear chat user list
    caseViewNet.ChatUsersList = new Array();
    OnChatUserList();
};




function sendChatMessage(user, message) {
    if (user == null || message == null || message.length == 0) {
        return;
    }

    var broadcast = user.getAttribute('broadcast') == 'true';

    var toGuid = '';
    if (broadcast) {
        toGuid = 'broadcast';
    } else {
        toGuid = user.getAttribute('guid');
    }


    var xhr = new XMLHttpRequest();
    xhr.open('POST', chatUrl, true);

    xhr.setRequestHeader('Name', name);
    xhr.setRequestHeader('Email', email);
    xhr.setRequestHeader('Company', company);
    xhr.setRequestHeader('Guid', guid);
    xhr.setRequestHeader('SessionCode', sessionCode);
    //required if Broadcast send 'broadcast'
    xhr.setRequestHeader('MessageToGuid', toGuid);
    //set to false, then message goes to MessageToGuid only
    xhr.setRequestHeader('Broadcast', broadcast);



    xhr.timeout = 30 * 1000; // 30 seconds
    xhr.ontimeout = function () {
        console.log('xhr.ontimeout');
        xhr.abort();
    };
    xhr.onreadystatechange = function () {
        console.log('xhr.onreadystatechange');
        if (this.readyState == 4 && this.status == 200) {
            // on success
            console.log(this.responseText);
        } else if (this.readyState == 4) {
            //on failed            
            console.log(this.responseText);
        }
    };
    xhr.send(message);
};