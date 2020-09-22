require.config({
    //set base folder of all dependencies
    // baseUrl : 'js',
    paths : {
        "RadioNodeList_getValue": "https://unpkg.com/@bugbearr/ie11support/umd/RadioNodeList_getValue",
        "RadioNodeList_setValue": "https://unpkg.com/@bugbearr/ie11support/umd/RadioNodeList_setValue"
    }
});

define(function(require, exports, module) {
    var RadioNodeList_getValue = require("RadioNodeList_getValue").default;
    var RadioNodeList_setValue = require("RadioNodeList_setValue").default;

    var timerId;

    function updateOutput() {
        var input1Value = RadioNodeList_getValue(document.forms[0].input1);
        document.getElementById("input1Value").textContent = input1Value;
        RadioNodeList_setValue(document.forms[0].input1out, input1Value);
        var input2Value = RadioNodeList_getValue(document.forms[0].input2);
        document.getElementById("input2Value").textContent = input2Value;
    }

    function init() {
        timerId = setInterval(updateOutput, 500);
    }

    alert("Hello!");
    init();
});
