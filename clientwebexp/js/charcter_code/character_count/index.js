(function () {
    function init() {
        document.getElementById("clear").addEventListener("click", function () {
            document.getElementById("textInput").value = "";
            document.getElementById("outputUtf16Length").textContent = "";
            document.getElementById("outputUtf16").textContent = "";
            document.getElementById("outputUtf32Length").textContent = "";
            document.getElementById("outputUtf32").textContent = "";
            document.getElementById("outputUtf8ByteLength").textContent = "";
            document.getElementById("outputUtf8").textContent = "";
            document.getElementById("outputGraphemeLength").textContent = "";
            document.getElementById("outputGrapheme").textContent = "";
        });

        const textInput = document.getElementById("textInput");

        textInput.addEventListener("input", async function () {
            const value = textInput.value;
            const count = value.length;

            document.getElementById("outputUtf16Length").textContent = count;
            const utf16List = [];
            for (let i = 0; i < value.length; i++) {
                utf16List.push(value.charCodeAt(i));
            }
            const strUtf16 = "['" + utf16List.map((code)=> { return "\\u" + code.toString(16).padStart(4, "0"); }).join("','") + "']";
            document.getElementById("outputUtf16").textContent = strUtf16;

            const utf32List = [];
            for (let i = 0; i < value.length; i++) {
                const code = value.codePointAt(i);
                utf32List.push(code);
                if (code > 0xFFFF) {
                    i++;
                }
            }
            document.getElementById("outputUtf32Length").textContent = utf32List.length;
            const strUtf32 = "['" + utf32List.map((code)=> { return "\\U" + code.toString(16).padStart(6, "0"); }).join("','") + "']";
            document.getElementById("outputUtf32").textContent = strUtf32;

            const utf8Blob = new Blob([value], {type: "text/plain;charset=utf-8"});
            const utf8Count = utf8Blob.size;
            document.getElementById("outputUtf8ByteLength").textContent = utf8Count;

            const utf8Buffer = await utf8Blob.arrayBuffer();
            const uint8Array = new Uint8Array(utf8Buffer);
            const strUtf8 = "['" + Array.from(uint8Array).map((code)=> { return code.toString(16).padStart(2, "0"); }).join("','") + "']";
            document.getElementById("outputUtf8").textContent = strUtf8;

            const locale = document.getElementById("inputLocale").value;
            document.getElementById("outputLocale").textContent = locale;
            const segmenter = new Intl.Segmenter(locale, {granularity: "grapheme"});
            const segments = Array.from(segmenter.segment(value));
            const graphemeCount = Array.from(segments).length;
            document.getElementById("outputGraphemeLength").textContent = graphemeCount;
            const strGrapheme = "['" + segments.map(item => item.segment).join("','") + "']";
            document.getElementById("outputGrapheme").textContent = strGrapheme;
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
