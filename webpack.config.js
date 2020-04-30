const webpack = require('webpack');
const path = require('path');
const env = require('./utils/env');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
const alias = {
    'react-dom': '@hot-loader/react-dom',
};

const fileExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'eot',
    'otf',
    'svg',
    'ttf',
    'woff',
    'woff2',
];

const options = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        index: path.join(__dirname, 'src/app/index.jsx'),
        background: path.join(__dirname, 'src/extension/scripts/background.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: alias,
        extensions: fileExtensions
            .map((extension) => '.' + extension)
            .concat(['.jsx', '.js', '.css']),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        // clean the build folder
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: false,
        }),
        // expose and write the allowed env consts on the compiled bundle
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CopyWebpackPlugin(
            [
                {
                    from: 'src/extension/assets/img',
                    to: path.join(__dirname, 'build/icons'),
                },
                {
                    from: 'src/extension/manifest.json',
                    to: path.join(__dirname, 'build'),
                },
            ],
            {
                logLevel: 'info',
                copyUnmodified: true,
            }
        ),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/app/index.html'),
            filename: 'index.html',
            chunks: ['index'],
        }),
        new WriteFilePlugin(),
    ],
};

if (env.NODE_ENV === 'development') {
    options.devtool = 'cheap-module-eval-source-map';
}

module.exports = options;
