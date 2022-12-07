
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
        "sw.js"
    ).then((registration) => {
        console.log("sw.js registered.", registration);
    }).catch((err) => {
        console.error(`sw.js failed to register.: ${err}`);
    });
}
else {
    console.log("serviceWorker is not available");
}
