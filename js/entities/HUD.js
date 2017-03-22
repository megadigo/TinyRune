/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(10, 10));
        this.addChild(new game.HUD.Border(0, 0));
    }
});
/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        this.icon = me.loader.getImage("hp");
        
        // local copy of the global score
        this.playerhp = -1;
    },

    /**
     * update function
     */
    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.playerhp !== player.hp) {
            this.playerhp = player.hp;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        nh = this.playerhp / 20;
        for(i = 1; i <= nh; i++){
            renderer.drawImage(this.icon, this.pos.x + 10*i, this.pos.y);
         }
    }
});
/**
 * a basic HUD to border
 */
game.HUD.Border = me.Renderable.extend({
   // constructor
   init: function(x, y)
   {
      // call the parent constructor
      this._super(me.Renderable, 'init', [x, y, 0, 0]);
      this.border = me.loader.getImage("border");
     
   },
   update : function () {
        return false;
    },
   // draw function
   draw : function (context, x, y)
   {
      context.drawImage(this.border, this.pos.x, this.pos.y);
   }
});

