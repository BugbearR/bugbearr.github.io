(function () {
    function jsValueToString(v) {
        if (v === undefined) {
            return "undefined";
        } else if (v === null) {
            return "null";
        }
        return v.toString();
    }

    const ENTITY_MAP = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&x39;"
    };

    function escapeXML(s) {
       return s.replace(/[&<>"']/g, (c) => { return ENTITY_MAP[c]; });
    }

    function onClickExecButton() {
        var regexpText = document.getElementById("regexpText").value;
        var flags = document.getElementById("flags").value;
        var targetText = document.getElementById("targetText").value;
        var lastIndexIn = document.getElementById("lastIndexIn").value;
        var re = new RegExp(regexpText, flags);
        re.lastIndex = parseInt(lastIndexIn, 10);
        var matches = re.exec(targetText);
        if (matches === undefined || matches === null) {
            document.getElementById("index").innerHTML = "";
            document.getElementById("lastIndex").innerHTML = "";
            document.getElementById("array").innerHTML = "undefined";
            document.getElementById("indices").innerHTML = "";
            document.getElementById("groups").innerHTML = "undefined";
            document.getElementById("indices_groups").innerHTML = "";
        }
        else {
            document.getElementById("index").innerHTML = jsValueToString(matches.index);
            document.getElementById("lastIndex").innerHTML = jsValueToString(re.lastIndex);

            var i;
            var arrayRecs = [];
            for (i = 0, iEnd = matches.length; i < iEnd; i++) {
                arrayRecs.push("<tr><td>[" + i + "]</td><td>" + escapeXML(matches[i]) + "</td></tr>");
            }
            document.getElementById("array").innerHTML = "<table>" + arrayRecs.join("") + "</table>";

            if (matches.indices === undefined) {

            }
            else {
                var indicesRecs = [];
                for (i = 0, iEnd = matches.indices.length; i < iEnd; i++) {
                    indicesRecs.push("<tr><td>[" + i + "]</td><td>" + JSON.stringify(matches.indices[i]) + "</td></tr>");
                }
                document.getElementById("indices").innerHTML = "<table>" + indicesRecs.join("") + "</table>";
            }

            if (matches.groups === undefined) {
                document.getElementById("groups").innerHTML = "undefined";
                document.getElementById("indices_groups").innerHTML = "undefined";
            }
            else {
                var groupRecs = [];
                var groupKeys = Object.keys(matches.groups).sort();
                for (i = 0, iEnd = groupKeys.length; i < iEnd; i++) {
                    var groupName = groupKeys[i];
                    groupRecs.push("<tr><td>" + escapeXML(groupName) + "</td><td>" + escapeXML(matches.groups[groupName]) + "</td></tr>");
                }
                document.getElementById("groups").innerHTML = "<table>" + groupRecs.join("") + "</table>";
                var idxGroupsRecs = [];
                for (i = 0, iEnd = groupKeys.length; i < iEnd; i++) {
                    groupName = groupKeys[i];
                    idxGroupsRecs.push("<tr><td>" + escapeXML(groupName) + "</td><td>" + JSON.stringify(matches.indices.groups[groupName]) + "</td></tr>");
                }
                document.getElementById("indices_groups").innerHTML = "<table>" + idxGroupsRecs.join("") + "</table>";
            }
        }
    }
    function init() {
        document.getElementById("execButton").addEventListener("click", onClickExecButton);
    }

    // window.addEventListener("DOMContentLoaded", init);
    init();
})();
