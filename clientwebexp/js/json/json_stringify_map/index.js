(function () {
    window.onerror = function(message, source, lineno, colno, error) {
        alert('Error. ' + JSON.stringify({
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            error: error
        }));
    };

    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()),
            };
        }
        else if (value instanceof Set) {
            return {
                dataType: 'Set',
                value: Array.from(value.entries()),
            };
        }
        else {
            return value;
        }
    }

    function jsonStringifyMapExp() {
        // var text1Elm = document.forms[0].text1;
        var obj = {
            "k1": "v1",
            "mymap": new Map([["k1", "v1"], ["k2", "v2"]]),
            "myset": new Set(["k1", "k2"])
        };
        var s = JSON.stringify(obj, replacer);
        console.log(s);
        alert(s);
    }

    function init() {
        var callJsonStringifyMapExpElm = document.getElementById("callJsonStringifyMapExp");
        callJsonStringifyMapExpElm.addEventListener("click", jsonStringifyMapExp);
    }

    init();
})();
