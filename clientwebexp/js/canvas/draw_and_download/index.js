(function () {
    function test() {
        var canvas = document.getElementById("canvas1");

        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(30, 50);
        ctx.lineTo(150, 100);
        ctx.stroke();

        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "download.png";
        a.click();
    }

    function init() {
        document.getElementById("testButton").addEventListener("click", test);
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
