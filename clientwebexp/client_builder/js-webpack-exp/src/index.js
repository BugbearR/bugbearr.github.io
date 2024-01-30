import { Foo } from "./foo.js";
import { Bar } from "./bar.js";

(function() {
    console.log("index.js");
    const foo = new Foo();
    const bar = new Bar();
    console.log(foo.getName());
    console.log(bar.getName());
})();
