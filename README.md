# stop-server [![](https://badge.fury.io/js/stop-server.svg)](https://www.npmjs.com/package/stop-server) [![](https://travis-ci.org/typicode/stop-server.svg?branch=master)](https://travis-ci.org/typicode/stop-server)

> Shut down your computer with your phone :iphone: (works on OS X, Linux and Windows)

## Install

```sh
npm install -g stop-server
```

```sh
stop-server start # Need to be done only once
```

## Usage

Visit [`http://your-local-ip:5709`](http://localhost:5709/qr.html) __on your phone__. You should see this page:

![](http://i.imgur.com/4WadpZc.png)

__Important__ if you're on OS X or Linux, you need to allow commands to be used without sudo:

```bash
# Run 'sudo visudo' and add
your-username ALL=NOPASSWD: /sbin/shutdown       # OS X and Linux
your-username ALL=NOPASSWD: /usr/sbin/pm-suspend # Linux only
```

__Tip__ for easier access, you can get a QR code by going to [http://localhost:5709/qr.html](http://localhost:5709/qr.html) from your computer

## Uninstall

```
npm rm -g stop-server
```

## How it works?

`stop-server` is a simple Express server with only 2 routes:

```
POST http://your-local-ip:5709/power-off
POST http://your-local-ip:5709/sleep
```

## License

MIT - [typicode :cactus:](https://github.com/typicode/stop-server)
