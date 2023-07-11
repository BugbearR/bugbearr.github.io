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
    function keyEventHandler(e, targetName) {
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

        putEventMessage(targetName + ":" + keyInfo);
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
        var eventTextareaElm = document.getElementById("eventTextarea");
        eventTextareaElm.value = "";
    }

    function init() {

        // var inputBoxElm = document.getElementById("inputBox");
        window.addEventListener("keydown", (e) => { keyEventHandler(e, "window"); }, { passive: false });
        window.addEventListener("keyup", (e) => { keyEventHandler(e, "window"); }, { passive: false });
        document.addEventListener("keydown", (e) => { keyEventHandler(e, "document"); }, { passive: false });
        document.addEventListener("keyup", (e) => { keyEventHandler(e, "document"); }, { passive: false });
        var element1 = document.getElementById("element1");
        element1.addEventListener("keydown", (e) => { keyEventHandler(e, "element1"); }, { passive: false });
        element1.addEventListener("keyup", (e) => { keyEventHandler(e, "element1"); }, { passive: false });
        var element2 = document.getElementById("element2");
        element2.addEventListener("keydown", (e) => { keyEventHandler(e, "element2"); }, { passive: false });
        element2.addEventListener("keyup", (e) => { keyEventHandler(e, "element2"); }, { passive: false });
        // inputBoxElm.addEventListener("compositionstart", compositionStartHandler);
        // inputBoxElm.addEventListener("compositionupdate", compositionUpdateHandler);
        // inputBoxElm.addEventListener("compositionend", compositionEndHandler);
        var clearButton = document.getElementById("clearButton");
        clearButton.addEventListener("click", clear);

        // window.addEventListener("keydown", keyEventHandlerWindow, { passive: false });
        // window.addEventListener("keyup", keyEventHandlerWindow, { passive: false });

        inputBoxElm.focus();
    }

    init();
})();
