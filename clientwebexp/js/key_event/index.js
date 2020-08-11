(function () {
    var separator = new Array(79).join('-') + "\n";
    var lastTime = Date.now();

    // from https://ja.javascript.info/keyboard-events
    function keyEventHandler(e) {
        var keyInfo = e.type
            + ' key=' + e.key
            + ' code=' + e.code
            + (e.shiftKey ? ' shiftKey' : '')
            + (e.ctrlKey ? ' ctrlKey' : '')
            + (e.altKey ? ' altKey' : '')
            + (e.metaKey ? ' metaKey' : '')
            + (e.repeat ? ' (repeat)' : '')
            + "\n";

        var outArea = document.getElementById("outputTextarea");

        var curTime = Date.now();
        if (curTime - lastTime > 250) {
            outArea.value += separator;
        }
        lastTime = curTime;

        outArea.value += keyInfo;
        if (e.type === "keydown" || e.type === "keyup") {
            e.preventDefault();
        }
    }

    function clear() {
        var outArea = document.getElementById("outputTextarea");
        outArea.value = "";
    }

    function init() {
        window.addEventListener("keydown", keyEventHandler);
        window.addEventListener("keyup", keyEventHandler);
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
