var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var webpack = require('webpack');

var webpackConfig = require("./webpack.config.js");


/**
 * Development build
 */

gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch(["assets/src/**/*"], ["webpack:build-dev"]);
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		
		if(err) {
			throw new gutil.PluginError("webpack:build-dev", err);
		}

		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));

		callback();
	});
});

/**
 * Production build
 */
 
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});