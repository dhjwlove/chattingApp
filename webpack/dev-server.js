const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.config');

const compiler = webpack(config);

const server = new WebpackDevServer({
  hot: true,
  liveReload: false,
  // proxy: {
  //   '/socket.io': 'http://localhost:3000',
  // },
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  },
}, compiler);

(async () => {
  await server.start();
  console.log('dev server is running');
})();
