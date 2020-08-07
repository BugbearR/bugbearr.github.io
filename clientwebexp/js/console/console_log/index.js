(function () {
    window.onerror = function(message, source, lineno, colno, error) {
        alert('Error. ' + JSON.stringify({
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            error: error
        }));
    };

    function onCallConsoleLog() {
        var text1Elm = document.forms[0].text1;
        console.log(text1Elm.value);
        var r = {
            value: text1Elm.value,
            typeofConsole: typeof console
        };
        if (typeof console != "undefined") {
            r.typeofConsoleLog = typeof console.log;
        }
        alert("console.log passed! " + JSON.stringify(r));
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
