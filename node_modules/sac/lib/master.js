'use strict';

var cluster = require('cluster'),
    os = require('os');

function banner() {
  return '.:[ Small and Crunchy :: Minifying Asset Server ]:.\n';
}

function configuration(config) {
  return '\nConfiguration:\n'
       + '  | Docked at Port ' + config.get('port') + '\n'
       + '  | Detected ' + os.cpus().length + ' cores available, soliciting minions to work them.\n'
       + '  | Expecting content at ' + config.get('docroot') + '\n'
       + '  | Expecting requirejs at ' + config.get('requirejs') + '\n';
}

module.exports = function master(config) {
  require('fs').exists(config.get('requirejs'), function (exists) {
    if (!exists) {
      console.error('Terminating due to failed sanity check: RequireJS not found.');
      process.exit();
    }
  });

  require('http').createServer(function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write('<h1>' + banner() + '</h1>');
    response.end('<pre>' + configuration(config) + '</pre>');
  }).listen(config.get('port') + 1);

  console.log(banner(), configuration(config));

  cluster.on('fork', function(minion) {
    console.log('Minion ' + minion.process.pid + ' has joined the party.');
  }).on('online', function(minion) {
    console.log('Minion ' + minion.process.pid + ' is ready for orders.');
  }).on('disconnect', function(minion) {
    console.log('Minion ', + minion.process.pid + ' has left the party');
  }).on('exit', function(minion, code, signal) {
    console.log('Minion ' + minion.process.pid + ' has died. Requesting reinforcements.');
    cluster.fork();
  });

  for (var processor in os.cpus()) {
    cluster.fork();
  }
}
