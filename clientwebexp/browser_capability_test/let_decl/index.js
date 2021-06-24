(function () {
    function init() {
        let myvar = "OK";
        document.forms[0].result.value = myvar;
    }

    window.onload = function () { init(); };
})();
