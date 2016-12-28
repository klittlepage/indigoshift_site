var PROD = (process.env.MIDDLEMAN_ENV === 'production')

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var outputPath = path.join(__dirname, '.tmp', 'dist', 'assets');
var sourceMapIncludes =  path.join(__dirname, "node_modules");

var sassLoader = ExtractTextPlugin.
  extract("style-loader",
          ["css-loader?sourceMap&includePaths[]=" + sourceMapIncludes, 
          "postcss-loader",
          "sass-loader?sourceMap&includePaths[]=" + sourceMapIncludes],
          { "publicPath":"/assets/" });

var outputNameTemplate = PROD ? '[name]-[chunkhash].min' : '[name]-[chunkhash]';

var buildPlugins = [
    new ExtractTextPlugin(outputNameTemplate + ".css"),
    new ManifestPlugin(),
    new CleanWebpackPlugin(outputPath),
];

if(PROD) {
  uglify = new webpack.optimize.UglifyJsPlugin({minimize: true,
                                                sourceMap: true,
                                                compress: { warnings: false }});
  buildPlugins.push(uglify);
}

module.exports = {
  entry: {
    site: [
      './source/stylesheets/site.scss',
      './source/javascripts/site.js',
    ],
  },

  resolve: {
    root: path.join(__dirname, 'source', 'javascripts'),
  },

  output: {
    path: outputPath,
    filename: outputNameTemplate + '.js',
    "publicPath":"/assets/",
  },

  cache: true,
  debug: true,
  devtool: 'source-map',

  module: {
    loaders: [{
      test: /source\/javascripts\/.*\.js$/,
      exclude: /node_modules|\.tmp|vendor/,
      loader: 'babel-loader',
      query: { presets: ['es2015'] }
    }, {
      test: /.*\.scss$/,
      loader: sassLoader
    }, { 
      test: /\.(png|jpg|jpeg)$/,
      loader: 'url-loader?[name]-[chunkhash].[ext]&limit=8192'
    }, {
      test: /\.ico$/,
      loader: 'url-loader?mimetype=image/x-icon'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  plugins: buildPlugins,
};
