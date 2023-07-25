(function () {
    function init() {
        const videoElm = document.getElementById("video-player");
        const inputVideoElm = document.getElementById("input-video");
        const canvasElm = document.getElementById("canvas1");
        const context = canvasElm.getContext('2d');

        inputVideoElm.addEventListener("change", function(e) {
            var file = e.target.files[0];
            var url = URL.createObjectURL(file);

            document.getElementById("video-player").src = url;
        });

        videoElm.addEventListener("play", function(e) {
            canvasElm.width = videoElm.videoWidth;
            canvasElm.height = videoElm.videoHeight;

            setInterval(function() {
                context.drawImage(videoElm, 0, 0, canvasElm.width, canvasElm.height);
                let imageData = context.getImageData(0, 0, canvasElm.width, canvasElm.height);
                // manipulate image to gley scale.
                let data = imageData.data;
                for(var i = 0; i < data.length; i += 4) {
                  let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                  data[i]     = avg; // red
                  data[i + 1] = avg; // green
                  data[i + 2] = avg; // blue
                }
                context.putImageData(imageData, 0, 0);
             } , 33); // 30.3fps
        });

        // document.getElementById("captureButton").addEventListener("click", function(e) {

        // });
    }

    init();
})();
