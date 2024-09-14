(function () {
    class FullscreenBox {
        constructor(elm) {
            this.elm = elm;
            this.isFullscreen = false;
            this.elm.addEventListener("click", this.toggleFullscreen.bind(this));
            this.elm.addEventListener("fullscreenchange", () => {
                this.isFullscreen = document.fullscreenElement === this.elm;
            });
        }

        toggleFullscreen() {
            if (this.isFullscreen) {
                this.exitFullscreen();
            } else {
                this.requestFullscreen();
            }
        }

        requestFullscreen() {
            this.elm.requestFullscreen();
        }

        exitFullscreen() {
            document.exitFullscreen();
        }
    }

    let fullscreenBox1;
    let fullscreenBox2;

    function init() {
        if (!document.fullscreenEnabled) {
            alert("Fullscreen is not supported.");
            return;
        }

        fullscreenBox1 = new FullscreenBox(document.getElementById("box1"));
        fullscreenBox2 = new FullscreenBox(document.getElementById("box2"));
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                fullscreenBox1.exitFullscreen();
                fullscreenBox2.exitFullscreen();
            }
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
