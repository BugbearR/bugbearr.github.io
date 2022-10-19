(function () {
    function putOrientation() {
        document.getElementById("orientation").value = screen.orientation.type;
        document.getElementById("angle").value = screen.orientation.angle;
    }

    function onOrientationChanged(evt) {
        putOrientation();
    }

    function onLockClicked() {
        screen.orientation.lock();
    }

    function onUnlockClicked() {
        screen.orientation.unlock();
    }

    function init() {
        if ( ! screen.orientation ) {
            alert("No screen.orientation");
            return;
        }

        putOrientation();

        screen.orientation.addEventListener("change", onOrientationChanged);
        document.getElementById("lock").addEventListener("click", onLockClicked);
        document.getElementById("unlock").addEventListener("click", onUnlockClicked);
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
