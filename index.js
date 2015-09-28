var path = require('path')
var cp = require('child_process')
var util = require('util')
var express = require('express')
var address = require('network-address')
var updateNotifier = require('update-notifier')
var pkg = require('./package.json')

var app = express()
var notifier = updateNotifier({ pkg: pkg })

app.use(express.static(path.join(__dirname, 'public')))

app.delete('/', function (req, res) {
  res.end()
  util.log('exit')
  process.exit()
})

app.post('/', function (req, res) {
  var cmd

  switch (process.platform) {
    case 'win32':
      cmd = 'shutdown -s'
      break
    case 'linux':
      cmd = 'sudo shutdown -h now'
      break
    case 'darwin':
      cmd = 'sudo shutdown -h now'
      break
    default:
      throw new Error('Unknown OS')
  }

  util.log('running ' + cmd)

  cp.exec(cmd, function (err, stderr, stdout) {
    if (err) {
      util.log(err)
      res.status(500).json({ error: 'Can\'t run shutdown command' })
    } else {
      res.end()
    }
  })
})

app.get('/address', function (req, res) {
  res.json({ address: address() })
})

app.get('/update', function (req, res) {
  res.json(notifier.update || {})
})

var port = '5709'

app.listen(port, function () {
  util.log('stop-server listening on port ' + port)
})
