(function () {
    function init() {
        document.getElementById("ua").appendChild(document.createTextNode(navigator.userAgent));

        const style = window.getComputedStyle(document.body);
        const props = [
            "margin-top", "margin-left", "margin-bottom", "margin-right",
            "padding-top", "padding-left", "padding-bottom", "padding-right",
        ];
        for (const prop of props) {
            console.log(`${prop}: ${style.getPropertyValue(prop)}`);
        }
    }

    init();
})();
