(function () {
    var subWindow;

    function onClickSimpleCloseButton() {
        window.close();
    }

    function onClickSelfCloseButton() {
        window.open("", "_self").close();
    }

    function onClickBlankSelfCloseButton() {
        window.open("about:blank", "_self").close();
    }

    function onClickOpenSubSelfButton() {
        window.open("sub.html", "_self");
    }

    function onClickOpenSubButton() {
        subWindow = window.open("sub.html", "sub", "width=800,height=600");
    }

    function onClickCloseSubButton() {
        subWindow.close();
    }

    function init() {
        var simpleCloseButton = document.getElementById("simpleCloseButton");
        simpleCloseButton.addEventListener("click", onClickSimpleCloseButton);
        var selfCloseButton = document.getElementById("selfCloseButton");
        selfCloseButton.addEventListener("click", onClickSelfCloseButton);
        var blankSelfCloseButton = document.getElementById("blankSelfCloseButton");
        blankSelfCloseButton.addEventListener("click", onClickBlankSelfCloseButton);

        var openSubSelfButton = document.getElementById("openSubSelfButton");
        openSubSelfButton.addEventListener("click", onClickOpenSubSelfButton);

        var openSubButton = document.getElementById("openSubButton");
        openSubButton.addEventListener("click", onClickOpenSubButton);
        var closeSubButton = document.getElementById("closeSubButton");
        closeSubButton.addEventListener("click", onClickCloseSubButton);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
