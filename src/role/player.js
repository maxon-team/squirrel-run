var Player = cc.Class.extend({
	
	// renderer related.
	spriteSheet: null,
	sprite: null,
	
	// physics related.
	space: null,
	body: null,
	shape: null,
	
	// animations.
	runningAction: null,
	jumpUpAction: null,
	jumpDownAction: null,
	
	// the status.
	status: 'running',
	
	// player speed.
	runningSpeed: 2800,
	
	/**
	 * Construct a new player.
	 */
	ctor: function (x, y) {
		cc.spriteFrameCache.addSpriteFrames(res.panda.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.panda.png);

		this.runningAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("panda_run_0" + i + ".png");
				}), 0.06)
		));
		this.runningAction.retain();
		
		this.jumpUpAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("panda_jump_0" + i + ".png");
				}), 0.08)
		));	
		this.jumpUpAction.retain();

		this.jumpDownAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("panda_roll_0" + i + ".png");
				}), 0.08)
		));
		this.jumpDownAction.retain();

		this.sprite = new cc.PhysicsSprite("#panda_run_01.png");
		this.spriteSheet.addChild(this.sprite);

		var contentSize = this.sprite.getContentSize();

		var body = new cp.Body(10, cp.momentForBox(Number.POSITIVE_INFINITY, contentSize.width, contentSize.height));
		body.setPos(cc.p(x, y));
		body.applyImpulse(cp.v(this.runningSpeed, 0), cp.v(0, 0));
		this.body = body;
		this.sprite.setBody(body);

		var shape = new cp.BoxShape(body, contentSize.width - 14, contentSize.height);
		this.shape = shape;

		this.sprite.runAction(this.runningAction);
		this.status = "running";
	},
	
	/**
	 * Called by layer initialization.
	 * 
	 * @param space the physics space.
	 * @param layer the game layer.
	 */
	addToLayer: function(space, layer) {
		this.layer = layer;
		layer.addChild(this.spriteSheet);

		this.space = space;
		space.addBody(this.body);
		space.addShape(this.shape);

	},
	
	/**
	 * Called by layer cleanup.
	 */
	removeFromLayer: function () {
		// TODO: do some cleanups.
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
	},
	
	/**
	 * Called by layer update.
	 * 
	 * @param dt delta time.
	 */
	update: function (dt) {
		var vel = this.body.getVel();
		if (this.status == 'jumpUp') {
			if (vel.y < 0.1) {
				this.status = 'jumpDown';
				this.sprite.stopAllActions();
				//this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.status == 'jumpDown') {
			if (vel.y == 0) {
				this.status = 'running';
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
	}, 
	
	/**
	 * Trigger a jump action.
	 */
	jump: function () {
		if (this.status == 'running') {
			//Jump music
			cc.audioEngine.playEffect(res.sound.jump_mp3);
			
			this.body.applyImpulse(cp.v(0, 4000), cp.v(0, 0));
			this.status = 'jumpUp';
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	}
}) 