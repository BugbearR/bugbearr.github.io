(function () {
    async function init() {
        const result = document.getElementById("result");
        const textArea = document.getElementById("output");
        if (!("ReadableStream" in window)) {
            result.textContent = "This browser doesn't support ReadableStream.";
            // console.log("This browser doesn't support ReadableStream.");
            return;
        }

        if (!("Symbol" in window) || !("asyncIterator" in Symbol)) {
            result.textContent = "This browser doesn't support Symbol.asyncIterator.";
            // console.log("This browser doesn't support Symbol.asyncIterator.");
            return;
        }

        const hasAsyncIterator = Symbol.asyncIterator in ReadableStream.prototype;
        if (!hasAsyncIterator) {
            result.textContent = "This browser doesn't support ReadableStream.prototype[Symbol.asyncIterator].";
            // console.log("This browser doesn't support ReadableStream.prototype[Symbol.asyncIterator].");
            return;
        }

        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue('Hello');
                controller.enqueue('World');
                controller.close();
            }
        });

        try {
            for await (const chunk of stream) {
                textArea.textContent += chunk;
            }
            if (textArea.textContent === "HelloWorld") {
                result.textContent = "ReadableStream.prototype[Symbol.asyncIterator] works!";
            }
        }
        catch (e) {
            result.textContent = e.message;
        }
    }

    window.addEventListener("DOMContentLoaded", init);
})();
