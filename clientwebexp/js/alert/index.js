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
