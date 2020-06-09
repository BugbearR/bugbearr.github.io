(function () {
    function init() {
        document.title = "Hello, world!";
        var root = document.getElementById("root");
        root.insertAdjacentHTML("afterbegin", "<h1>Hello, world!</h1>");
    }

    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", init);
    }
    else if (document.readyState === "interactive"
        || document.readyState === "complete") {
        init();
    }
    else {
        console.log("unknown document.readyState:" + document.readyState);
    }
})();

