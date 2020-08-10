(function () {
    function init() {
        document.title = "Hello, world!";
        var root = document.getElementById("root");
        root.insertAdjacentHTML("afterbegin", "<h1>Hello, world!</h1>");
    }

    window.addEventListener("DOMContentLoaded", init);
})();
