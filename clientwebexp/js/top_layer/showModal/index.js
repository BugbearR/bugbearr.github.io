(function () {
    function init() {
        document.getElementById("showMyDialogButton").addEventListener("click", () => {
            document.getElementById("myDialog").showModal();
        });
        document.getElementById("closeMyDialogButton").addEventListener("click", () => {
            document.getElementById("myDialog").close();
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
