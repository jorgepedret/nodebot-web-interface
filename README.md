nodebot-web-interface
=====================

An example of a web interface powered by [Socket.IO](http://socket.io/) to control an Arduino robot using [johnny-five](https://github.com/rwldrn/johnny-five)

## How does it work?

For this project we used Johnny-Five and Socket.IO.

There are two main pieces: a server and a controller.

The __server__ connects and sends commands to the arduino. It also stands up a web server on port 8888 that receives socket commands and maps those commands to an action in the bot.

The __controller__ is the web interface. Its job is to send different events to the _server_ depending on the buttons that were clicked.

The _server_ and the _controller_ can be in two different parts of the world and it'd still work (as long as you have Internet).

## Running project

__Install the dependencies__

```
npm install
```

__Running the server:__

Do this after your bot is wired and ready to go. If you're still new to johnny-five, here's a great [getting started guide](https://github.com/rwldrn/johnny-five/wiki/Getting-Started).

Follow the [instructions](http://learn.parallax.com/ShieldRobot) on how to wire up your bot. Don't forget to [calibrate your servos](http://learn.parallax.com/node/185) with a screw driver before you start crying on the floor like a baby for 2 and a half hours.

Once you have everything hooked up (wired up, Firmata in Arduino and usb plugged in), run the following command:

```
node server.js
```

You can use the `repl` to test your bot by entering commands like: `n.fwd(10);` or `n.stop()`. The `repl` is like a interactive command line tool, you can execute commands directly from the CLI.

__Running the controller:__

The _controller_ creates a socket connection to the _server_, so the server needs to be up for the controller to work.

```
node controller.js
```

Go to `localhost:9966` in your browser and you should see the controller interface.

![Controller screenshot](/public/controller.png "Controller Screenshot")

If the controller doesn't work, make sure you're connecting to the right server. Check the `globals.server` value in `/harp.json`, and also check it on `/public/app.js`. Both of these files specify the URL of the server that you're connecting to.

## Authors

- Jorge Pedret (@jorgepedret)
- Donniel Thomas (@donnielrt)