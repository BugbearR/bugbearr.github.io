
(function () {
    function insertSvg() {
        var svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100">'
                + '<circle cx="50" cy="50" r="50"/>'
                + '</svg>';
        document.getElementById("placeholder").insertAdjacentHTML("afterbegin", svg);
    }

    window.addEventListener("DOMContentLoaded", insertSvg);
})();
