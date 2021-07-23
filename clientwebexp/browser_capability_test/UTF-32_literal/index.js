(function () {
    function init() {
        if ("\u{0004f}\u{0004b}" === "OK"
                && "\u{2000B}" === "\uD840\uDC0B") {
            document.forms[0].result.value = "\u{0004f}\u{0004b}";
        } else {
            document.forms[0].result.value = "NG";
        }
    }

    window.onload = function () { init(); };
})();
