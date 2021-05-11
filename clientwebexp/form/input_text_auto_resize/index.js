(function (win, doc)
{
    function copyFont(fromElm, toElm)
    {
        var fromStyle = getComputedStyle(fromElm);
        var attrs = ["fontFamily", "fontVariant", "fontWeight", "fontSize", "fontStretch", "lineHeight"];
        attrs.forEach(function (attr) {
            toElm.style[attr] = fromStyle[attr];
        });
    }
    function autoResizeInputText_update(input, hidden, evt)
    {
        hidden.textContent = input.value;
    }

    function autoResizeInputText_init(inputElm)
    {
        var parentNode = inputElm.parentNode;
        var inputStyle = getComputedStyle(inputElm);
        var outerElm = document.createElement("div");
        outerElm.classList.add("autoResizeInputText_outer");
        copyFont(inputElm, outerElm);
        outerElm.style.height = inputStyle.height;
        var hiddenElm = document.createElement("div");
        hiddenElm.classList.add("autoResizeInputText_hidden");
        var placeholder = inputElm.getAttribute("placeholder");
        if (placeholder) {
            hiddenElm.setAttribute("data-placeholder", placeholder);
        }
        outerElm.appendChild(hiddenElm);
        parentNode.replaceChild(outerElm, inputElm);
        outerElm.appendChild(inputElm);

        var fn = autoResizeInputText_update.bind(inputElm, inputElm, hiddenElm);
        inputElm.addEventListener("input", fn);
    }

    function autoResizeInputTexts_init()
    {
        var targets = document.getElementsByClassName("autoResizeInputText_input");
        for (var i = 0, iEnd = targets.length; i < iEnd; i++) {
            autoResizeInputText_init(targets[i]);
        };
    }

    function init()
    {
        autoResizeInputTexts_init();
    }

    init();

})(window, document);
