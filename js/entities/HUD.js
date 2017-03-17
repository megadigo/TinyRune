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
        this.addChild(new game.HUD.ScoreItem(5, 5));
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

        // create the font object
        this.font = new me.BitmapFont(me.loader.getBinary("PressStart2P"), me.loader.getImage("PressStart2P"));
        this.icon = me.loader.getImage("hp");
        this.border = me.loader.getImage("border");


        // font alignment to right, bottom
        this.font.textAlign = "right";
        this.font.textBaseline = "bottom";

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
    draw : function (context) {
        context.drawImage(this.border, this.pos.x, this.pos.y);
        context.drawImage(this.icon, this.pos.x + 10, this.pos.y + 10);
        this.font.draw(context, this.playerhp, this.pos.x + x + 36, this.pos.y + y + 4);
    }
});
var borderObject = me.Renderable.extend(
{   
   // constructor
   init: function(x, y)
   {
      // call the parent constructor
      this.parent(x, y);
      // create a font
      this.border = me.loader.getImage("border")
     
   },
   // draw function
   draw : function (context, x, y)
   {
      context.drawImage(this.border, this.pos.x + x, this.pos.y + y);
   }
});

