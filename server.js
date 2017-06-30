const path = require('path');
const express = require('express');

const isDevelping = process.env.NODE_ENV !== 'production';
const port = isDevelping ? 3000 : process.env.PORT;
const app = express();

if (isDevelping) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    lazy: false,
    index: "index.html",
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true
    }
  });

  app.use(middleware);
  
  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    }

    console.log('Listening on port ' + port);
  });
}
