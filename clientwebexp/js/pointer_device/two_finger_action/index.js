(function () {
    function putLog(msg) {
        var logElm = document.getElementById("log");
        var a = logElm.value.split("\n").slice(0,9);
        a.unshift(msg);
        logElm.value = a.join("\n");
    }

    function removeCrosshair(n) {
        var circleElm = document.getElementById(`crosshairCircle${n}`);
        if (circleElm) {
            circleElm.remove();
        }
        var xLineElm = document.getElementById(`crosshairXLine${n}`);
        if (xLineElm) {
            xLineElm.remove();
        }
        var yLineElm = document.getElementById(`crosshairYLine${n}`);
        if (yLineElm) {
            yLineElm.remove();
        }
    }

    function createCrosshair(x, y, n) {
        var circleElm = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleElm.setAttribute("id", `crosshairCircle${n}`);
        circleElm.setAttribute("cx", x);
        circleElm.setAttribute("cy", y);
        circleElm.setAttribute("r", 10);
        circleElm.setAttribute("fill", "none");
        circleElm.setAttribute("stroke", "black");
        circleElm.setAttribute("stroke-width", 1);
        var xLineElm = document.createElementNS("http://www.w3.org/2000/svg", "line");
        xLineElm.setAttribute("id", `crosshairXLine${n}`);
        xLineElm.setAttribute("x1", x - 100);
        xLineElm.setAttribute("y1", y);
        xLineElm.setAttribute("x2", x + 100);
        xLineElm.setAttribute("y2", y);
        xLineElm.setAttribute("stroke", "black");
        xLineElm.setAttribute("stroke-width", 1);
        var yLineElm = document.createElementNS("http://www.w3.org/2000/svg", "line");
        yLineElm.setAttribute("id", `crosshairYLine${n}`);
        yLineElm.setAttribute("x1", x);
        yLineElm.setAttribute("y1", y - 100);
        yLineElm.setAttribute("x2", x);
        yLineElm.setAttribute("y2", y + 100);
        yLineElm.setAttribute("stroke", "black");
        yLineElm.setAttribute("stroke-width", 1);
        var svgElm = document.getElementById("svg1");
        svgElm.appendChild(circleElm);
        svgElm.appendChild(xLineElm);
        svgElm.appendChild(yLineElm);
    }

    var pointerIdList = [];
    var pointerStatusList = [];
    var twoFingerStartState = null;

    function removePointerId(id) {
        var i = pointerIdList.indexOf(id);
        if (i >= 0) {
            pointerIdList.splice(i, 1);
            pointerStatusList.splice(i, 1);
        }
    }

    function addPointerId(id, pointerStatus) {
        pointerIdList.push(id);
        pointerStatusList.push(pointerStatus);
    }

    function isTwoFingerAction() {
        return pointerIdList.length == 2;
    }

    function calcTwoFingerState() {
        var x0 = pointerStatusList[0].x;
        var y0 = pointerStatusList[0].y;
        var x1 = pointerStatusList[1].x;
        var y1 = pointerStatusList[1].y;
        var x = (x0 + x1) / 2;
        var y = (y0 + y1) / 2;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var d = Math.sqrt(dx * dx + dy * dy);
        var theta = Math.atan2(dy, dx);
        return {x0: x0, y0: y0, x1: x1, y1: y1, x: x, y: y, d: d, theta: theta};
    }

    function putTwoFingerState(state) {
        putLog(`x0: ${state.x0}, y0: ${state.y0}, x1: ${state.x1}, y1: ${state.y1}, x: ${state.x}, y: ${state.y}, d: ${state.d}, theta: ${state.theta}`);
    }

    function init() {
        var svgElm = document.getElementById("svg1");

        svgElm.addEventListener("pointerup", (evt) => {
            if (evt.target !== svgElm) {
                return;
            }
            removePointerId(evt.pointerId);
            removeCrosshair(evt.pointerId);
        });

        svgElm.addEventListener("pointerdown", (evt) => {
            if (evt.target !== svgElm) {
                return;
            }
            addPointerId(evt.pointerId, {x: evt.offsetX, y: evt.offsetY});
            createCrosshair(evt.offsetX, evt.offsetY, evt.pointerId);

            if (isTwoFingerAction()) {
                putLog("two finger action");
                twoFingerStartState = calcTwoFingerState();
                putTwoFingerState(twoFingerStartState);
            }
        });

        svgElm.addEventListener("pointermove", (evt) => {
            if (evt.target !== svgElm) {
                return;
            }
            putLog(`pointerIdList.length: ${pointerIdList.length}`);
            removeCrosshair(evt.pointerId);
            createCrosshair(evt.offsetX, evt.offsetY, evt.pointerId);
            var i = pointerIdList.indexOf(evt.pointerId);
            if (i >= 0) {
                pointerStatusList[i] = {x: evt.offsetX, y: evt.offsetY};
            }

            if (isTwoFingerAction()) {
                putLog("two finger action");
                var twoFingerEndState = calcTwoFingerState();
                putTwoFingerState(twoFingerEndState);

                var dx = twoFingerEndState.x - twoFingerStartState.x;
                var dy = twoFingerEndState.y - twoFingerStartState.y;
                var d = twoFingerEndState.d - twoFingerStartState.d;
                var theta = twoFingerEndState.theta - twoFingerStartState.theta;
                var scale = twoFingerEndState.d / twoFingerStartState.d;
                putLog(`dx: ${dx}, dy: ${dy}, d: ${d}, theta: ${theta}, scale: ${scale}`);
            }
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
