(function () {
    var separator = new Array(79).join('-') + "\n";
    var lastTime = Date.now();
    var pressedSet = new Set();

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
            eventTextareaElm.value += separator;
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

        eventTextareaElm.value += keyInfo;
        eventTextareaElm.scrollTop = eventTextareaElm.scrollHeight;
        if (e.type === "keydown" || e.type === "keyup") {
            e.preventDefault();
        }
    }

    function clear() {
        var eventTextareaElm = document.getElementById("eventTextarea");
        eventTextareaElm.value = "";
    }

    function init() {
        var inputBoxElm = document.getElementById("inputBox");
        inputBoxElm.addEventListener("keydown", keyEventHandler);
        inputBoxElm.addEventListener("keyup", keyEventHandler);
        var clearButton = document.getElementById("clearButton");
        clearButton.addEventListener("click", clear);
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
