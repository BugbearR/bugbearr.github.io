(function () {
    function init() {
        document.title = "Hello, world!";
        var root = document.getElementById("root");
        root.insertAdjacentHTML("afterbegin", "<h1>Hello, world!</h1>");
    }

    switch (document.readyState)
    {
    case "loading":
        window.addEventListener("DOMContentLoaded", init);
        break;

    case "interactive":
    case "complete":
        init();
        break;
    default:
        console.log("unknown document.readyState:" + document.readyState);
        init(); // mayby, ok.
    }
})();
