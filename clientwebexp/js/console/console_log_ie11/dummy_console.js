// Dummy Console API
// CC0-1.0

(function() {
    if (typeof window.console === "undefined") {
        window.console = {
            assert: function (condition, data) {},
            clear: function () {},
            debug: function (data) {},
            error: function (data) {},
            info: function (data) {},
            log: function (data) {},
            table: function (tabularData, properties) {},
            trace: function (data) {},
            dir: function(item, options) {},
            dirxml: function (data) {},
            count: function (label) {},
            countReset: function (label) {},
            group: function (data) {},
            groupCollapsed: function (data) {},
            groupEnd: function () {},
            time: function (label) {},
            timeLog: function (label, data) {},
            timeEnd: function (label) {},
        };
    }
})();
