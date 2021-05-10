(function () {
    window.onbeforeunload = function (e) {
        e.preventDefault(); // Web standard
        e.returnValue = ""; // compatibility
        return ""; // compatibility
    };
})();
