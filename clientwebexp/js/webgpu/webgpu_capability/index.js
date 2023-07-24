(function () {
    function putLog(msg) {
        var textarea1Elm = document.getElementById("textarea1");
        textarea1Elm.textContent += (new Date()).toISOString() + ":" + msg + "\n";
        console.log(msg);
    }

    addEventListener("error", (event) => {
        putLog(JSON.stringify(event));
    });

    async function init() {
        const textarea1Elm = document.getElementById("textarea1");
        try {
            if (!navigator.gpu) {
                putLog("WebGPU not supported.");
                return;
            }

            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                putLog("Couldn't request WebGPU adapter.");
                return;
            }

            for (const entry of adapter.features.entries()) {
                putLog(JSON.stringify(entry));
            }

            const device = await adapter.requestDevice();
            if (!device) {
                putLog("Couldn't request WebGPU device.");
                return;
            }

        } catch (e) {
            putLog(e.message);
            putLog(e.stack);
        }
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
