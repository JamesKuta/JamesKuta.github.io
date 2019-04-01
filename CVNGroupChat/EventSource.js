; (function (global) {

    //this needs to be uncommented before deployment
    if (!("EventSource" in global)) {
        //alert("SSE suported");
    //    return;
    //}
    //else {
        //alert("SSE not supported");
    //}

    var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

    var EventSource = function (url) {
        console.log('EventSource()');
        var eventsource = this,
            interval = 500, // polling interval  
            lastEventId = null,
            cache = '';

        if (!url || typeof url != 'string') {
            throw new SyntaxError('Not enough arguments');
        }

        this.URL = url;

        if (url.indexOf('&Last-Event-ID=') > 0) {
            this.URL = url.substr(0, url.indexOf('&Last-Event-ID='));
            lastEventId = url.substr(url.indexOf('&Last-Event-ID=') + '&Last-Event-ID='.length);
        }

        this.readyState = this.CONNECTING;
        this._pollTimer = null;
        this._xhr = null;

        function pollAgain(interval) {
            console.log('pollAgain()');
            eventsource._pollTimer = setTimeout(function () {
                poll.call(eventsource);
            }, interval);
        }

        function poll() {
            console.log('poll()');
            try { // force hiding of the error message... insane?
                if (eventsource.readyState == eventsource.CLOSED) return;

                // NOTE: IE7 and upwards support
                var xhr = new XMLHttpRequest();
                xhr.open('GET', eventsource.URL + '&Last-Event-ID=' + lastEventId, true);
                //console.log('GET ' + eventsource.URL + '&Last-Event-ID=' + lastEventId);

                cache = '';

                xhr.timeout = 20 * 60 * 1000;// 20 minutes
                xhr.ontimeout = function () {
                    console.log('xhr.ontimeout');
                    xhr.abort();
                };
                xhr.onreadystatechange = function () {
                    console.log('xhr.onreadystatechange');
                    if (this.readyState == 3 || (this.readyState == 4 && this.status == 200)) {
                        // on success
                        if (eventsource.readyState == eventsource.CONNECTING) {
                            eventsource.readyState = eventsource.OPEN;
                            eventsource.dispatchEvent('open', { type: 'open' });
                        }

                        var responseText = '';
                        try {
                            responseText = this.responseText || '';
                        } catch (e) { }

                        // process this.responseText
                        //process it only if complete event is received

                        if (responseText.substr(cache.length).indexOf("\r\n\r\n") != -1) {

                            var parts = responseText.substring(cache.length, responseText.lastIndexOf("\r\n\r\n") + "\r\n\r\n".length).split("\r\n"),
                                eventType = 'message',
                                data = '',
                                i = 0,
                                line = '';

                            cache = responseText.substring(0, responseText.lastIndexOf("\r\n\r\n") + "\r\n\r\n".length);

                            // TODO handle 'event' (for buffer name), retry
                            for (; i < parts.length; i++) {
                                line = parts[i].replace(reTrim, '');
                                if (line.indexOf('event') == 0) {
                                    eventType = line.replace(/event:?\s*/, '');
                                } else if (line.indexOf('retry') == 0) {
                                    retry = parseInt(line.replace(/retry:?\s*/, ''));
                                    if (!isNaN(retry)) { interval = retry; }
                                } else if (line.indexOf('data') == 0) {
                                    data += line.replace(/data:?\s*/, '');
                                } else if (line.indexOf('id:') == 0) {
                                    lastEventId = line.replace(/id:?\s*/, '');
                                //} else if (line.indexOf('id') == 0) { // this resets the id
                                //    lastEventId = null;
                                } else if (line == '') {
                                    if (data.length) {
                                        var event = new MessageEvent(data, eventsource.url, lastEventId);
                                        eventsource.dispatchEvent(eventType, event);
                                        data = '';
                                        eventType = 'message';
                                    }
                                }
                            }
                        }
                        if (this.readyState == 4) pollAgain(interval);
                        // don't need to poll again, because we're long-loading
                    } else if (eventsource.readyState !== eventsource.CLOSED) {
                        if (this.readyState == 4) { // and some other status
                            // dispatch error
                            eventsource.readyState = eventsource.CONNECTING;
                            eventsource.dispatchEvent('error', { type: 'error' });
                            pollAgain(interval);
                        } else if (this.readyState == 0) { // likely aborted
                            pollAgain(interval);
                        } else {
                        }
                    }
                };

                xhr.send();

                setTimeout(function () {
                    if (true || xhr.readyState == 3) xhr.abort();
                    console.log('Timer expired, need to reconnect.');

                }, 20 * 60 * 1000); //timeout 20 min;
                //}, 30 * 1000); //timeout 30 seconds for debugging;

                eventsource._xhr = xhr;

            } catch (e) { // in an attempt to silence the errors
                eventsource.dispatchEvent('error', { type: 'error', data: e.message }); // ???
            }
        };

        poll(); // init now
    };

    EventSource.prototype = {
        close: function () {
            // closes the connection - disabling the polling
            this.readyState = this.CLOSED;
            clearInterval(this._pollTimer);
            this._xhr.abort();
        },
        CONNECTING: 0,
        OPEN: 1,
        CLOSED: 2,
        dispatchEvent: function (type, event) {
            var handlers = this['_' + type + 'Handlers'];
            if (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].call(this, event);
                }
            }

            if (this['on' + type]) {
                this['on' + type].call(this, event);
            }
        },
        addEventListener: function (type, handler) {
            if (!this['_' + type + 'Handlers']) {
                this['_' + type + 'Handlers'] = [];
            }

            this['_' + type + 'Handlers'].push(handler);
        },
        removeEventListener: function (type, handler) {
            var handlers = this['_' + type + 'Handlers'];
            if (!handlers) {
                return;
            }
            for (var i = handlers.length - 1; i >= 0; --i) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        },
        onerror: null,
        onmessage: null,
        onopen: null,
        readyState: 0,
        URL: ''
    };

    var MessageEvent = function (data, origin, lastEventId) {
        this.data = data;
        this.origin = origin;
        this.lastEventId = lastEventId || '';
    };

    MessageEvent.prototype = {
        data: null,
        type: 'message',
        lastEventId: '',
        origin: ''
    };

    if ('module' in global) module.exports = EventSource;
    global.EventSource = EventSource;
    }
})(this);