console.log("defer_sample3");

document.addEventListener("DOMContentLoaded", () => {
    console.log("defer_sample3 DOMContentLoaded");
});

{
    let r = 0;
    for (let i = 0; i < 10000000; i++) {
        r += Math.random();
    }
    console.log("defer_sample3 end:" + r);
}
