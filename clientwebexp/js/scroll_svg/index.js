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
            this.viewX0 = 0;
            this.viewY0 = 0;
            this.scale = 1.0;
            this.gridPitch = 50;
            this.gridColor = "black";
            this.gridWidth = 1;
            this.prevPointerX = 0;
            this.prevPointerY = 0;
            this.prevPointerTimeStamp = 0;
            this.vx = 0.1;
            this.vy = 0.1;
            this.decayStartTime = 0;

            baseElm.addEventListener("pointerdown", (evt) => {
                this.onPointerDown(evt);
            });

            baseElm.addEventListener("pointermove", (evt) => {
                this.onPointerMove(evt);
            });

            baseElm.addEventListener("pointerup", (evt) => {
                this.onPointerUp(evt);
            });
        }

        reset() {
            this.viewX = 0;
            this.viewY = 0;
            this.scale = 1.0;
            this.gridPitch = 50;
            this.gridColor = "black";
            this.gridWidth = 1;
            this.decayStartTime = 0;
        }

        renderGrid(svgElm) {
            let xStart = this.viewX;
            let yStart = this.viewY;
            let yEnd = this.viewY + this.height;
            let xEnd = this.viewX + this.width;

            let xGridStart = xStart - (xStart % this.gridPitch);
            let yGridStart = yStart - (yStart % this.gridPitch);
            for (let x = xGridStart; x < xEnd; x += this.gridPitch) {
                svgElm.insertAdjacentHTML("beforeend", `<line class="grid-x" x1="${x}" y1="${yStart}" x2="${x}" y2="${yEnd}" stroke="${this.gridColor}" stroke-width="${this.gridWidth}"/>`);
            }
            for (let y = yGridStart; y < yEnd; y += this.gridPitch) {
                svgElm.insertAdjacentHTML("beforeend", `<line class="grid-y" x1="${xStart}" y1="${y}" x2="${xEnd}" y2="${y}" stroke="${this.gridColor}" stroke-width="${this.gridWidth}"/>`);
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

            svgElm.insertAdjacentHTML("beforeend", '<circle cx="0" cy="0" r="50" stroke="red" fill="none"/>');

            this.renderGrid(svgElm);
            this.baseElm.replaceChildren(svgElm);
        }

        onPointerDown(evt) {
            if (evt.isPrimary) {
                this.isPointerDown = true;
                this.prevPointerX = evt.clientX;
                this.prevPointerY = evt.clientY;
            }
        }

        onPointerUp(evt) {
            if (evt.isPrimary) {
                this.isPointerDown = false;
                // let dx = evt.clientX - this.prevPointerX;
                // let dy = evt.clientY - this.prevPointerY;

                // const dt = evt.timeStamp - evt.prevTimeStamp;
                // if (dt > 0) {
                //     this.vx = dx / dt;
                //     this.vy = dy / dt;
                // }

                // this.prevPointerX = evt.clientX;
                // this.prevPointerY = evt.clientY;
                // this.prevPointerTimeStamp = evt.timeStamp;
            }
        }

        onPointerMove(evt) {
            if (evt.isPrimary && this.isPointerDown) {
                let dx = evt.clientX - this.prevPointerX;
                let dy = evt.clientY - this.prevPointerY;

                this.viewX -= dx;
                this.viewY -= dy;

                // save velocity
                const dt = (evt.timeStamp - this.prevTimeStamp) / 1000;
                if (dt > 0) {
                    this.decayStartTime = Date.now();
                    this.viewX0 = this.viewX;
                    this.viewY0 = this.viewY;
                    this.vx = dx / dt;
                    this.vy = dy / dt;
                    document.getElementById("dt").value = dt;
                    document.getElementById("vx").value = this.vx;
                    document.getElementById("vy").value = this.vy;
                }

                this.prevPointerX = evt.clientX;
                this.prevPointerY = evt.clientY;
                this.prevTimeStamp = evt.timeStamp;
            }
        }

        updateState(nowTime) {
            if (this.prevRenderTime === undefined) {
                this.prevRenderTime = nowTime;
            }

            if (!this.isPointerDown) {
                const dt = (nowTime - this.decayStartTime) / 1000;
                if (dt <= 1) {
                    // why 0.25f, not 0.5f?
                    // acceleration = -0.5 * velocity (average velocity during dt)
                    // velocity = velocity0 - 0.5 * acceleration * dt
                    this.viewX = this.viewX0 - ((this.vx - 0.25 * this.vx * dt) * dt);
                    this.viewY = this.viewY0 - ((this.vy - 0.25 * this.vy * dt) * dt);
                }
            }

            document.getElementById("viewX").value = this.viewX;
            document.getElementById("viewY").value = this.viewY;

            this.vx = this.vx * 0.99;
            this.vy = this.vy * 0.99;
            this.render();

            this.prevRenderTime = nowTime;
        }
    }

    function updateState() {
        const nowTime = Date.now();
        if (this.prevRenderTime === undefined) {
            this.prevRenderTime = nowTime;
        }

        svgView.updateState(nowTime);

        this.prevRenderTime = nowTime;
        requestAnimationFrame(updateState);
    }

    function init() {
        document.getElementById("resetButton").addEventListener("click", () => {
            svgView.viewX = 0;
            svgView.viewY = 0;
            svgView.render();
        });
        var rootElm = document.getElementById("root");
        svgView = new MySvgView(rootElm, "svg1");
        svgView.render();

        requestAnimationFrame(updateState);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
