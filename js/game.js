/* Globals */

var player = {};

/* game namespace */
var game = {
  /**
   * an object where to store game global data
   */
  
  data : {
    score : 0
  },

  // Run on page load.
  onload : function () {
    // Initialize the video.
    if (!me.video.init(320, 240, {wrapper : "screen", scale : "none"})) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (me.game.HASH.debug === true) {
      window.onReady(function () {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },

  // Run on game resources loaded.
  loaded : function () {
    //me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());

    // add our player entity in the entity pool
    me.pool.register("PlayerEntity", game.PlayerEntity);
    me.pool.register("Spider", game.Spider);
    me.pool.register("MobZone", game.MobZone);

    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT,  "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP, "up");
    me.input.bindKey(me.input.KEY.DOWN, "down");
    me.input.bindKey(me.input.KEY.X, "intereact");
    me.input.bindKey(me.input.KEY.Z, "action");

    // Start the game.
    me.state.change(me.state.PLAY);
  }
};