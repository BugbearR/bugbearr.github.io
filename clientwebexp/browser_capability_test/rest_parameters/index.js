(function () {
    function myfunc(...args) {
        return args[args.length - 1];
    }

    function init() {
        try {
            var r = myfunc("a", "b", "OK");
            document.forms[0].result.value = r;
        }
        catch ( e ) {
            document.forms[0].result.value = "NG";
        }
    }

    window.onload = function () { init(); };
})();
