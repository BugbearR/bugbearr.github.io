(function () {
    function onClickDownload() {
        var myBlob = new Blob(["Hello, world"], {type: "text/plain"});
        var fileName = "Hello.txt";
        if (navigator && navigator.msSaveBlob) { // IE >= 10
            navigator.msSaveBlob(myBlob, fileName);
        }
        else {
            var downloadLink = document.createElement("a");
            downloadLink.download = fileName;
            downloadLink.href = URL.createObjectURL(myBlob);
            downloadLink.click();
        }
    }

    function init() {
        var downloadButton = document.forms[0].downloadButton;
        downloadButton.addEventListener("click", onClickDownload);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
