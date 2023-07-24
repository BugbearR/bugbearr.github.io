(function () {
    function init() {
        document.getElementById('input-video').addEventListener('change', function(e) {
            var file = e.target.files[0];
            var url = URL.createObjectURL(file);

            document.getElementById('video-player').src = url;
        });
    }

    init();
})();
