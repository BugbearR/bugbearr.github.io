(function () {
    var x = 2;
    function showX() {
        alert("x is " + x + " in b.js");
    }
    // window.onload = function () {
    window.addEventListener("load", function () {
        showX();
    });
})();
