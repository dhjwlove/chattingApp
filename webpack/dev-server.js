const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.config');
const compiler = webpack(config);

const server = new webpackDevServer({ hot: true, liveReload: false}, compiler);

(async () => {
  await server.start();
  console.log('dev server is running');
})();