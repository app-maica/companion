var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var mode = process.env.NODE_ENV;
var paths = {
    f7: __dirname + '/bower_components/Framework7/dist',
    backendless: __dirname + '/bower_components/backendless/libs',
    materialIcons: __dirname + '/bower_components/material-design-icons/iconfont',
    styles: __dirname + '/www_src/styles'
}

module.exports = {
    entry: {
        app: './www_src/main.js'
    },
    output: {
        path: './www',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'framework7': paths.f7 + '/js/framework7.js',
            'framework7.material.css': paths.f7 + '/css/framework7.material.css',
            'framework7.material.color.css': paths.f7 + '/css/framework7.material.colors.css',
            'material.icons.css': paths.materialIcons + '/material-icons.css',
            'app.styles.css': paths.styles + '/style.css',
            'backendless': paths.backendless + '/backendless.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),

        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './www_src/index.html',
            filename: 'index.html',
            minify: false,
            inject: 'body'

        }),
        new CopyWebpackPlugin([
            {
                from: './www_src/pages',
                to: 'pages'
            },
            {
                from: './www_src/assets',
                to: 'assets'
            }
        ])
    ],
    module: {
        preLoaders: [
            {
                test: /\.tag$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'riotjs-loader',
                query: {
                    type: 'none'
                }
            }
        ],
        loaders: [
            {
                test: /\.js|\.tag$/,
                exclude: /(node_modules|bower_components)/,
                include: /www_src/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
            {
                test: /\.html$/,
                loader: 'html'
        },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loader: 'url'
        },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
            {
                test: /\.ttf$|\.eot$|\.svg$/,
                loader: 'file-loader'
        }
        ]
    }
}