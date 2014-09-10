var GameScene = cc.Scene.extend({
	// the physic world.
	space: null,
	// the game layer.
	gameLayer: null,
	// the control layer.
	controlLayer: null,
	
	gameover:false,
	//shape to remove
	shapesToRemove: [],

	initSpace: function () {
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, -1500);

		var wallBottom = new cp.SegmentShape(
				this.space.staticBody,
				// Start point
				cp.v(0, res.physics.groundHeight),
				// MAX INT:4294967295
				cp.v(4294967295, res.physics.groundHeight),
				// thickness of wall
				0);
		this.space.addStaticShape(wallBottom);
		
		//Setup collision Handler
		this.space.addCollisionHandler(
				SpriteTag.player,
				SpriteTag.gold,
				this.collisionGold.bind(this), null, null, null);

	},
	
	collisionGold:function (arbiter, space) {
		var shapes = arbiter.getShapes();
		this.shapesToRemove.push(shapes[1]);
		statistics.coins += 1;
		//play gold music
		cc.audioEngine.playEffect(res.sound.gold_mp3);
	},

	// called by schedule update.
	update: function (dt) {
		this.space.step(dt);

		var eyeX = this.gameLayer.getEyeX(), eyeY = Math.max(this.gameLayer.getEyeY(), 0); 
		
		this.controlLayer.setPosition(cc.p(-eyeX, -eyeY/1.8));

		this.nearBgLayer.refresh(eyeX, eyeY);
		
		this.farBgLayer.refresh(eyeX / 2, eyeY);
		this.farBgLayer.setPosition(cc.p(-eyeX/2, -eyeY/5))
		
		//remove collide objects 
		for(var i = 0; i < this.shapesToRemove.length; i++) {
			var shape = this.shapesToRemove[i];
			this.gameLayer.removeObjectByShape(shape);
		}
		
		if (this.gameLayer.player.sprite.getPositionY() < -100 && !this.gameover) {
			//cc.director.pause();
			this.addChild(new GameOverLayer(), 2);
			this.gameover = true;
			//play gameover music
			cc.audioEngine.stopMusic();
			cc.audioEngine.playEffect(res.sound.game_over);
		}
	},
	
	onEnter: function() {
		this._super();

		this.initSpace();

		this.controlLayer = new cc.Layer();
		this.controlLayer.addChild(this.nearBgLayer = new GameBackgroundLayer(res.background[1]), 0);
		this.controlLayer.addChild(this.gameLayer = new GameLayer(this.space), 1);

		this.addChild(this.farBgLayer = new GameBackgroundLayer(res.background[0]))
		this.addChild(this.controlLayer, 0);
		this.addChild(new HubLayer(), 1);

		cc.director.resume();
		statistics.reset();
		
		//particle
		var particle = cc.ParticleSystem(res.particle.circle);
		particle.setPosition(800, 100);
		this.addChild(particle,100);
		//add background music
		cc.audioEngine.stopMusic();
		cc.audioEngine.playMusic(res.sound.bg_mp3, true);

		this.scheduleUpdate();
	}

});