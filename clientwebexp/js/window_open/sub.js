(function () {
    function doEval() {
        var inArea = document.forms[0].inputTextarea;
        var outArea = document.forms[0].outputTextarea;
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

    window.addEventListener("DOMContentLoaded", init);
})();
