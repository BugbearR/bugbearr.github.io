(function () {
    var separator = new Array(79).join('-') + "\n";
    var lastTime = Date.now();
    var pressedSet = new Set();

    function putEventMessage(msg) {
        var eventTextareaElm = document.getElementById("eventTextarea");
        eventTextareaElm.value += msg;
        eventTextareaElm.scrollTop = eventTextareaElm.scrollHeight;
    }

    // function keyEventHandlerWindow(e) {
    //     putEventMessage("window2 ");
    //     keyEventHandler(e);
    //     return false;
    // }

    // from https://ja.javascript.info/keyboard-events
    function keyEventHandler(e) {
        var shiftInfo =
            (e.shiftKey ? ' shiftKey' : '')
            + (e.ctrlKey ? ' ctrlKey' : '')
            + (e.altKey ? ' altKey' : '')
            + (e.metaKey ? ' metaKey' : '');
        var keyInfo = e.type
            + ' key=' + e.key
            + ' code=' + e.code
            + shiftInfo
            + (e.repeat ? ' (repeat)' : '')
            + "\n";

        var eventTextareaElm = document.getElementById("eventTextarea");

        var curTime = Date.now();
        if (curTime - lastTime > 250) {
            putEventMessage(separator);
        }
        lastTime = curTime;

        if (e.code) {
            if (e.type === "keyup") {
                pressedSet.delete(e.code);
            }
            else if (e.type === "keydown") {
                pressedSet.add(e.code);
            }
        }
        var outputTextareaElm = document.getElementById("outputTextarea");
        outputTextareaElm.value = [...pressedSet.keys()].sort().join(" ") + "\n" + shiftInfo;

        putEventMessage(keyInfo);
        if (e.type === "keydown" || e.type === "keyup") {
            e.preventDefault();
        }
        // e.stopPropergation();
        // e.stopImmediatePropagation();
        // e.preventDefault();
        // return false;
    }

    function compositionStartHandler(e) {
        putEventMessage("compositionStart\n");
        // e.preventDefault();
    }

    function compositionUpdateHandler(e) {
        putEventMessage("compositionUpdate data=" + e.data + "\n");
        // e.preventDefault();
    }

    function compositionEndHandler(e) {
        putEventMessage("compositionEnd data=" + e.data + "\n");
        e.preventDefault();
    }

    function clear() {
        var inputBoxElm = document.getElementById("inputBox");
        inputBoxElm.value = "";
        var eventTextareaElm = document.getElementById("eventTextarea");
        eventTextareaElm.value = "";
    }

    function init() {

        var inputBoxElm = document.getElementById("inputBox");
        inputBoxElm.addEventListener("keydown", keyEventHandler, { passive: false });
        inputBoxElm.addEventListener("keyup", keyEventHandler, { passive: false });
        inputBoxElm.addEventListener("compositionstart", compositionStartHandler);
        inputBoxElm.addEventListener("compositionupdate", compositionUpdateHandler);
        inputBoxElm.addEventListener("compositionend", compositionEndHandler);
        var clearButton = document.getElementById("clearButton");
        clearButton.addEventListener("click", clear);

        document.getElementById("enterFullscreen").addEventListener("click", function () {
            document.documentElement.requestFullscreen();
        });
        document.getElementById("exitFullscreen").addEventListener("click", function () {
            document.exitFullscreen();
        });
        document.getElementById("lockKeyboard").addEventListener("click", function () {
            navigator.keyboard.lock();
        });
        document.getElementById("unlockKeyboard").addEventListener("click", function () {
            navigator.keyboard.unlock();
        });
        // window.addEventListener("keydown", keyEventHandlerWindow, { passive: false });
        // window.addEventListener("keyup", keyEventHandlerWindow, { passive: false });

        inputBoxElm.focus();
    }

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", init);
    }
    else if (document.readyState === "interactive"
        || document.readyState === "complete") {
        init();
    }
    else {
        console.log("unknown document.readyState:" + document.readyState);
    }
})();
