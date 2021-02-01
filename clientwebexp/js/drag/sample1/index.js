// from https://github.com/behnammodi/polyfill/blob/master/string.polyfill.js
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

(function () {
    var pointerX;
    var pointerY;
    var objX;
    var objY;
    var mode;

    function myLog(s) {
        var logAreaElm = document.getElementById("logArea");
        var text = logAreaElm.value;
        var r = s + "\n" + text.split("\n").slice(0, 10).join("\n");
        logAreaElm.value = r;
    }

    function randomInt(imin, imax) {
        return Math.floor(Math.random() * (imax - imin + 1)) + imin;
    }

    function randomColorValue() {
        var r = (0x1000000 * Math.random()) & 0xffffff;
        return "#" + r.toString(16).padStart(6, "0");
    }

    function endDrag(evt) {
        myLog("endDrag(" + evt.pageX + "," + evt.pageY+ ")");
        if (mode == "pointer") {
            evt.target.removeEventListener("pointerup", endDrag)
            evt.target.removeEventListener("pointermove", drag)
        } else if (mode == "touch") {
            evt.target.removeEventListener("touchend", endDrag)
            evt.target.removeEventListener("touchmove", drag)
        }
        evt.preventDefault();
    }

    function drag(evt) {
        // var curtop = getComputedStyle(evt.target).top;
        myLog("drag(" + evt.pageX + "," + evt.pageY+ ")");
        var curPointerX = evt.pageX;
        var curPointerY = evt.pageY;
        var dx = curPointerX - pointerX;
        var dy = curPointerY - pointerY;
        evt.target.style.left = (objX + dx).toString() + "px";
        evt.target.style.top = (objY + dy).toString() + "px";
        evt.preventDefault();
    }

    function startDrag(evt) {
        myLog("startDrag(" + evt.type + "," + evt.pageX + "," + evt.pageY+ ")");
        //console.log(evt);

        if (evt.target.setPointerCapture && evt.pointerId !== undefined) {
            evt.target.setPointerCapture(evt.pointerId);
            myLog("setPointerCapture");
        }
        pointerX = evt.pageX;
        pointerY = evt.pageY;
        var targetStyle = getComputedStyle(evt.target);
        objX = parseInt(targetStyle.left, 10);
        objY = parseInt(targetStyle.top, 10);

        if (evt.type == "pointerdown") {
            mode = "pointer";
            evt.target.addEventListener("pointerup", endDrag);
            evt.target.addEventListener("pointermove", drag);
        } else if (evt.type == "touchstart") {
            mode = "touch";
            evt.target.addEventListener("touchend", endDrag);
            evt.target.addEventListener("touchmove", drag);
        }

        evt.preventDefault();
    }

    function addRect(evt) {
        var baseElm = document.body;
        // baseElm.clientHeight;
        // baseElm.clientWidth;
        var divElm = document.createElement("div");
        var width = randomInt(10, 100);
        var height = randomInt(10, 100);
        var top = randomInt(0, baseElm.clientHeight - height / 2);
        var left = randomInt(0, baseElm.clientWidth - width / 2);
        divElm.style.backgroundColor = randomColorValue();
        divElm.style.position = "absolute";
        divElm.style.top = top.toString() + "px";
        divElm.style.left = left.toString() + "px";
        divElm.style.width = width.toString() + "px";
        divElm.style.height = height.toString() + "px";
        divElm.addEventListener("pointerdown", startDrag);
        divElm.addEventListener("touchstart", startDrag);
        document.body.appendChild(divElm);
    }

    function isIE11() {
        if ( ! navigator || ! navigator.userAgent ) return false;
        var ua = navigator.userAgent;
        return ( /\bTrident\// ).test( ua ) && ( /\brv[ :]11\./ ).test( ua );
    }
    var initCalled = false;

    function init() {
        if (initCalled) return;
        initCalled = true;
        if (isIE11()) {

        }
        document.getElementById("logArea").value = "Hello, world!";
        document.getElementById("addRectButton").addEventListener("click", addRect);
    }

    window.addEventListener("DOMContentLoaded", init);
    init();
})();
