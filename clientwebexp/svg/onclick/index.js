(function () {
    function init() {
        document.getElementById("circle2").addEventListener("click", function() {
            alert("hello2");
        });

        // IE11
        var circle2Elm = document.getElementById("circle2");
        if ( circle2Elm.classList ) {
            circle2Elm.classList.add("clickable");
        } else {
            var attr = circle2Elm.getAttribute("class");
            var attrs;
            if ( typeof attr == "string" ) {
                attrs = attr.split(" ");
            } else {
                attrs = [];
            }
            attrs.push("clickable");
            circle2Elm.setAttribute("class", attrs.join(" "));
        }

    }

    window.addEventListener("DOMContentLoaded", init);
})();
