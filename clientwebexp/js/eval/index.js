(function () {
    function doEval() {
        var inArea = document.getElementById("inputTextarea");
        var outArea = document.getElementById("outputTextarea");
        try {
            outArea.value = eval(inArea.value);
        }
        catch (exc) {
            outArea.value = exc.name + ":" + exc.message;
        }
    }

    function init() {
        var evalButton = document.getElementById("evalButton");
        evalButton.addEventListener("click", doEval);
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
