(function () {
    function onLoadFile() {
        var textarea1 = document.getElementById("textarea1");
        textarea1.value = textarea1.value + "\n" + this.result;
    }

    function onChangeFile1(evt) {
        var textarea1 = document.getElementById("textarea1");
        var preview = document.getElementById("preview1");
        preview.innerHTML = "";
        textarea1.value = "";
        var files = evt.target.files;
        for (i = 0, iEnd = files.length; i < iEnd; i++) {
            var file = files[i];
            if (file.type.startsWith('image/')) {
                var img = document.createElement("img");
                img.addEventListener("load", function() {
                    var ratio = img.width / 300;
                    img.height = img.height / ratio;
                    img.width = 300;
                } );
                var objUrl = URL.createObjectURL(file);
                console.log(objUrl);
                img.src = objUrl;
                preview.appendChild(img);
            }
            var fr = new FileReader();
            fr.addEventListener("load", onLoadFile.bind(fr));
            fr.readAsDataURL(file);
        }
    }

    function init() {
        var file1 = document.forms[0].file1;
        file1.addEventListener("change", onChangeFile1);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
