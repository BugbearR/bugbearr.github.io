(function () {
    function target_requestFullscreen() {
        document.getElementById("target").requestFullscreen();
    }

    function target_onFullscreenChange() {
        var style = window.getComputedStyle(document.getElementById("target"));
        document.getElementById("targetSize").textContent = style.width + "," + style.height;
    }

    function requestFullscreen() {
        document.documentElement.requestFullscreen();
    }

    function exitFullscreen() {
        document.exitFullscreen();
    }

    function init() {
        document.getElementById("requestFullscreen").addEventListener("click", requestFullscreen);
        document.getElementById("target_requestFullscreen").addEventListener("click", target_requestFullscreen);
        document.getElementById("exitFullscreen").addEventListener("click", exitFullscreen);

        document.getElementById("target").addEventListener("fullscreenchange", target_onFullscreenChange);
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
