(function () {
    var itemNo = 0;
    var selectedElm = null;

    function randomInt(imin, imax) {
        return Math.floor(Math.random() * (imax - imin + 1)) + imin;
    }

    function randomColorValue() {
        var r = (0x1000000 * Math.random()) & 0xffffff;
        return "#" + r.toString(16).padStart(6, "0");
    }

    function onUnselect() {
        if (selectedElm !== null) {
            selectedElm.style.outline = "none";
            selectedElm = null;
        }
    }

    function recalcurateFlexboxWidth() {
        var myflexboxElm = document.getElementById("myflexbox");
        const parentRect = myflexboxElm.getBoundingClientRect();
        const parentLeft = parentRect.left;
        var testElm = myflexboxElm.lastElementChild;
        var memoLeft = undefined;
        var memoRight = undefined;
        while (testElm !== null) {
            // console.log(testElm.getAttribute("id"));
            testRect = testElm.getBoundingClientRect();
            const testLeft = testRect.left;
            // console.log(`testLeft=${testLeft}, parentLeft=${parentLeft}`);
            const relLeft = testLeft - parentLeft;
            const relRight = relLeft + testRect.width;
            // Escape the loop when the left position is no longer the most right side.
            // console.log(`baseLeft=${baseLeft}, relLeft=${relLeft}`);
            // console.log(`baseRight=${baseRight}, relRight=${relRight}`);
            if (memoLeft === undefined) {
                memoLeft = relLeft;
                memoRight = relRight;
            } else {
                if (memoLeft > relLeft) {
                    break;
                }
            }
            if (memoRight < relRight) {
                memoRight = relRight;
            }
            testElm = testElm.previousElementSibling;
        }
        if (memoRight !== undefined) {
            myflexboxElm.style.width = memoRight + "px";
        } else {
            myflexboxElm.style.width = "0px";
        }
    }

    function onCreate() {
        var width = Number(document.getElementById("widthInput").value);
        var height = Number(document.getElementById("heightInput").value);
        var backgroundColor = document.getElementById("backgroundColorInput").value;
        var content = document.getElementById("contentInput").value;
        if (width === 0) {
            width = randomInt(30, 100);
        }
        if (height === 0) {
            height = randomInt(30, 100);
        }
        if (backgroundColor === "") {
            backgroundColor = randomColorValue();
        }

        var myflexboxElm = document.getElementById("myflexbox");
        var divElm = document.createElement("div");
        divElm.addEventListener("click", onSelect);
        divElm.addEventListener("touchstart", onSelect);
        divElm.setAttribute("id", `item${itemNo}`);
        divElm.textContent = content;
        itemNo++;
        if (selectedElm !== null) {
            selectedElm.insertAdjacentElement("beforebegin", divElm);
        } else {
            myflexboxElm.insertAdjacentElement("beforeend", divElm);
        }

        divElm.style.width = width + "px";
        divElm.style.height = height + "px";
        divElm.style.backgroundColor = backgroundColor;
        recalcurateFlexboxWidth();
    }

    function onUpdate() {
        if (selectedElm !== null) {
            var width = Number(document.getElementById("widthInput").value);
            var height = Number(document.getElementById("heightInput").value);
            var backgroundColor = document.getElementById("backgroundColorInput").value;
            if (width !== 0) {
                selectedElm.style.width = width + "px";
            }
            if (height !== 0) {
                selectedElm.style.height = height + "px";
            }
            if (backgroundColor !== "") {
                selectedElm.style.backgroundColor = backgroundColor;
            }
        }

        recalcurateFlexboxWidth();
    }

    function onDelete() {
        if (selectedElm !== null) {
            selectedElm.remove();
            selectedElm = null;
            recalcurateFlexboxWidth();
        }
    }

    function onSelect(evt) {
        onUnselect();
        selectedElm = evt.target;
        selectedElm.style.outline = "1px solid red";
        const compStyle = window.getComputedStyle(evt.target);

        document.getElementById("widthInput").value = compStyle.width.replace("px", "");
        document.getElementById("heightInput").value = compStyle.height.replace("px", "");
        document.getElementById("backgroundColorInput").value = compStyle.backgroundColor;
        document.getElementById("contentInput").value = evt.target.textContent;
        evt.stopPropagation();
    }

    function onKeyUp(evt) {
        if (evt.key === "Delete") {
            onDelete();
        } else if (evt.key === "Escape") {
            onUnselect();
        }
    }

    function init() {
        var myflexboxElm = document.getElementById("myflexbox");
        myflexboxElm.addEventListener("click", onUnselect);
        myflexboxElm.addEventListener("touchstart", onUnselect);
        window.addEventListener("keyup", onKeyUp);
        document.getElementById("createButton").addEventListener("click", onCreate);
        document.getElementById("updateButton").addEventListener("click", onUpdate);
        document.getElementById("deleteButton").addEventListener("click", onDelete);
        recalcurateFlexboxWidth();
    }

    init();
})();
