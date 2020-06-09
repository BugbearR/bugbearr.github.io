(function () {
    window.addEventListener("beforeunload", function (e) {
        e.preventDefault(); // Web standard
        e.returnValue = ""; // compatibility
    });
})();
