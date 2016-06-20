//var path = require("path");
var webpack = require("webpack");

module.exports = {
	cache: false,
	entry: {
		app: "./assets/src/app"
	},
	output: {
		path: "./assets/dist",
		publicPath: "./assets/dist/",
		filename: "[name].bundle.js",
		chunkFilename: "[chunkhash].js"
	},
	module: {},
	resolve: {},
	plugins: []
};