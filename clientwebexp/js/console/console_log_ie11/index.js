(function () {
    function onCallConsoleLog() {
        var text1Elm = document.forms[0].text1;
        console.log(text1Elm.value);
        alert("console.log passed! :" + text1Elm.value);
    }

    function init() {
        var callConsoleLogElm = document.getElementById("callConsoleLog");
        callConsoleLogElm.addEventListener("click", onCallConsoleLog);
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
