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

    function randomInt(imin, imax) {
        return Math.floor(Math.random() * (imax - imin + 1)) + imin;
    }

    function randomColorValue() {
        var r = (0x1000000 * Math.random()) & 0xffffff;
        return "#" + r.toString(16).padStart(6, "0");
    }

    function endDrag(evt) {
        evt.target.removeEventListener("pointerup", endDrag)
        evt.target.removeEventListener("pointermove", drag)
    }

    function drag(evt) {
        // var curtop = getComputedStyle(evt.target).top;
        var curPointerX = evt.pageX;
        var curPointerY = evt.pageY;
        var dx = curPointerX - pointerX;
        var dy = curPointerY - pointerY;
        evt.target.style.left = (objX + dx).toString() + "px";
        evt.target.style.top = (objY + dy).toString() + "px";
    }

    function startDrag(evt) {
        console.log(evt);
        if (evt.target.setPointerCapture && evt.pointerId !== undefined) {
            evt.target.setPointerCapture(evt.pointerId);
        }
        pointerX = evt.pageX;
        pointerY = evt.pageY;
        var targetStyle = getComputedStyle(evt.target);
        objX = parseInt(targetStyle.left, 10);
        objY = parseInt(targetStyle.top, 10);
        evt.target.addEventListener("pointerup", endDrag);
        evt.target.addEventListener("pointermove", drag);
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
        document.body.appendChild(divElm);
    }

    function isIE11() {
        if ( ! navigator || ! navigator.userAgent ) return false;
        var ua = navigator.userAgent;
        return ( /\bTrident\// ).test( ua ) && ( /\brv[ :]11\./ ).test( ua );
    }

    function init() {
        if (isIE11()) {

        }
        document.getElementById("addRectButton").addEventListener("click", addRect);
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
