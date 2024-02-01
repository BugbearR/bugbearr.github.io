(function() {
    let videoElement;
    let videoSelect;
    let canvasElement;
    let canvasContext;

    function handleError(error) {
        console.log('Error: ', error);
    }

    function captureImage() {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    }

    function doOnFrame() {
        captureImage();
        requestAnimationFrame(doOnFrame);
    }

    function gotStream(stream) {
        window.stream = stream; // make stream available to console
        videoElement.srcObject = stream;
        requestAnimationFrame(doOnFrame);
    }

    function getStream() {
        navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: {exact: videoSelect.value}
            }
        })
        .then(gotStream)
        .catch(handleError);
    }

    function gotDevices(deviceInfos) {
        for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'videoinput') {
                option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
                videoSelect.appendChild(option);
            }
        }
    }

    function init() {
        // check if the browser supports mediaDevices
        if (! ( 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices )) {
            alert("Sorry, camera not available.");
            return;
        }

        videoElement = document.querySelector('video');
        videoSelect = document.querySelector('select#videoSource');
        canvasElement = document.querySelector('canvas');
        canvasContext = canvasElement.getContext('2d');

        // request permission to use the webcam
        navigator.mediaDevices.getUserMedia({video: true}).then(() => {
            navigator.mediaDevices.enumerateDevices()
            .then(gotDevices)
            .then(getStream)
            .catch(handleError);
        });

        videoSelect.onchange = getStream;
    }

    init();
})();
