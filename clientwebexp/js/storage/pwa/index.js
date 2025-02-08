(function () {
    function displayStorageInfo() {
        navigator.storage.persisted().then((persistent) => {
            document.getElementById("persisted_status").value = persistent ? "granted." : "denied.";
        });
        navigator.storage.estimate().then((estimate) => {
            document.getElementById("estimate").value = JSON.stringify(estimate);
        });
    }

    function requestPersist() {
        navigator.storage.persist().then(granted => {
            document.getElementById("persist_status").value = granted ? "granted." : "denied.";
            displayStorageInfo();
        });
    }

    function init() {
        if (!navigator.storage || !navigator.storage.persist) {
            document.getElementById("persist_status").value = "not supported.";
            return;
        }

        const requestPersistButton = document.getElementById("request_persist");
        requestPersistButton.addEventListener("click", requestPersist);
        displayStorageInfo();
    }

    function init() {
        if (!navigator.serviceWorker) {
            alert("Service Worker is not supported.");
            return;
        }

        if (!navigator.storage || !navigator.storage.persist) {
            document.getElementById("persist_status").value = "not supported.";
            return;
        }

        const requestPersistButton = document.getElementById("request_persist");
        requestPersistButton.addEventListener("click", requestPersist);
        displayStorageInfo();
    }

    window.addEventListener("DOMContentLoaded", init);
})();
