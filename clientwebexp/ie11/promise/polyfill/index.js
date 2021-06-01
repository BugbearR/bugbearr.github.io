(function () {
    function init() {
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("OK");
            }, 1000);
        });
        p.then(function(result) {
            document.getElementById("result").textContent = "OK";
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
