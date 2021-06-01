(function () {
    function showSize3(rect) {
        document.getElementById("box1Width3").textContent = rect.width;
        document.getElementById("box1Height3").textContent = rect.height;
    }
    function showSize2() {
        var box1Elm = document.getElementById("box1");
        var box1ElmStyle = window.getComputedStyle(box1Elm);
        document.getElementById("box1Width2").textContent = box1ElmStyle.width;
        document.getElementById("box1Height2").textContent = box1ElmStyle.height;
    }
    function showSize() {
        var box1Elm = document.getElementById("box1");
        var box1ElmStyle = window.getComputedStyle(box1Elm);
        document.getElementById("box1Width").textContent = box1ElmStyle.width;
        document.getElementById("box1Height").textContent = box1ElmStyle.height;
    }
    function init() {
        var box1Elm = document.getElementById("box1");
        var mo = new MutationObserver(function (mutations) {
            for (var i = 0, iEnd = mutations.length; i < iEnd; i++) {
                showSize2();
            };
        });
        mo.observe(box1Elm, {
            attributes: true/* ,
            attributeFilter: [ "style" ] */
        });
        if (window.ResizeObserver) {
            var ro = new ResizeObserver(function (entries) {
                for (var i = 0, iEnd = entries.length; i < iEnd; i++) {
                    showSize3(entries[i].contentRect);
                };
            });
            ro.observe(box1Elm);
        }
        setInterval(showSize, 500)
    }

    window.addEventListener("DOMContentLoaded", init);
})();
