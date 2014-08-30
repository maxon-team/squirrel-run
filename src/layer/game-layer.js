var GameLayer = cc.Layer.extend({

	// the physics space.
	space: null,

	// the hero sprite.
	sprite: null,
	spriteSheet: null,
	
	// the recognizer.
	recognizer: null,

	// runner speed.
	runnerSpeed: 35,

	ctor: function(space) {
		this._super();
		this.space = space;
		this.initSprite();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		this.recognizer = new SimpleTouchRecognizer();
		this.scheduleUpdate();
	},

	initSprite: function() {
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		
		cc.spriteFrameCache.addSpriteFrames(res.squirrel.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.squirrel.png);
		this.addChild(this.spriteSheet);
		
		var animFrames = [];
		for(var i = 1; i<=4; i++) {
			var str = "run_0" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.15);
		this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

		this.sprite = new cc.PhysicsSprite("#run_01.png");

		var contentSize = this.sprite.getContentSize();

		var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		body.p = cc.p(80, res.physics.groundHeight + contentSize.height / 2);
		body.applyImpulse(cp.v(this.runnerSpeed, 0), cp.v(0, 0));
		this.space.addBody(body);

		var shape = new cp.BoxShape(body, contentSize.width - 14, contentSize.height);
		this.space.addShape(shape);

		this.sprite.setBody(body);

		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
	},
	
	onTouchBegan: function (touch, event) {
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		return true;
	},

	onTouchMoved: function (touch, event) {
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
	},

	onTouchEnded: function (touch, event) {
		var rtn = event.getCurrentTarget().recognizer.endPoint();
		switch (rtn) {
		case "up":
			event.getCurrentTarget().jump();
			break;
		default:
			break;
		}
	},
	
	jump: function() {
		// TODO: jump logic.
	},

	getEyeX: function () {
		return this.sprite.getPositionX() - this.runnerSpeed;
	},

	createPlatform : function(boardX, boardY, length) {
		var platform_l = cc.Sprite.create(res.platform.left);
		platform_l.setPosition(cc.p(boardX, boardY));
		platform_l.attr({
			anchorX:0,
			anchorY:0
		});
		this.addChild(platform_l);

		//loop to add length
		var platform_m = [];
		for(var i=0; i<length; i++) {
			platform_m[i] = new cc.Sprite(res.platform.middle);
			platform_m[i].attr({
				anchorX: 0,
				anchorY: 0
			});
			platform_m[i].setPosition(cc.p(platform_l.getPositionX()+platform_l.width + platform_m[i].width*i,boardY));
			this.addChild(platform_m[i]);
		}


		var platform_r = new cc.Sprite(res.platform.right);
		platform_r.attr({
			anchorX : 0,
			anchorY : 0
		});
		platform_r.setPosition(cc.p(platform_m[length-1].getPositionX()+platform_m[0].width,boardY));
		this.addChild(platform_r);
	}

});