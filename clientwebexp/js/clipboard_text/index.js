(function () {
    function doCopy() {
        var inputTextarea = document.getElementById("inputTextarea");
        inputTextarea.select();
        document.execCommand("copy");
    }

    function doPaste() {
        var inputTextarea = document.getElementById("inputTextarea");
        inputTextarea.focus();
        document.execCommand("paste");
    }

    function init() {
        var copyButton = document.getElementById("copyButton");
        copyButton.addEventListener("click", doCopy);
        var pasteButton = document.getElementById("pasteButton");
        pasteButton.addEventListener("click", doPaste);
    }

    init();
})();
