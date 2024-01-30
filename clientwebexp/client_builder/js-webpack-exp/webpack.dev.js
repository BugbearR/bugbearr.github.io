const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // [DEP_WEBPACK_DEV_SERVER_HTTPS] DeprecationWarning: 'https' option is deprecated. Please use the 'server' option.
        // https: { ... }
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync('../tls/privkey.pem'),
                cert: fs.readFileSync('../tls/cert.pem'),
                port: 443
            },
        },
        port: 443,
        host: '0.0.0.0',
        allowedHosts: ['localhost'],
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        watchFiles: ['./src/*.js', './dist/*.html'],
    }
});
