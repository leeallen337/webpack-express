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
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true
    }
  });

  app.use(middleware);

  app.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err);
      }

      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    })
  });
  
  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    }

    console.log('Listening on port' + port);
  });
}
