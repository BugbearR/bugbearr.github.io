(function () {
    function updatePreserveAspectRatio(radio1Value, radio2Value) {
        var i;
        var s1 = (radio1Value === "default") ? "" : radio1Value;
        var s2 = (radio2Value === "default") ? "" : radio2Value;


        var s = (s1 + " " + s2).trim();
        var svgElms = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", "svg");
        if (s === "") {
            for (i = 0; i < svgElms.length; i++) {
                svgElms[i].removeAttribute("preserveAspectRatio");
            }
        }
        else {
            for (i = 0; i < svgElms.length; i++) {
                svgElms[i].setAttribute("preserveAspectRatio", s);
            }
        }
    }

    function init() {
        var radio1Value = "default";
        var radio2Value = "default";

        document.getElementsByName("radio1").forEach(
            function (elm) {
                elm.addEventListener("change",
                    function (evt) {
                        radio1Value = evt.target.value;
                        updatePreserveAspectRatio(radio1Value, radio2Value);
                    }
                );
            }
        );

        document.getElementsByName("radio2").forEach(
            function (elm) {
                elm.addEventListener("change",
                    function (evt) {
                        radio2Value = evt.target.value;
                        updatePreserveAspectRatio(radio1Value, radio2Value);
                    }
                );
            }
        );
    }

    init();
})();
