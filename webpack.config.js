var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?localIdentName=[name]-[local]-[hash:base64:8]'
                )
            },
            { test: /\.less$/, loader: 'less-loader' },
            { test: /\.png$/, loader: "url-loader" },
        ]
    },
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite',
            'ui': 'retail-ui/components'
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('bundle.css')
    ],
    devtool: ''
}
