(function () {
    function showScreenSize() {
        document.getElementById("screenWidth").textContent = window.screen.width;
        document.getElementById("screenHeight").textContent = window.screen.height;
        document.getElementById("screenOrientation").textContent = `type: ${window.screen.orientation.type} angle: ${window.screen.orientation.angle}`;
    }

    function showWindowSize() {
        document.getElementById("innerWidth").textContent = window.innerWidth;
        document.getElementById("innerHeight").textContent = window.innerHeight;
    }

    function showDivRootSize() {
        const divRoot = document.getElementById("root");
        const divRootStyle = window.getComputedStyle(divRoot);
        document.getElementById("divRootWidth").textContent = divRootStyle.width;
        document.getElementById("divRootHeight").textContent = divRootStyle.height;
    }

    function showSizeAll() {
        showScreenSize();
        showWindowSize();
        showDivRootSize();
    }

    function init() {
        document.getElementById("ua").appendChild(document.createTextNode(navigator.userAgent));

        const style = window.getComputedStyle(document.body);
        const props = [
            "margin-top", "margin-left", "margin-bottom", "margin-right",
            "padding-top", "padding-left", "padding-bottom", "padding-right",
        ];
        for (const prop of props) {
            console.log(`${prop}: ${style.getPropertyValue(prop)}`);
        }

        window.addEventListener("resize", function () {
            showSizeAll();
        });
        window.addEventListener("orientationchange", function () {
            showSizeAll();
        });
    }

    init();
})();
