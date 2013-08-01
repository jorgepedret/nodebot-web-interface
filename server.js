var app = require('http').createServer(),
    io  = require('socket.io').listen(app),
    fs  = require('fs'),
    port = 8888,
    five = require("johnny-five"),
    bot, board;

board = new five.Board();

board.on("ready", function() {

  bot = new five.Nodebot({
    right: 12,
    left: 13
  });

  /*
   * Initialize the bot by telling it to stop
   */
  bot.stop();

  io.sockets.on('connection', function (socket) {
    /*
     * Stores current direction of the bot to 
     * calculate the pivoting motion
     */
    var currentDirection = null;

    console.log("socket connected", socket.id);
    /*
     * Stop the bot on 'stop' event
     */
    socket.on('stop', function () {
      console.log("bot:stop");
      movements = [];
      bot.stop();
    });

    socket.on('move', function (direction) {

      console.log("bot:move:" + direction);

      switch (direction) {
        /*
         * Pivot left if there's an existing direction
         */
        case 'left':
          if (currentDirection) {
            bot.pivot(currentDirection + "-left");
          }
          break;
        /*
         * Pivot right if there's an existing direction
         */
        case 'right':
          if (currentDirection) {
            bot.pivot(currentDirection + "-right");
          }
          break;
        /*
         * Move forward
         */
        case 'fwd':
          currentDirection = "forward";
          bot.fwd(10);
          break;
        /*
         * Move back
         */
        case 'rev':
          currentDirection = "reverse";
          bot.rev(10);
          break;
      }
    });
  });
  board.repl.inject({
    n: bot
  });
});

console.log("listening on port ", port);
app.listen(port);