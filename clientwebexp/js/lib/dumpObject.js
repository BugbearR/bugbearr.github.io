
function dumpObject(o, writer) {
    var i, len;

    var t = typeof o;
    switch (t) {
    case "undefined":
        writer.writeLine("undefined");
        return;

    case "boolean":
    case "bigint":
    case "number":
    case "string":
    case "symbol":
        writer.write(o.toString());
        return;

    case "function":
        writer.write('"[function]"');
        return;

    case "object":
        if (o === null) {
            put("null");
            return;
        }
        if (Array.isArray(o)) {
            writer.write("[");
            len = o.length;
            if (len > 0) {
                writer.write(o[0]);

                for (i = 1; i < len; i++) {
                    writer.write(", ");
                    writer.write(dumpObject(o[i], writer));
                }
            }
            writer.write("]");
            return;
        }

        var names = Object.getOwnPropertyNames(o);
        len = names.length;
        if (len == 0) {
            writer.writeLine("{}");
        }
        else if (len > 0) {
            writer.writeLine("{");
            if (writer.indent) {
                writer.indent();
            }
            for (i = 0; i < len; i++) {
                var name = names[i];
                if (i > 0) {
                    writer.writeLine(",");
                }
                writer.write(names[i]);
                writer.write(": ");
                writer.write(dumpObject(o[name], writer));
            }
            writer.writeLine();
            if (writer.undent) {
                writer.undent();
            }
            writer.writeLine("}");
        }
    }
}
