(function () {
    function callAlert() {
        var inputTextarea = document.getElementById("inputTextarea");
        alert(inputTextarea.value);
    }

    function init() {
        document.getElementById("userAgent").appendChild(document.createTextNode(navigator.userAgent));
        var alertButton = document.getElementById("alertButton");
        alertButton.addEventListener("click", callAlert);
    }

    init();
})();
