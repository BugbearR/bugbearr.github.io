(function () {
    function keyEventToStr(e) {
        return e.type
            + ' key=' + e.key
            + ' code=' + e.code
            + (e.shiftKey ? ' Shift' : '')
            + (e.ctrlKey ? ' Ctrl' : '')
            + (e.altKey ? ' Alt' : '')
            + (e.metaKey ? ' Meta' : '')
            + (e.repeat ? ' (repeat)' : '')
            + ' location=' + e.location
            + ' keyCode=' + e.keyCode;
    }
    function init() {
        window.addEventListener("keydown", function(e) {
            console.log("window " + keyEventToStr(e));
        });
        document.addEventListener("keydown", function(e) {
            console.log("document " + keyEventToStr(e));
        });
        var rootElm = document.getElementById("root");
        rootElm.addEventListener("keydown", function(e) {
            console.log("root " + keyEventToStr(e));
        });
        var box1Elm = document.getElementById("box1");
        box1Elm.addEventListener("keydown", function(e) {
            console.log("box1 " + keyEventToStr(e));
        });
        var box1Elm = document.getElementById("box1");
        box1Elm.addEventListener("keydown", function(e) {
            console.log("box2 " + keyEventToStr(e));
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
