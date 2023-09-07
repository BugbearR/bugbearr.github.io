(function () {
    var pointerIdMap = new Map();
    function init() {
        var rootElm = document.getElementById("root");
        new ResizeObserver(() => {
            var svgElm = document.getElementById("svg1");
            var rootRect = rootElm.getBoundingClientRect();
            svgElm.setAttribute("style", "touch-action: none;");
            svgElm.setAttribute("viewBox", `${rootRect.x} ${rootRect.y} ${rootRect.width} ${rootRect.height}`);
            svgElm.setAttribute("width", `${rootRect.width}px`);
            svgElm.setAttribute("height", `${rootRect.height}px`);
        }).observe(rootElm);

        var svgElm = document.getElementById("svg1");
        svgElm.addEventListener("pointermove", (evt) => {
            let pointerNo = pointerIdMap.get(evt.pointerId);
            if (pointerNo === undefined) {
                pointerNo = pointerIdMap.size;
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
            if (pointerNo >= 10) {
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
