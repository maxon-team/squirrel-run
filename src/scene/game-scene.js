var GameScene = cc.Scene.extend({
	// the physic world.
	space: null,
	// the game layer.
	gameLayer: null,
	// the control layer.
	controlLayer: null,
	
	initSpace: function () {
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, -350);

		var wallBottom = new cp.SegmentShape(
				this.space.staticBody,
				// Start point
				cp.v(0, res.physics.groundHeight),
				// MAX INT:4294967295
				cp.v(4294967295, res.physics.groundHeight),
				// thickness of wall
				0);
		this.space.addStaticShape(wallBottom);

	},

	// called by schedule update.
	update: function (dt) {
		this.space.step(dt);

		var eyeX = this.gameLayer.getEyeX();
		this.controlLayer.setPosition(cc.p(-eyeX, 0));

	},

	onEnter: function() {
		this._super();

		this.initSpace();

		this.controlLayer = new cc.Layer();
		this.controlLayer.addChild(this.gameLayer = new GameLayer(this.space), 0);

		this.addChild(new GameBackgroundLayer(), 0);
		this.addChild(this.controlLayer, 0);

		this.scheduleUpdate();
	}

});