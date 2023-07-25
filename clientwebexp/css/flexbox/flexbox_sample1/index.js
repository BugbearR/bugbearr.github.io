(function () {
    function randomInt(imin, imax) {
        return Math.floor(Math.random() * (imax - imin + 1)) + imin;
    }

    function randomColorValue() {
        var r = (0x1000000 * Math.random()) & 0xffffff;
        return "#" + r.toString(16).padStart(6, "0");
    }

    function onCreate() {
        var width = Number(document.getElementById("widthInput").value);
        var height = Number(document.getElementById("heightInput").value);
        var backgroundColor = document.getElementById("backgroundColor").value;
        if (width === 0) {
            width = randomInt(30, 100);
        }
        if (height === 0) {
            height = randomInt(30, 100);
        }
        if (height === 0) {
            height = randomInt(30, 100);
        }

        var myflexboxElm = document.getElementById("myflexbox");
        var divElm = document.createElement("div");
        divElm.style.width = width;
        divElm.style.height = height;
        divElm.style.backgroundColor = backgroundColor;
        divElm.addEventListener("click", onSelect);
        divElm.setAttribute("id", `item${itemNo}`);
        myflexboxElm.insertAdjacentHTML("beforeend", divElm)
    }

    function onUpdate() {

    }

    function onDelete() {

    }

    function onSelect(evt) {
        const compStyle = window.getComputedStyle(evt.target);
        document.getElementById("widthInput").value = compStyle.width;
        document.getElementById("heightInput").value = compStyle.height;
        document.getElementById("backgroundColorInput").value = compStyle.backgroundColor;
    }

    function init() {
        document.getElementById("createButtonElm").addEventListener("click", onCreate);
        document.getElementById("updateButtonElm").addEventListener("click", onUpdate);
        document.getElementById("deleteButtonElm").addEventListener("click", onDelete);
    }

    init();
})();
