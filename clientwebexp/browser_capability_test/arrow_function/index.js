(function () {
    function init() {
        try {
            var r = ((a, b) => { return a + b; })(2, 3);
            document.forms[0].result.value = (r == 5) ? "OK" : "NG";
        }
        catch ( e ) {
            document.forms[0].result.value = "NG";
        }
    }

    window.onload = function () { init(); };
})();
