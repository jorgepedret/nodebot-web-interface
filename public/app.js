/*
 * Initialize socket connection
 * Don't forget to update the server address here too
 */
var socket = io.connect("http://localhost:8888");

$(function () {
  var btnLeft   = $("#left"),
      btnRight  = $("#right"),
      btnFwd    = $("#fwd"),
      btnBack   = $("#back"),
      btnStop   = $("#stop");
  /*
   * Abstracted interface for the nodebot
   */
  var nodeBot = {
    /*
     * Turn left
     */
    left: function () {
      console.log("move left");
      socket.emit("move", "left");
    },
    /*
     * Turn right
     */
    right: function () {
      console.log("move right");
      socket.emit("move", "right");
    },
    /*
     * Move forward
     */
    fwd: function () {
      console.log("move fwd");
      socket.emit("move", "fwd");
    },
    /*
     * Move back
     */
    back: function () {
      console.log("move rev");
      socket.emit("move", "rev");
    },
    /*
     * Stop
     */
    stop: function () {
      console.log("stop");
      socket.emit("stop");
    }
  }

  /*
   * Buttons use `touchstart` to know when a button as been tapped,
   * and `touchend` to know when button is not pressed anymore.
   */
  
  /*
   * Move forward when pressing the fwd button
   * Stop when not pressing it anymore
   */
  btnFwd.on("touchstart mousedown", nodeBot.fwd);
  btnFwd.on("touchend mouseup touchcancel", nodeBot.stop);

  /*
   * Move left when pressing the left button
   * Stop when not pressing it anymore
   */
  btnLeft.on("touchstart mousedown", nodeBot.left);
  btnLeft.on("touchend mouseup touchcancel", nodeBot.stop);

  /*
   * Move right when pressing the right button
   * Stop when not pressing it anymore
   */
  btnRight.on("touchstart mousedown", nodeBot.right);
  btnRight.on("touchend mouseup touchcancel", nodeBot.stop);

  /*
   * Move back when pressing the back button
   * Stop when not pressing it anymore
   */
  btnBack.on("touchstart mousedown", nodeBot.back);
  btnBack.on("touchend mouseup touchcancel", nodeBot.stop);

  /*
   * Stop when pressing the stop button
   */
  btnStop.on("touchstart", nodeBot.Stop);

  /*
   * Mapping of keyboard keys to bot movements
   */
  $(document).on("keydown", function (e) {
    var keyCode = e.keyCode;
    switch (keyCode) {
      /*
       * Up key: Move forward
       */
      case 38:
        nodeBot.fwd();
        break;
      /*
       * Down key: Move back
       */
      case 40:
        nodeBot.back();
        break;
      /*
       * Left key: Move left
       */
      case 37:
        nodeBot.left();
        break;
      /*
       * Right key: Move right
       */
      case 39:
        nodeBot.right();
        break;
      /*
       * Space key: Stop
       */
      case 32:
        nodeBot.stop();
        break;
    }
  });
});