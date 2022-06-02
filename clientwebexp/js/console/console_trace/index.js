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

    function sampleFuncA(obj) {
        sampleFuncB(obj);
    }

    function sampleFuncB(obj) {
        console.trace(obj);
    }

    function onCallConsoleTraceExp() {
        var text1Elm = document.forms[0].text1;
        sampleFuncA(text1Elm.value);
        var r = {
            value: text1Elm.value,
            typeofConsole: typeof console
        };
        if (typeof console != "undefined") {
            r.typeofConsoleTrace = typeof console.trace;
        }
        alert("console.trace passed! " + JSON.stringify(r));
    }

    function init() {
        var callConsoleTraceElm = document.getElementById("callConsoleTraceExp");
        callConsoleTraceElm.addEventListener("click", onCallConsoleTraceExp);
    }

    init();
})();
