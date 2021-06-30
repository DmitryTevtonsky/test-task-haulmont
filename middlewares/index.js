/* eslint-disable */
const http = require('http');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

module.exports = function() {
  const app = express();

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler));

  const server = http.createServer(app);
  server.listen(webpackConfig.devServer.localPort);
};
