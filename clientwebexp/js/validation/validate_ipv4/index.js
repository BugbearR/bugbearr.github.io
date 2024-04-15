(function () {
    function isValidIpv4Address(address) {
        return ( /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/ ).test(address);
    }

    function init() {
        document.getElementById("validateButton").addEventListener("click", function() {
            var address = document.getElementById("address").value;
            document.getElementById("result").textContent = isValidIpv4Address(address).toString();
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
