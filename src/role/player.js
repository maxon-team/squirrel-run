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
	status: null,
	
	/**
	 * Construct a new player.
	 */
	ctor: function () {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

		cc.spriteFrameCache.addSpriteFrames(res.squirrel.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.squirrel.png);

		this.runningAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("run_0" + i + ".png");
				}), 0.15)
		));
		
		// FIXME: replace with the jump up animation.
		this.jumpUpAcion = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("run_0" + i + ".png");
				}), 0.15)
		));
		
		// FIXME: replace with the jum down animation.
		this.jumpDownAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("run_0" + i + ".png");
				}), 0.15)
		));

		this.sprite = new cc.PhysicsSprite("#run_01.png");
		this.spriteSheet.addChild(this.sprite);

		var contentSize = this.sprite.getContentSize();

		var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		body.p = cc.p(80, res.physics.groundHeight + contentSize.height / 2);
		body.applyImpulse(cp.v(this.runnerSpeed, 0), cp.v(0, 0));
		this.body = body;
		this.sprite.setBody(body);

		var shape = new cp.BoxShape(body, contentSize.width - 14, contentSize.height);
		this.shape = shape;

		this.sprite.runAction(this.runningAction);
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
		if (this.stat == 'jump up') {
			if (vel.y < 0.1) {
				this.stat = 'jump down';
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.stat == 'jump down') {
			if (vel.y == 0) {
				this.stat = 'running';
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
			this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.status = 'jumpUp';
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
		cc.log('Test Jump');
	}
}) 