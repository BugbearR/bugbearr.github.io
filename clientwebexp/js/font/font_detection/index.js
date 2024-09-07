const knownFonts = [
    'NotExistsFontName', // This is a fake font name
    'Noto Sans',
    'Noto Sans Japanese',
    'Noto Sans Traditional Chinese',
    'Noto Sans Simplified Chinese',
    'Noto Sans Hong Kong',
    'Noto Sans Korean',
    'Hiragino Sans',
    'Hiragino Kaku Gothic Pro',
    'Osaka',
    'MS Gothic',
    'MS PGothic',
    'MS UI Gothic',
    'MS Mincho',
    'MS PMincho',
    'Meiryo',
    'Meiryo UI',
    'Yu Gothic',
    'Yu Mincho',
    'Segoe UI',
    'Adobe Blank'
];

function isFontAvailable(font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
    context.font = `40px '${font}', 'Adobe Blank'`;
    const newWidth = context.measureText(text).width;
    console.log(`${font}:${newWidth}`);
    return newWidth > 0;
}

function isFontAvailable2(font) {
    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.left = '-9999px';
    span.style.top = '-9999px';
    span.style.visibility = 'hidden';
    span.style.fontFamily = `'${font}', 'Adobe Blank'`;
    span.style.fontSize = '40px';
    span.innerHTML = 'abcdefghijklmnopqrstuvwxyz0123456789';
    document.body.appendChild(span);
    return span.clientWidth > 0;
}

function detectFonts() {
    const detectedFonts = [];
    knownFonts.forEach(font => {
        if (isFontAvailable(font)) {
            detectedFonts.push(font);
        }
    });
    return detectedFonts;
}

function addFontSample(fontFamilyName) {
    const sample = document.createElement('div');
    sample.innerHTML = `<span>${fontFamilyName}</span><span style="font: 32px '${fontFamilyName}'; white-space: nowrap"> !&#x22;#$%&#x26;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~あ永</span>`;
    document.body.appendChild(sample);
}

function addFontSampleAll(detectedFonts) {
    detectedFonts.forEach(font => {
        addFontSample(font);
    });
}

function init() {
    document.fonts.load('40px "Adobe Blank"', "abcdefghijklmnopqrstuvwxyz0123456789").then(() => {
        console.log('Adobe Blank loaded');
    });
    document.fonts.ready.then(() => {
        console.log('All fonts loaded');
        const detectedFonts = detectFonts();
        console.log('Detected fonts:', detectedFonts);
        if (detectedFonts.length === 0) {
            console.log('No known fonts detected');
        }
        addFontSampleAll(detectedFonts);
    });
}

init();