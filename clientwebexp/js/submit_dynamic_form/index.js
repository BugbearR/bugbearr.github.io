(function () {
    function doSubmit() {
        var form = document.createElement("form");
        form.action = "https://exp2.bugbearr.jp/dumppost.php";
        form.method = "post";
        form.target = "_top";
        var inputElm = document.createElement("input");
        inputElm.type = "hidden";
        inputElm.name = "myvalue";
        inputElm.value = "こんにちは世界";
        form.appendChild(inputElm);
        document.body.appendChild(form);
        form.submit();
    }

    function init() {
        var submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", doSubmit);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
