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

    init();
})();
