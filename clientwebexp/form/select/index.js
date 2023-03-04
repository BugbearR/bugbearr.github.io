const input1Elm = document.getElementById("input1");
const curValueElm = document.getElementById("cur_value");
const curTextElm = document.getElementById("cur_text");
const sampleValueElm = document.getElementById("sample_value");

sampleValueElm.addEventListener("change", (evt) => {
    input1.value = evt.target.value;
});

input1Elm.addEventListener("change", (evt) => {
    const elm = evt.target;
    curValueElm.value = elm.value;
    curTextElm.value = elm.options[elm.selectedIndex].text;
});
