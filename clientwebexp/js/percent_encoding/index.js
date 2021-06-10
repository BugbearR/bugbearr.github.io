(function () {
    function onEncode() {
        document.getElementById("encoded").value = encodeURIComponent(document.getElementById("decoded").value);
    }

    function onDecode() {
        document.getElementById("decoded").value = decodeURIComponent(document.getElementById("encoded").value);
    }

    function init() {
        document.getElementById("encode").addEventListener("click", onEncode);
        document.getElementById("decode").addEventListener("click", onDecode);
    }

    window.addEventListener("DOMContentLoaded", init);
})();
