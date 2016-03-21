var path = require('path');
var webpack = require('webpack');

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
				presets: ['es2015', 'react']
			}
		}]
	},
	resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
    	new webpack.optimize.DedupePlugin(),
	],
  devtool: 'inline-source-map'
}