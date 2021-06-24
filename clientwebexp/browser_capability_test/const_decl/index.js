(function () {
    function init() {
        const myvar = "OK";
        document.forms[0].result.value = myvar;
    }

    window.onload = function () { init(); };
})();
