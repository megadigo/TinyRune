game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

         // load a level
        me.levelDirector.loadLevel("britannia");

        player = me.game.world.getChildByName("PlayerEntity")[0];
        
/*
        // mobzones
        var mobzones = me.game.world.getChildByName("MobZone");
        var mobzone = {};
		var newmob = {};
        var settings = {};
        for (var i=0;i<mobzones.length;i++){
            mobzone=mobzones[i];
            var level = mobzone.level;
            var mob = mobzone.mob;
            var mobcount = mobzone.mobcount;
            var mobzx = mobzone.pos.x;
            var mobzy = mobzone.pos.y;
			var mobzz = mobzone.z;
            var mobzw = mobzone.width;
            var mobzh = mobzone.height;
            var mobzlevel = mobzone.level;
            for (var c=0;c<mobcount;c++){
                var mobx = mobzx + Math.round(Math.random() * mobzw,0);
                var moby = mobzy + Math.round(Math.random() * mobzh,0);
                settings.hp = 100 * mobzlevel;
                settings.damage = mobzlevel * 10 ;
                settings.hc = mobzlevel / 20;
                settings.sensedistance = 64;
                settings.timetospawn = 100 + Math.round(Math.random() * 100,0);
                newmob = me.pool.pull(mob, mobx, moby, settings);
                me.game.world.addChild(newmob, mobzz);
            }
        } 
*/
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
