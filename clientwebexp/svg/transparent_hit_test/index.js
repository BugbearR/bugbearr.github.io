(function () {
    function init() {
        document.getElementById("circle1").addEventListener("click", function() {
            alert("transparent");
        });
        document.getElementById("circle2").addEventListener("click", function() {
            alert("none");
        });
        document.getElementById("circle3").addEventListener("click", function() {
            alert("normal");
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
