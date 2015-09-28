#!/usr/bin/env node
var os = require('os')
var path = require('path')
var updateNotifier = require('update-notifier')
var sudoBlock = require('sudo-block')
var startup = require('user-startup')
var chalk = require('chalk')
var got = require('got')
var address = require('network-address')
var pkg = require('./package.json')

sudoBlock('Should not be run as root, please retry without sudo.')

updateNotifier({pkg: pkg}).notify()

function stop () {
  startup.remove('stop-server')
  got.delete('localhost:' + 5709)
}

function start () {
  var log = path.join(os.tmpdir(), 'stop-server')
  startup.create('stop-server', process.execPath, [__dirname], log)

  if (os.platform() !== 'win32') {
    console.log(
      [
        '',
        '---',
        'To complete installation, you need to allow \'shutdown\' to be run without sudo.',
        'Please run ' + chalk.cyan('sudo visudo') + ' and add ' + chalk.cyan('your-username ALL=NOPASSWD: /sbin/shutdown'),
        '---'
      ].join('\n')
    )
  }

  console.log(
    [
      '',
      'To access stop-server from your phone, scan the QR code here',
      chalk.cyan('http://localhost:5709/qr.html'),
      '',
      'Or go directly to',
      chalk.cyan('http://' + address() + ':5709'),
      ''
    ].join('\n')
  )
}

var yargs = require('yargs')
  .version(pkg.version)
  .alias('v', 'version')
  .usage('Usage: $0 start|stop')
  .demand(1)

var argv = yargs.argv

if (argv._[0] === 'start') return start()
if (argv._[0] === 'stop') return stop()

console.log(yargs.showHelp)
