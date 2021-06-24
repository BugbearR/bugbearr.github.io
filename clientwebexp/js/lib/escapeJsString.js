/**
 * Map for escape characters.
 */
const JS_ESCAPES = {
    "\x00": "\\u0000",
    "\x01": "\\u0001",
    "\x02": "\\u0002",
    "\x03": "\\u0003",
    "\x04": "\\u0004",
    "\x05": "\\u0005",
    "\x06": "\\u0006",
    "\x07": "\\u0007",
    "\x08": "\\b", // BS
    "\x09": "\\t", // HT(TAB)
    "\x0a": "\\n", // LF
    "\x0b": "\\v", // VT
    "\x0c": "\\f", // FF
    "\x0d": "\\r", // CR
    "\x0e": "\\u000e",
    "\x0f": "\\u000f",
    "\x10": "\\u0010",
    "\x11": "\\u0011",
    "\x12": "\\u0012",
    "\x13": "\\u0013",
    "\x14": "\\u0014",
    "\x15": "\\u0015",
    "\x16": "\\u0016",
    "\x17": "\\u0017",
    "\x18": "\\u0018",
    "\x19": "\\u0019",
    "\x1a": "\\u001a",
    "\x1b": "\\u001b",
    "\x1c": "\\u001c",
    "\x1d": "\\u001d",
    "\x1e": "\\u001e",
    "\x1f": "\\u001f",
    "\"": "\\u0022",
    // eslint-disable-next-line quote-props
    "$": "\\u0024",
    "&": "\\u0026",
    "'": "\\u0027",
    "-": "\\u002d",
    "<": "\\u003c",
    ">": "\\u003e",
    "[": "\\u005b",
    "\\": "\\\\",
    "]": "\\u005d",
    "`": "\\u0060",
    "\x7f": "\\u007f",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
};

/**
 * Escape JavaScript character.
 * @param {string} c character
 * @returns {string} escaped character
 */
function escapeJsChar(c) {
    return JS_ESCAPES[c];
}

function escapeJsString(s) {
    // eslint-disable-next-line no-control-regex
    return s.replace(/[\x00-\x1f"$&'\-<>\[\\\]`\x7f\u2028\u2029]/g, escapeJsChar);
}

if (typeof module !== "undefined") {
    module.exports = escapeJsString;
}
