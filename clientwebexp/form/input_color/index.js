(function () {
    function init() {
        var color1Elm = document.getElementById("color1");
        color1Elm.addEventListener("change", function (evt) {
            document.getElementById("color1_onchange").value = evt.target.value;
        })
        color1Elm.addEventListener("input", function (evt) {
            document.getElementById("color1_oninput").value = evt.target.value;
        })
    }

    window.addEventListener("DOMContentLoaded", init);
})();
