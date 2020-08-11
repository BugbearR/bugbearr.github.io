(function () {
    var timerId;
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

    function updateOutput() {
        var writer = new StringWriter();
        dumpObject(document.forms[0].input1.value, writer);
        var input1Value = document.getElementById("input1Value");
        input1Value.textContent = writer.toString();
        writer.clear();
        dumpObject(document.forms[0].input2.value, writer);
        var input2Value = document.getElementById("input2Value");
        input2Value.textContent = writer.toString();
    }

    function init() {
        timerId = setInterval(updateOutput, 500);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
