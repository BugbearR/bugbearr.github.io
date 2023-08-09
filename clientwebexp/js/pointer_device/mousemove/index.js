(function () {
    var lastEventMsgs = [];

    // function toStringEvent(event) {
    //     var sw = new StringWriter();
    //     dumpObject(event, sw);
    //     return sw.toString();
    // }

    // function addEvent(event) {
    //     var s = toStringEvent(event);
    //     lastEventMsgs.push(s);
    //     while (lastEventMsgs.length > 10) {
    //         lastEventMsgs.shift();
    //     }
    //     var txt = lastEventMsgs.join("\n");
    //     document.forms[0].eventArea.value = txt;
    // }

    function onMouseMove(event) {
        // var event = event || window.event;
        document.forms[0].clientX.value = event.clientX;
        document.forms[0].clientY.value = event.clientY;
        document.forms[0].layerX.value = event.layerX;
        document.forms[0].layerY.value = event.layerY;
        document.forms[0].offsetX.value = event.offsetX;
        document.forms[0].offsetY.value = event.offsetY;
        document.forms[0].pageX.value = event.pageX;
        document.forms[0].pageY.value = event.pageY;
        document.forms[0].screenX.value = event.screenX;
        document.forms[0].screenY.value = event.screenY;
        document.forms[0].x.value = event.x;
        document.forms[0].y.value = event.y;
    }

    function onMouseMoveRect1(event) {
        document.forms[0].rect1_clientX.value = event.clientX;
        document.forms[0].rect1_clientY.value = event.clientY;
        document.forms[0].rect1_layerX.value = event.layerX;
        document.forms[0].rect1_layerY.value = event.layerY;
        document.forms[0].rect1_offsetX.value = event.offsetX;
        document.forms[0].rect1_offsetY.value = event.offsetY;
        document.forms[0].rect1_pageX.value = event.pageX;
        document.forms[0].rect1_pageY.value = event.pageY;
        document.forms[0].rect1_screenX.value = event.screenX;
        document.forms[0].rect1_screenY.value = event.screenY;
        document.forms[0].rect1_x.value = event.x;
        document.forms[0].rect1_y.value = event.y;
    }

    function onMouseDownRect1(event) {
        document.getElementById("rect1").classList.add("press");
    }

    function onMouseUpRect1(event) {
        document.getElementById("rect1").classList.remove("press");
    }

    function init() {
        window.addEventListener("mousemove", onMouseMove);
        document.getElementById("rect1").addEventListener("mousemove", onMouseMoveRect1);
        document.getElementById("rect1").addEventListener("mousedown", onMouseDownRect1);
        document.getElementById("rect1").addEventListener("mouseup", onMouseUpRect1);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
