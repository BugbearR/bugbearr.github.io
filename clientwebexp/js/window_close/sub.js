(function () {
    function onClickSimpleCloseButton() {
        window.close();
    }

    function onClickSelfCloseButton() {
        window.open("", "_self").close();
    }

    function onClickBlankSelfCloseButton() {
        window.open("about:blank", "_self").close();
    }

    function init() {
        var simpleCloseButton = document.getElementById("simpleCloseButton");
        simpleCloseButton.addEventListener("click", onClickSimpleCloseButton);
        var selfCloseButton = document.getElementById("selfCloseButton");
        selfCloseButton.addEventListener("click", onClickSelfCloseButton);
        var blankSelfCloseButton = document.getElementById("blankSelfCloseButton");
        blankSelfCloseButton.addEventListener("click", onClickBlankSelfCloseButton);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
