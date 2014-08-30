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
		
		//create platform
		var platform = new Platform(400,100,0);
		this.addRole(platform);
		
		var platform = new Platform(200,200,1);
		this.addRole(platform);
		
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
		
		//physic Debug
		this._debugNode = cc.PhysicsDebugNode.create(this.space);
		this._debugNode.setVisible(true);
		this.addChild(this._debugNode);
		
	},
	
	update: function (dt) {
		this.player.update(dt);
	},
	
	addRole: function (role) {
		role.addToLayer(this.space, this);
	},
	
	//Tap to jump
	onTouchBegan: function (touch, event) {
		//var pos = touch.getLocation();
		//event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		event.getCurrentTarget().player.jump();
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
			event.getCurrentTarget().player.jump();
			break;
		default:
			break;
		}
	},

	getEyeX: function () {
		return this.player.sprite.getPositionX() - this.runnerSpeed;
	}
});