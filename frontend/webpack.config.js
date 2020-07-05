const path=require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill',path.resolve(__dirname, 'src/index.jsx')],
    output: {
       path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './',
                        esModule: true
                    }
                },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        filename: '[name].[ext]'
                    }
                }
                ]
            },
            {
                test: /\.jsx?$/i,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'),
            ]
        }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html'
            }),
        new MiniCssExtractPlugin ({
            filename: '[name].css'
        }),
        new BrowserSyncWebpackPlugin({
            host: 'localhost',
            port: 3002,
            server: { baseDir: ['./dist']}
        })
    ],
    resolve: {
        extensions: ['.js', '.css', '.jsx']
    }
};
