(function () {
    function onResize() {
        document.getElementById("window_innerWidth").textContent = window.innerWidth;
        document.getElementById("window_innerHeight").textContent = window.innerHeight;
        document.getElementById("window_outerWidth").textContent = window.outerWidth;
        document.getElementById("window_outerHeight").textContent = window.outerHeight;
    }

    function redraw() {
        document.getElementById("window_screenX").textContent = window.screenX;
        document.getElementById("window_screenY").textContent = window.screenY;
        document.getElementById("window_parent_screen_width").textContent = window.parent.screen.width;
        document.getElementById("window_parent_screen_height").textContent = window.parent.screen.height;
        document.getElementById("window_screen_width").textContent = window.screen.width;
        document.getElementById("window_screen_height").textContent = window.screen.height;
        document.getElementById("window_screen_availWidth").textContent = window.screen.availWidth;
        document.getElementById("window_screen_availHeight").textContent = window.screen.availHeight;
        document.getElementById("window_screen_colorDepth").textContent = window.screen.colorDepth;
        document.getElementById("window_screen_pixelDepth").textContent = window.screen.pixelDepth;
        document.getElementById("document_documentElement_clientWidth").textContent = document.documentElement.clientWidth;
        document.getElementById("document_documentElement_clientHeight").textContent = document.documentElement.clientHeight;
        document.getElementById("document_body_clientWidth").textContent = document.body.clientWidth;
        document.getElementById("document_body_clientHeight").textContent = document.body.clientHeight;
    }

    function init() {
        onResize();
        window.addEventListener("resize", onResize);
        setInterval(redraw, 500);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
