(function () {
    var initCalled = false;

    function updateButton1() {
        var button = document.getElementById("toggleButton1");
        button.textContent = button.classList.contains("on") ? "ON" : "OFF";

    }

    function toggleButton1() {
        var button = document.getElementById("toggleButton1");
        button.classList.toggle("on");
        updateButton1();
    }

    function init() {
        if (initCalled) return;
        initCalled = true;

        // button.classList.add("on");
        updateButton1();
        document.getElementById("toggleButton1").addEventListener("click", toggleButton1);
    }

    window.addEventListener("DOMContentLoaded", init);

    init();
})();
