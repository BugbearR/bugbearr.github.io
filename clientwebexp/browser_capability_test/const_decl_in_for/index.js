(function () {
    function init() {
        var matchItems = { a: false, b: false, c: false };
        var items = { a: 1, b: 2, c: 3 };
        for (const item in items) {
            matchItems[item] = true;
        }
        var notMatch = false;
        for (var matchItem in matchItems) {
            if (!matchItem) {
                notMatch = true;
                break;
            }
        }
        document.forms[0].result.value = (notMatch) ? "NG" : "OK";
    }

    window.onload = function () { init(); };
})();
