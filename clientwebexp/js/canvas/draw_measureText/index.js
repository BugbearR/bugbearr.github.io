(function () {
    function getActualDirection(ctx) {
        const currentDirection = ctx.direction;

        if (currentDirection !== 'inherit') {
          return currentDirection;
        }

        return window.getComputedStyle(ctx.canvas.parentElement).direction;
    }

    function draw() {
        var canvas = document.getElementById("canvas1");

        var ctx = canvas.getContext("2d");
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const textAlign = document.getElementById("textAlign").value;
        const textBaseline = document.getElementById("textBaseline").value;
        const direction = document.getElementById("direction").value;
        const fontFamily = document.getElementById("fontFamily").value;
        let baseX = 0;
        let baseY = 0;
        let leftDir = 1;
        let rightDir = 1;
        let widthDir = 1;

        switch (textAlign) {
        case "start":
            baseX = canvas.width / 2;
            break;
        case "end":
            baseX = canvas.width / 2;
            widthDir = -1;
            break;
        case "left":
            baseX = 30;
            break;
        case "right":
            baseX = canvas.width - 30;
            widthDir = -1;
            break;
        case "center":
            baseX = canvas.width / 2;
            widthDir = 0.5;
            break;
        default:
            baseX = canvas.width / 2;
            break;
        }

        switch (textBaseline) {
        case "top":
            baseY = 30;
            break;
        case "hanging":
            baseY = 30;
            break;
        case "middle":
            baseY = canvas.height / 2;
            break;
        case "alphabetic":
            baseY = canvas.height / 2;
            break;
        case "ideographic":
            baseY = canvas.height / 2;
            break;
        case "bottom":
            baseY = canvas.height - 30;
            break;
        default:
            baseY = canvas.height / 2;
            break;
        }

        ctx.font = `128px '${fontFamily}'`;
        testChar = document.getElementById("inputText").value;

        ctx.textAlign = document.getElementById("textAlign").value;
        ctx.textBaseline = document.getElementById("textBaseline").value;
        ctx.direction = document.getElementById("direction").value;
        if (getActualDirection(ctx) == "rtl") {
            if (textAlign == "start" || textAlign == "end") {
                widthDir *= -1;
            }
        }

        const measureInfo = ctx.measureText(testChar);
        console.log(measureInfo);

        ctx.fillStyle = "black";
        ctx.fillText(testChar, baseX, baseY);

        ctx.font = "16px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(canvas.width, baseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(baseX, 0);
        ctx.lineTo(baseX, canvas.height);
        ctx.stroke();

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, baseY - measureInfo.actualBoundingBoxAscent);
        ctx.lineTo(canvas.width, baseY - measureInfo.actualBoundingBoxAscent);
        ctx.stroke();
        ctx.textBaseline = "top";
        ctx.fillText("actualBoundingBoxAscent", 0, baseY - measureInfo.actualBoundingBoxAscent);

        ctx.beginPath();
        ctx.moveTo(0, baseY + measureInfo.actualBoundingBoxDescent);
        ctx.lineTo(canvas.width, baseY + measureInfo.actualBoundingBoxDescent);
        ctx.stroke();
        ctx.textBaseline = "bottom";
        ctx.fillText("actualBoundingBoxDescent", 0, baseY + measureInfo.actualBoundingBoxDescent);

        ctx.beginPath();
        ctx.moveTo(baseX + measureInfo.actualBoundingBoxRight * rightDir, 0);
        ctx.lineTo(baseX + measureInfo.actualBoundingBoxRight * rightDir, canvas.height);
        ctx.stroke();
        ctx.save();
        ctx.translate(baseX + measureInfo.actualBoundingBoxRight * rightDir, 0);
        ctx.rotate(Math.PI / 2);
        ctx.textBaseline = "top";
        ctx.fillText("actualBoundingBoxRight", 0, 0);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(baseX - measureInfo.actualBoundingBoxLeft * leftDir, 0);
        ctx.lineTo(baseX - measureInfo.actualBoundingBoxLeft * leftDir, canvas.height);
        ctx.stroke();
        ctx.save();
        ctx.translate(baseX - measureInfo.actualBoundingBoxLeft * leftDir, 0);
        ctx.rotate(Math.PI / 2);
        ctx.textBaseline = "bottom";
        ctx.fillText("actualBoundingBoxLeft", 0, 0);
        ctx.restore();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(baseX + measureInfo.width * widthDir, 0);
        ctx.lineTo(baseX + measureInfo.width * widthDir, canvas.height);
        ctx.stroke();
        ctx.save();
        ctx.translate(baseX + measureInfo.width * widthDir, 0);
        ctx.rotate(Math.PI / 2);
        ctx.textBaseline = "bottom";
        ctx.fillText("width", 0, 0);
        ctx.restore();

        ctx.strokeStyle = "purple";
        ctx.beginPath();
        ctx.moveTo(0, baseY - measureInfo.fontBoundingBoxAscent);
        ctx.lineTo(canvas.width, baseY - measureInfo.fontBoundingBoxAscent);
        ctx.stroke();
        ctx.textBaseline = "bottom";
        ctx.fillText("fontBoundingBoxAscent", 0, baseY - measureInfo.fontBoundingBoxAscent);

        ctx.beginPath();
        ctx.moveTo(0, baseY + measureInfo.fontBoundingBoxDescent);
        ctx.lineTo(canvas.width, baseY + measureInfo.fontBoundingBoxDescent);
        ctx.stroke();
        ctx.textBaseline = "top";
        ctx.fillText("fontBoundingBoxDescent", 0, baseY + measureInfo.fontBoundingBoxDescent);
    }

    function init() {
        document.getElementById("fontFamily").value = "sans-serif";
        document.getElementById("inputText").value = "A";
        document.getElementById("inputText").addEventListener("input", draw);
        document.getElementById("drawButton").addEventListener("click", draw);
        draw();
    }

    window.addEventListener("DOMContentLoaded", init);
    // init();
})();
