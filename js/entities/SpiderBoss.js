/**
 * an enemy Entity
 */
game.SpiderBoss = me.Entity.extend({
  init: function (x, y, settings) {
    // define this here instead of tiled
    settings.image = "tiny_dungeon_monsters";

    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;

    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.framewidth = settings.width = 16;
    settings.frameheight = settings.height = 16;

    // redefine the default shape (used to define path) with a shape matching the renderable
    //settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);

    this.body.setVelocity(0.5, 0.5);
    this.body.gravity = 0;

    this.renderable.addAnimation('right',[256,272]);
    this.renderable.addAnimation('down',[257,273]);
    this.renderable.addAnimation('up',[258,274]);
    this.renderable.addAnimation('left',[259,275]);
		this.renderable.addAnimation('dead',[257]);
		this.renderable.addAnimation('stand',[257]);
    this.renderable.addAnimation('stand',[257]);

    this.renderable.setCurrentAnimation("down");
  },

  /**
   * update the enemy pos
   */
  update : function (dt) {

    // update the body movement
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
    
      return false;
    }
    // Make all other objects solid
    return true;
  }
});