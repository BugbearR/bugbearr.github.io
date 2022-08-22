(function () {
    function doCopy(evt) {
        // alert("copy " + JSON.stringify(evt));
        evt.preventDefault();
        var cd = evt.clipboardData || window.clipboardData;
        cd.setData("text/plain", "Hello, world!");
    }

    function doCut(evt) {
        evt.preventDefault();
        // alert("cut " + JSON.stringify(evt));
        var cd = evt.clipboardData || window.clipboardData;
        cd.setData("text/plain", "Hello, world!");
    }

    function doPaste(evt) {
        evt.preventDefault();
        var cd = evt.clipboardData || window.clipboardData;
        var data = cd.getData("text/plain");
        console.log(data);
    }

    function init() {
        window.addEventListener("copy", doCopy);
        window.addEventListener("cut", doCut);
        window.addEventListener("paste", doPaste);
    }

    init();
})();
