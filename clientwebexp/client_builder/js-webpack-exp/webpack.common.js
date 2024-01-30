const path = require('path');
const CopyFilePlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyFilePlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, 'src/public'),
                    from: path.resolve(__dirname, 'src/public/**/*'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        })
    ]

};
