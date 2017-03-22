game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

         // load a level
        me.levelDirector.loadLevel("britannia");

        // Add the Player to map
        var settings = {};
        //player settings
        settings.hp = 100;
        settings.damage = 100;
        settings.hc = 100;
        // player positions
        var px = 100;
        var py = 100;
        player = me.pool.pull("PlayerEntity", px, py, settings);
	    me.game.world.addChild(player, 6);
        
        me.game.world.sort();

        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
