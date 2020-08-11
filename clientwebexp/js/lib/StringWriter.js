function StringWriter() {
    this.sa = [];
}

StringWriter.prototype.write = function(s) {
    this.sa.push(s);
}

StringWriter.prototype.writeLine = function (s) {
    this.sa.push(s);
    this.sa.push("\n");
}

StringWriter.prototype.toString = function () {
    return this.sa.join("");
}

StringWriter.prototype.clear = function () {
    this.sa = [];
}
