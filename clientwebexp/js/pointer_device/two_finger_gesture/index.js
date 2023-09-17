(function () {
    function createUUIDv4() {
        return crypto.randomUUID();
    }

    function putLog(obj) {
        if (typeof obj === "string") {
            msg = obj;
        } else {
            msg = JSON.stringify(obj);
        }
        const logElm = document.getElementById("log");
        const divElm = document.createElement("div");
        divElm.textContent = msg;
        logElm.appendChild(divElm);
        if (logElm.childElementCount > 50) {
            logElm.removeChild(logElm.firstChild);
        }
    }

    function translate(x, y, dx, dy) {
        return {x: x + dx, y: y + dy};
    }

    function rotate(x, y, theta) {
        var cosTheta = Math.cos(theta);
        var sinTheta = Math.sin(theta);
        return {x: x * cosTheta - y * sinTheta, y: x * sinTheta + y * cosTheta};
    }

    function scale(x, y, scale) {
        return {x: x * scale, y: y * scale};
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} dx (on screen coordinate)
     * @param {number} dy (on screen coordinate)
     * @param {number} scale
     * @param {number} theta (radian)
     */
    function translateOnRotateAndScaled(x, y, dx, dy, scale, theta) {
        var rotated = rotate(dx, dy, theta);
        rotated = scale(rotated.x, rotated.y, scale);
        return translate(x, y, rotated.x, rotated.y);
    }

    function rotateAtPoint(x, y, cx, cy, theta) {
        var dx = x - cx;
        var dy = y - cy;
        var rotated = rotate(dx, dy, theta);
        return {x: rotated.x + cx, y: rotated.y + cy};
    }

    function scaleAtPoint(x, y, cx, cy, scale) {
        var dx = x - cx;
        var dy = y - cy;
        var scaled = scale(dx, dy, scale);
        return {x: scaled.x + cx, y: scaled.y + cy};
    }

    class SvgView {
        constructor(baseElmId, svgFragment) {
            this.baseElmId = baseElmId;

            this.translateX = 0;
            this.translateY = 0;
            this.scale = 1;
            this.rotate = 0; // degree

            this.svgFragment = svgFragment;
        }

        init() {
            const baseElm = document.getElementById(this.baseElmId);
            this.baseElm = baseElm;
            this.getSizeFromBaseElm();

            new MutationObserver(((mutations) => {
                this.resize();
            }).bind(this)).observe(baseElm, {attributes: true});

            const svgElm = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgId = createUUIDv4();
            this.svgElm = svgElm;
            svgElm.setAttribute("id", this.svgId);
            svgElm.setAttribute("width", "100%");
            svgElm.setAttribute("height", "100%");
            svgElm.setAttribute("viewBox", `${this.translateX} ${this.translateY} ${this.width} ${this.height}`);
            this.svgElm = svgElm;

            baseElm.appendChild(svgElm);

            const viewGElm = document.createElementNS("http://www.w3.org/2000/svg", "g");
            this.viewGId = createUUIDv4();
            this.viewGElm = viewGElm;
            viewGElm.setAttribute("id", this.viewGId);
            viewGElm.setAttribute("transform", `translate(${this.translateX}, ${this.translateY}) rotate(${this.rotate}) scale(${this.scale})`);

            this.svgElm.appendChild(viewGElm);
            this.baseElm.appendChild(svgElm);
        }

        getSizeFromBaseElm() {
            var rect = this.baseElm.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
        }

        resize() {
            this.getSizeFromBaseElm();
            this.svgElm.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);

            this.render();
        }

        // convertViewPointToSvgPoint(x, y) {
        //     const pt = translate(x, y, this.translateX, this.translateY);
        //     const rotate(pt.x, pt.y, this.rotate);
        //     const wx = (x - this.translateX) / this.scale;
        //     const wy = (y - this.translateY) / this.scale;

        //     return {x: x - this.translateX, y: y - this.translateY};
        // }

        renderGrid() {
            const xLineElm = document.createElementNS("http://www.w3.org/2000/svg", "line");
            xLineElm.setAttribute("x1", 0);
            xLineElm.setAttribute("x2", 100);
            xLineElm.setAttribute("y1", 0);
            xLineElm.setAttribute("y2", 0);
            xLineElm.setAttribute("stroke", "red");
            xLineElm.setAttribute("stroke-width", 1);
            this.viewGElm.appendChild(xLineElm);

            const yLineElm = document.createElementNS("http://www.w3.org/2000/svg", "line");
            yLineElm.setAttribute("x1", 0);
            yLineElm.setAttribute("x2", 0);
            yLineElm.setAttribute("y1", 0);
            yLineElm.setAttribute("y2", 100);
            yLineElm.setAttribute("stroke", "green");
            yLineElm.setAttribute("stroke-width", 1);
            this.viewGElm.appendChild(yLineElm);

            const clrcleElm = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            clrcleElm.setAttribute("cx", 0);
            clrcleElm.setAttribute("cy", 0);
            clrcleElm.setAttribute("r", 10);
            clrcleElm.setAttribute("fill", "blue");
            this.viewGElm.appendChild(clrcleElm);
        }

        render() {
            this.viewGElm.innserHTML = "";
            this.viewGElm.setAttribute("transform", `translate(${this.translateX}, ${this.translateY}) rotate(${this.rotate}) scale(${this.scale})`);
            this.renderGrid();
            // if (this.svgFragment) {
            //     this.viewGElm.appendChild(this.svgFragment);
            // }
        }

        getTranslate() {
            return {x:this.translateX, y:this.translateY};
        }

        setTranslate(pos) {
            this.translateX = pos.x;
            this.translateY = pos.y;
        }

        getScale() {
            return this.scale;
        }

        setScale(scale) {
            this.scale = scale;
        }

        getRotate() {
            return this.rotate;
        }

        setRotate(rotate) {
            this.rotate = rotate;
        }
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

    function isTwoFingerGesture() {
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

    var svgView = null;
    var viewScale = 1;
    var viewTranslate = {x: 0, y: 0};
    var viewRotate = 0;

    function init() {
        var svgElm = document.getElementById("svg1");

        svgView = new SvgView("sample");
        svgView.init();
        svgView.render();

        svgElm.addEventListener("pointerup", (evt) => {
            putLog("pointerup");
            if (evt.target !== svgElm) {
                putLog("not mine");
                return;
            }
            removePointerId(evt.pointerId);
            removeCrosshair(evt.pointerId);
        });

        svgElm.addEventListener("pointerdown", (evt) => {
            putLog("pointerdown");
            if (evt.target !== svgElm) {
                putLog("not mine");
                return;
            }
            addPointerId(evt.pointerId, {x: evt.offsetX, y: evt.offsetY});
            createCrosshair(evt.offsetX, evt.offsetY, evt.pointerId);

            if (isTwoFingerGesture()) {
                putLog("two finger gesture");
                twoFingerStartState = calcTwoFingerState();
                viewScale = svgView.getScale();
                viewTranslate = svgView.getTranslate();
                viewRotate = svgView.getRotate();
                putTwoFingerState(twoFingerStartState);
            }
        });

        svgElm.addEventListener("pointermove", (evt) => {
            putLog("pointermove");
            if (evt.target !== svgElm) {
                putLog("not mine");
                return;
            }
            putLog(`pointerIdList.length: ${pointerIdList.length}`);
            removeCrosshair(evt.pointerId);
            createCrosshair(evt.offsetX, evt.offsetY, evt.pointerId);
            var i = pointerIdList.indexOf(evt.pointerId);
            if (i >= 0) {
                pointerStatusList[i] = {x: evt.offsetX, y: evt.offsetY};
            }

            if (isTwoFingerGesture()) {
                putLog("two finger gesture");
                var twoFingerEndState = calcTwoFingerState();
                putTwoFingerState(twoFingerEndState);

                var dx = twoFingerEndState.x - twoFingerStartState.x;
                var dy = twoFingerEndState.y - twoFingerStartState.y;
                var d = twoFingerEndState.d - twoFingerStartState.d;
                var theta = twoFingerEndState.theta - twoFingerStartState.theta;
                var scale = twoFingerEndState.d / twoFingerStartState.d;
                var newViewX = viewTranslate.x + dx;
                var newViewY = viewTranslate.y + dy;
                var vdx = newViewX - twoFingerEndState.x;
                var vdy = newViewY - twoFingerEndState.y;
                var vmx = vdx * Math.cos(theta) - vdy * Math.sin(theta);
                var vmy = vdx * Math.sin(theta) + vdy * Math.cos(theta);
                var resViewX = twoFingerEndState.x + vmx;
                var resViewY = twoFingerEndState.y + vmy;
                svgView.setRotate(viewRotate + 180 * theta / Math.PI)
                svgView.setTranslate({x: resViewX, y: resViewY});
                svgView.setScale(viewScale * scale);
                svgView.render();
                putLog(`dx: ${dx}, dy: ${dy}, d: ${d}, theta: ${theta}, scale: ${scale}`);
            }
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
