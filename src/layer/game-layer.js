var GameLayer = cc.Layer.extend({

	// the physics space.
	space: null,

	// the hero sprite.
	player: null,
	
	// the recognizer.
	recognizer: null,

	// runner speed.
	runnerSpeed: 35,

	ctor: function(space) {
		this._super();
		this.space = space;
		
		// Role init.
		var player = this.player = new Player();
		this.addRole(player);
		
		// Event handling.
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
	
	update: function (dt) {
		player.update(dt);
	},
	
	addRole: function (role) {
		role.addToLayer(this.space, this);
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
			player.jump();
			break;
		default:
			break;
		}
	},

	getEyeX: function () {
		return this.player.sprite.getPositionX() - this.runnerSpeed;
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