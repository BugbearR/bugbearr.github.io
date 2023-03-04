console.log("async_sample2");

document.addEventListener("DOMContentLoaded", () => {
    console.log("async_sample2 DOMContentLoaded");
});

{
    let r = 0;
    for (let i = 0; i < 10000000; i++) {
        r += Math.random();
    }
    console.log("async_sample2 end:" + r);
}
