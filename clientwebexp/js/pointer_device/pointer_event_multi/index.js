(function () {
    var pointerIdMap = new Map();
    function resizeSvg() {
        var svgElm = document.getElementById("svg1");
        var rootElm = document.getElementById("root");
        var rootRect = rootElm.getBoundingClientRect();
        svgElm.setAttribute("viewBox", `${rootRect.x} ${rootRect.y} ${rootRect.width} ${rootRect.height}`);
        svgElm.setAttribute("width", `${rootRect.width}px`);
        svgElm.setAttribute("height", `${rootRect.height}px`);
    }

    function init() {
        var rootElm = document.getElementById("root");
        resizeSvg();
        new ResizeObserver(() => {
            resizeSvg();
        }).observe(rootElm);

        var codeQue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        var svgElm = document.getElementById("svg1");
        svgElm.addEventListener("pointerup", (evt) => {
            let pointerNo = pointerIdMap.get(evt.pointerId);
            if (pointerNo !== undefined) {
                if (pointerNo >= 0) {
                    codeQue.push(pointerNo);
                }
                pointerIdMap.delete(evt.pointerId);
            }
        })

        svgElm.addEventListener("pointermove", (evt) => {
            let pointerNo = pointerIdMap.get(evt.pointerId);
            if (pointerNo === undefined) {
                if (codeQue.length > 0) {
                    pointerNo = codeQue.shift();
                } else {
                    pointerNo = -1;
                }
                pointerIdMap.set(evt.pointerId, pointerNo);
            }

            // pressureに基づいてcircleの半径を計算
            let radius = evt.pressure * 5;

            // circle要素を作成
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", evt.clientX);
            circle.setAttribute("cy", evt.clientY);
            if (radius === 0) {
                radius = 0.75;
            }
            circle.setAttribute("r", radius);
            if (pointerNo < 0) {
                circle.setAttribute("fill", "brack");
            } else {
                circle.classList.add(`code${pointerNo}`);
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
