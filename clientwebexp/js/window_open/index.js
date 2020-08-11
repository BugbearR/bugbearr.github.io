(function () {
    function getRadioValue(radioList) {
        for (var i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                return radioList[i].value;
            }
        }
        return "";
    }

    function appendNumber(a, featureName, elmName) {
        var textElm = document.getElementById(elmName);
        if (!textElm) {
            return a;
        }
        if (textElm.value.trim() === "") {
            return a;
        }
        var value = Number(textElm.value);
        if (isNaN(value)) {
            return a;
        }
        return a.concat([featureName + "=" + value]);
    }

    function appendChecked(a, featureName, elmName) {
        var checkboxElm = document.getElementById(elmName);
        if (!checkboxElm) {
            return a;
        }
        if (!checkboxElm.checked) {
            return a;
        }
        return a.concat([featureName]);
    }

    function appendRadioFlag(a, featureName, elmName) {
        var radioList = document.forms[0][elmName];
        var radioValue = getRadioValue(radioList);
        switch (radioValue) {
        case "default":
            return a;
        case "name":
            return a.concat([ featureName ]);
        case "yes":
            return a.concat([ featureName + "=yes" ]);
        case "no":
            return a.concat([ featureName + "=no" ]);
        default:
            return a;
        }
    }

    function createFeatures() {
        var a = [];
        a = appendNumber(a, "left", "leftText");
        a = appendNumber(a, "top", "topText");
        a = appendNumber(a, "width", "widthText");
        a = appendNumber(a, "height", "heightText");
        a = appendNumber(a, "screenX", "screenXText");
        a = appendNumber(a, "screenY", "screenYText");
        a = appendNumber(a, "outerHeight", "outerHeightText");
        a = appendNumber(a, "outerWidth", "outerWidthText");
        a = appendNumber(a, "innerHeight", "innerHeightText");
        a = appendNumber(a, "innerWidth", "innerWidthText");
        a = appendRadioFlag(a, "menubar", "menubar");
        a = appendRadioFlag(a, "toolbar", "toolbar");
        a = appendRadioFlag(a, "location", "location");
        a = appendRadioFlag(a, "status", "status");
        a = appendRadioFlag(a, "resizable", "resizable");
        a = appendRadioFlag(a, "scrollbars", "scrollbars");
        a = appendRadioFlag(a, "noopener", "noopener");
        a = appendRadioFlag(a, "noreferrer", "noreferrer");
        return a.join(",");
    }

    function onClickCreateFeatures() {
        var features = createFeatures();
        document.getElementById("featuresText").value = features;
    }


    function openWindow() {
        var features = document.getElementById("featuresText").value;
        document.getElementById("appliedFeaturesText").value = features;
        var url = document.getElementById("urlText").value;
        var windowName = document.getElementById("windowNameText").value;
        window.open(url, windowName, features);
    }

    function init() {
        var openWindowButton = document.getElementById("openWindowButton");
        openWindowButton.addEventListener("click", openWindow);
        var createFeaturesButton = document.getElementById("createFeaturesButton");
        createFeaturesButton.addEventListener("click", onClickCreateFeatures);
        document.getElementById("urlText").value = "sub.html";
    }

    window.addEventListener("DOMContentLoaded", init);
})();
