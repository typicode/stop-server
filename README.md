# stop-server [![](https://badge.fury.io/js/stop-server.svg)](https://www.npmjs.com/package/stop-server) [![](https://travis-ci.org/typicode/stop-server.svg?branch=master)](https://travis-ci.org/typicode/stop-server)

> Shut down :zap: your computer using your phone or tablet, from your bed or couch ;)

![](http://i.imgur.com/lWW1LTE.png)

_Requires Node.js and works on OS X, Linux and Windows._

## Why?

__For fun__ and because I usually watch movies on my computer.

## Install

```
npm install -g stop-server && stop-server start
```

Additionally, on __OS X__ and __Linux__ you need to allow the `poweroff` command to be used without admin password:

```bash
# Run 'sudo visudo'
# Add
your-username ALL=NOPASSWD: /sbin/poweroff
```

## Usage

Visit [http://localhost:5709/qr.html](http://localhost:5709/qr.html) on your computer and scan the QR code or go directly to `http://your-local-ip:5709` from your phone/tablet.

Now if you press the stop button, your computer will be shut down.

## Uninstall

```
npm rm -g stop-server
```

## How it works?

stop-server is a simple Express server. When you call `DELETE http://your-local-ip:5709`, it runs `poweroff` (OS X, Linux) or `shutdown` (Windows).

stop-server is automatically started on log in using [user-startup](https://github.com/typicode/user-startup).

## License

MIT - [typicode](https://github.com/typicode/stop-server)
