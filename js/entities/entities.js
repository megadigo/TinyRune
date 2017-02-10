/**
 * a player entity
 */
game.PlayerEntity = me.Entity.extend({
  /**
   * constructor
   */
  init : function (x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);

    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(1, 1);
    this.body.gravity = 0;

    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using all frames)
    this.renderable.addAnimation("right", [0,16]);
    this.renderable.addAnimation("left", [3,19]);
    this.renderable.addAnimation("up", [2,18]);
    this.renderable.addAnimation("down", [1,17]);
    this.renderable.addAnimation("stand", [1,17]);

    // set the standing animation as default
    this.renderable.setCurrentAnimation("stand");
  },

  /*
   * update the player pos
   */
  update : function (dt) {
    if (me.input.isKeyPressed('left')) {

      if (!this.renderable.isCurrentAnimation("left")) {
        this.renderable.setCurrentAnimation("left");
      }

      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;

    } else if (me.input.isKeyPressed('right')) {
      
      if (!this.renderable.isCurrentAnimation("right")) {
        this.renderable.setCurrentAnimation("right");
      }
      

      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;

    } else if (me.input.isKeyPressed('up')) {
      
      if (!this.renderable.isCurrentAnimation("up")) {
        this.renderable.setCurrentAnimation("up");
      }
      

      // update the entity velocity
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
      
    } else if (me.input.isKeyPressed('down')) {
      
      if (!this.renderable.isCurrentAnimation("down")) {
        this.renderable.setCurrentAnimation("down");
      }
    
      // update the entity velocity
      this.body.vel.y += this.body.accel.y * me.timer.tick;
      
    } else {
      this.body.vel.x = 0;
      this.body.vel.y = 0;
      // change to the standing animation
      this.renderable.setCurrentAnimation("stand");
    }

    // apply physics to the body (this moves the entity)
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
    // Make all other objects solid
    return true;
  }
});