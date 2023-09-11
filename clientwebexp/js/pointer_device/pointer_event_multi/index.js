(function () {
    var codeNoAvailList = [false, true, true, true, true, true, true, true, true, true, true];
    var pointerStatusMap = new Map();

    function resizeSvg() {
        var svgElm = document.getElementById("svg1");
        var rootElm = document.getElementById("root");
        var rootRect = rootElm.getBoundingClientRect();
        svgElm.setAttribute("viewBox", `${rootRect.x} ${rootRect.y} ${rootRect.width} ${rootRect.height}`);
        svgElm.setAttribute("width", `${rootRect.width}px`);
        svgElm.setAttribute("height", `${rootRect.height}px`);
    }

    function getCodeNo() {
        var codeNo = codeNoAvailList.findIndex((codeNoAvail) => {
            return codeNoAvail;
        });
        if (codeNo >= 0) {
            codeNoAvailList[codeNo] = false;
        }
        return codeNo;
    }

    function releaseCodeNo(codeNo) {
        if (codeNo >= 0 && codeNo < codeNoAvailList.length) {
            codeNoAvailList[codeNo] = true;
        }
    }

    function releasePointer(pointerId) {
        var pointerStatus = pointerStatusMap.get(pointerId);
        if (pointerStatus !== undefined) {
            releaseCodeNo(pointerStatus.codeNo);
            pointerStatusMap.delete(pointerId);
        }
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    function getPointerStatus(evt) {
        var pointerStatus = pointerStatusMap.get(evt.pointerId);
        if (pointerStatus === undefined) {
            var d = Infinity;
            var nearPointerStatus = undefined;
            pointerStatusMap.forEach((pointerStatusWk) => {
                if (!pointerStatus.isPressed) {
                    var dWk = distance(evt.clientX, evt.clientY, pointerStatusWk.x, pointerStatusWk.y);
                    if (dWk < d) {
                        d = dWk;
                        nearPointerStatus = pointerStatusWk;
                    }
                }
            });

            if (nearPointerStatus !== undefined && d < 10) {
                pointerStatus = nearPointerStatus;
                pointerStatusMap.delete(pointerStatus.pointerId);
                pointerStatus.pointerId = evt.pointerId;
            } else {
                pointerStatus = {
                    pointerId: evt.pointerId,
                    x: evt.clientX,
                    y: evt.clientY,
                    codeNo: getCodeNo()
                };
            }
            pointerStatusMap.set(evt.pointerId, pointerStatus);
        }
        return pointerStatus;
    }

    function cleanGarbagePointer() {
        var curTime = Date.now();
        var garbagePointers = [];
        pointerStatusMap.forEach((pointerStatus) => {
            if (!pointerStatus.isPressed && curTime - pointerStatus.time > 3000) {
                garbagePointers.push(pointerStatus);
            }
        });
        garbagePointers.forEach((pointerStatus) => {
            releasePointer(pointerStatus.pointerId);
        });
    }

    function init() {
        var rootElm = document.getElementById("root");
        resizeSvg();
        new ResizeObserver(() => {
            resizeSvg();
        }).observe(rootElm);

        var svgElm = document.getElementById("svg1");

        setInterval(cleanGarbagePointer, 500);

        svgElm.addEventListener("pointerup", (evt) => {
            var pointerStatus = pointerStatusMap.get(evt.pointerId);
            if (pointerStatus !== undefined) {
                pointerStatus.isPressed = false;
                pointerStatus.x = evt.clientX;
                pointerStatus.y = evt.clientY;
                pointerStatus.time = Date.now();
            }
        });

        svgElm.addEventListener("pointerdown", (evt) => {
            var pointerStatus = getPointerStatus(evt);
            pointerStatus.isPressed = true;
            pointerStatus.x = evt.clientX;
            pointerStatus.y = evt.clientY;
            pointerStatus.time = Date.now();
        });

        svgElm.addEventListener("pointermove", (evt) => {
            var pointerStatus = getPointerStatus(evt);
            pointerStatus.x = evt.clientX;
            pointerStatus.y = evt.clientY;
            pointerStatus.time = Date.now();

            // pressureに基づいてcircleの半径を計算
            let radius = evt.pressure * 5;

            // circle要素を作成
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            // クライアント座標とSVG座標は同じ
            circle.setAttribute("cx", evt.clientX);
            circle.setAttribute("cy", evt.clientY);
            if (radius === 0) {
                radius = 0.75;
            }
            circle.setAttribute("r", radius);
            if (pointerStatus.codeNo < 0) {
                circle.setAttribute("fill", "brack");
            } else {
                circle.classList.add(`code${pointerStatus.codeNo}`);
            }
            svgElm.appendChild(circle);

            // 3秒後にcircleを削除
            setTimeout(() => {
                svgElm.removeChild(circle);
            }, 3000);
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
