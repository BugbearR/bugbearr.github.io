console.log("defer_sample4");

document.addEventListener("DOMContentLoaded", () => {
    console.log("defer_sample4 DOMContentLoaded");
});

{
    let r = 0;
    for (let i = 0; i < 10000000; i++) {
        r += Math.random();
    }
    console.log("defer_sample4 end:" + r);
}
