game.MobZone = me.Entity.extend({
/* -----
 
    constructor
 
    ------ */
    init: function(x, y, settings) {
    	this._super(me.Entity, 'init',[x, y, settings]);
    	this.level = settings.level;
    	this.mob = settings.mob;
    	this.mobcount = settings.mobcount;
		this.body.collisionType = me.collision.types.NO_OBJECT;


		// mobzones				
		var level = this.level;
		var mob = this.mob;
		var mobcount = this.mobcount;
		var mobzx = this.pos.x;
		var mobzy = this.pos.y;
		var mobzz = settings.z;
		var mobzw = this.width;
		var mobzh = this.height;
		var mobzlevel = this.level;
		for (var c=0;c<mobcount;c++){
			var newmob = {};
			var settings = {};
			var mobx = mobzx + Math.round(Math.random() * mobzw,0);
			var moby = mobzy + Math.round(Math.random() * mobzh,0);
			settings.hp = 100 * mobzlevel;
			settings.damage = mobzlevel * 10 ;
			settings.hc = mobzlevel / 20;
			settings.sensedistance = 64;
			settings.timetospawn = 100 + Math.round(Math.random() * 100,0);
			newmob = me.pool.pull(mob, mobx, moby, settings);
			me.game.world.addChild(newmob, mobzz);
			
			me.game.world.sort();
		}

    }
	
});