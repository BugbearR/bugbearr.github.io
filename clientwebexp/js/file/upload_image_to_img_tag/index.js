(function () {
    function init() {
        document.getElementById('input-image').addEventListener('change', function(e) {
            var file = e.target.files[0];
            var url = URL.createObjectURL(file);

            document.getElementById('img1').src = url;
        });
    }

    init();
})();
