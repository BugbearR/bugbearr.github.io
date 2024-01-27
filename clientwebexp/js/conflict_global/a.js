var x = 1;
function showX() {
    alert("x is " + x + " in a.js");
}
// window.onload = function () {
window.addEventListener("load", function () {
    showX();
});

