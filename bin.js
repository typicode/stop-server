#!/usr/bin/env node
var os = require('os')
var path = require('path')
var updateNotifier = require('update-notifier')
var sudoBlock = require('sudo-block')
var startup = require('user-startup')
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
        '  To complete installation, you need to allow the \'poweroff\' command to be run without admin password.',
        '  Please run `sudo visudo` and add `your-username ALL=NOPASSWD: /sbin/poweroff`',
      ].join('\n')
    )
  }

  console.log(
    [
      '',
      '  Scan the QR code here http://localhost:5709/qr.html',
      '  Or visit http://' + address() + ':5709 on your phone or tablet',
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
