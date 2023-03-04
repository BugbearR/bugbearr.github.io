console.log("none_sample6");

document.addEventListener("DOMContentLoaded", () => {
    console.log("none_sample6 DOMContentLoaded");
});

{
    let r = 0;
    for (let i = 0; i < 10000000; i++) {
        r += Math.random();
    }
    console.log("none_sample6 end:" + r);
}
