'use strict';

function content_type(extension) {
  var lookup = {
    'js': 'application/javascript',
    'css': 'text/css'
  }
  return lookup[extension] === undefined ? 'text/plain' : lookup[extension];
}

function consider(url) {
  var expected = [
    { condition: /\.(js|css)$/,
      status: 415,
      message: 'What is this "' + url.match(/\.(.*)$/)[1] + '" thing you ask for?' },
    { condition: /\.min\.(js|css)$/,
      status: 403,
      message: 'I know what that is, but you don\'t need my help to get things like that.' }
  ], unexpected = [
    { condition: /^\/$/,
      status: 418,
      message: 'How Zen.' }
  ], result = {
    status: 200,
    message: 'OK'
  }

  for (index in expected) {
    if (!~url.search(expected[index].condition)) {
      status = expected[index].status;
      message = expected[index].message;
    }
  }
  for (index in unexpected) {
    if (~url.search(unexpected[index].condition)) {
      status = unexpected[index].status;
      message = unexpected[index].message;
    }
  }

  return { 'acceptable': result.status === 200, 'response': result };
}

module.exports = function minion(config) { 
  require('http').createServer(function(request, response) {
    var considered = consider(url);
    if (considered.acceptable) {
      request.url = request.url.replace(/\.min/, '');

      require('fs').exists(config.get('docroot') + request.url, function (exists) {
        if (exists) {
          var target = request.url.replace(/^\//, '').replace(/\.(js|css)$/, ''),
              options = ['-o', 'out=stdout', 'logLevel=4', 'baseUrl=' + config.get('docroot'), 'name=' + target],
              command = require('child_process').spawn(config.get('requirejs'), options);

          response.statusCode = 200;
          if (!response.headersSent) {
            response.setHeader('Content-Type', content_type(request.url.match(/\.(js|css)$/)[1]));
          }

          if (~request.headers['accept-encoding'].search('gzip')) {
            if (!response.headersSent) {
              response.setHeader('Content-Encoding', 'gzip');
            }
            command.stdout.pipe(require('zlib').createGzip()).pipe(response);
          } else if (~request.headers['accept-encoding'].search('deflate')) {
            if (!response.headersSent) {
              response.setHeader('Content-Encoding', 'deflate');
            }
            command.stdout.pipe(require('zlib').createDeflate()).pipe(response);
          } else {
            command.stdout.pipe(response);
          }
          
          command.stdout.on('end', function () {
            response.end();
          });

          command.stderr.on('data', function (data) {
            response.statusCode = 500;
            response.write(data);
          }).on('end', function () {
            response.end();
          });
        } else {
          response.statusCode = 404;
          response.end('I don\'t have a thing like that. Go Fish.');
        }
      });
    } else {
      response.statusCode = considered.status;
      response.end(considered.message);
    }
  }).listen(config.get('port'));
}
