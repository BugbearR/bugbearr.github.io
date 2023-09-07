(function () {
    let svgView = null;

    let prevX = 0;
    let prevY = 0;

    class MySvgView {
        constructor(baseElm, id) {
            this.baseElm = baseElm;
            this.id = id;
            this.viewX = 0;
            this.viewY = 0;
            this.scale = 1.0;
            this.gridPitch = 50;

            baseElm.addEventListener("pointerdown", () => {
            });
            baseElm.addEventListener("pointermove", onPointerMove);
            baseElm.addEventListener("pointerup", onPointerUp);
        }

        renderGrid(svgElm) {
            let xStart = this.viewX;
            let yStart = this.viewY;
            let yEnd = this.viewY + this.height;
            let xEnd = this.viewX + this.width;

            let xGridStart = xStart - (xStart % this.gridPitch);
            let yGridStart = yStart - (yStart % this.gridPitch);
            for (let x = xGridStart; x < xEnd; x += this.gridPitch) {
                svgElm.insertAdjacentHTML("beforeend", `<line class="grid-x" x1="${x}" y1="${yStart}" x2="${x}" y2="${yEnd}" stroke="black" stroke-width="1"/>`);
            }
            for (let y = yGridStart; y < yEnd; y += this.gridPitch) {
                svgElm.insertAdjacentHTML("beforeend", `<line class="grid-y" x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" stroke="black" stroke-width="1"/>`);
            }
        }

        render() {
            const baseStyle = window.getComputedStyle(this.baseElm);
            this.width = parseInt(baseStyle.width);
            this.height = parseInt(baseStyle.height);

            const svgElm = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElm.setAttribute("width", baseStyle.width);
            svgElm.setAttribute("height", baseStyle.height);
            svgElm.setAttribute("viewBox", `${this.viewX} ${this.viewY} ${this.width} ${this.height}`);

            this.renderGrid(svgElm);
            this.baseElm.replaceChildren(svgElm);
        }

        onPointerDown(evt) {

        }

        onPointerUp(evt) {

        }

        onPointerMove(evt) {
            let dx = evt.clientX - prevX;
            prevX = evt.clientX;
            prevY = evt.clientY;
        }
    }


    function init() {
        var rootElm = document.getElementById("root");
        svgView = new MySvgView(rootElm, "svg1");
        svgView.render();
    }

    window.addEventListener("DOMContentLoaded", init);
})();
