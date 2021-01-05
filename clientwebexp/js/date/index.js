(function () {
    function updateNowElm(now, name) {
        var r = (typeof now[name] === "function") ? now[name].apply(now) : "undefined";
        document.getElementById("now_" + name).textContent = r;
    }
    function updateNow() {
        var now = new Date();
        updateNowElm(now, "getDate");
        updateNowElm(now, "getDate");
        updateNowElm(now, "getDay");
        updateNowElm(now, "getFullYear");
        updateNowElm(now, "getHours");
        updateNowElm(now, "getMilliseconds");
        updateNowElm(now, "getMinutes");
        updateNowElm(now, "getMonth");
        updateNowElm(now, "getSeconds");
        updateNowElm(now, "getTime");
        updateNowElm(now, "getTimezoneOffset");
        updateNowElm(now, "getUTCDate");
        updateNowElm(now, "getUTCDay");
        updateNowElm(now, "getUTCFullYear");
        updateNowElm(now, "getUTCHours");
        updateNowElm(now, "getUTCMilliseconds");
        updateNowElm(now, "getUTCMinutes");
        updateNowElm(now, "getUTCMonth");
        updateNowElm(now, "getUTCSeconds");
        updateNowElm(now, "getYear");
        updateNowElm(now, "toDateString");
        updateNowElm(now, "toGMTString");
        updateNowElm(now, "toISOString");
        updateNowElm(now, "toJSON");
        updateNowElm(now, "toLocaleDateString");
        updateNowElm(now, "toLocaleString");
        updateNowElm(now, "toLocaleTimeString");
        updateNowElm(now, "toString");
        updateNowElm(now, "toTimeString");
        updateNowElm(now, "toUTCString");
    }

    function init() {
        setInterval(updateNow, 100);
    }

    init();
})();
