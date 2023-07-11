(function() {
    let videoElement;
    let videoSelect;

    function handleError(error) {
        console.log('Error: ', error);
    }

    function gotStream(stream) {
        window.stream = stream; // make stream available to console
        videoElement.srcObject = stream;
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
