(function () {
    function isValidIpv6Address(address) {
        // if ((/^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:){6}(:[0-9a-fA-F]{1,4}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:){5}((:[0-9a-fA-F]{1,4}){1,2}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:){4}((:[0-9a-fA-F]{1,4}){1,3}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:){3}((:[0-9a-fA-F]{1,4}){1,4}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:){2}((:[0-9a-fA-F]{1,4}){1,5}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6}|:)$/).test(address)) {
        //     return true;
        // }
        // if ((/^(:(:[0-9a-fA-F]{1,4}){1,7}$/).test(address)) {
        //     return true;
        // }
        // if ((/^::$/).test(address)) {
        //     return true;
        // }
        return (/^((([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){6}(:[0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){5}((:[0-9a-fA-F]{1,4}){1,2}|:))|(([0-9a-fA-F]{1,4}:){4}((:[0-9a-fA-F]{1,4}){1,3}|:))|(([0-9a-fA-F]{1,4}:){3}((:[0-9a-fA-F]{1,4}){1,4}|:))|(([0-9a-fA-F]{1,4}:){2}((:[0-9a-fA-F]{1,4}){1,5}|:))|(([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6}|:))|(:(:[0-9a-fA-F]{1,4}){1,7})|::)$/).test(address);
    }

    function init() {
        document.getElementById("validateButton").addEventListener("click", function() {
            var address = document.getElementById("address").value;
            document.getElementById("result").textContent = isValidIpv6Address(address).toString();
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
