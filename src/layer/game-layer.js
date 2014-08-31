var GameLayer = cc.Layer.extend({

	// the physics space.
	space: null,

	// the hero sprite.
	player: null,
	
	// the recognizer.
	recognizer: null,

	// virtual Pos of player on the scene.
	PlayerPosOfScene: 300,

	ctor: function(space) {
		this._super();
		this.space = space;
		
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		
		// Role init.
		var player = this.player = new Player(centerPos.x, centerPos.y);
		this.addRole(player);
		
		//create platform
		var platform = new Platform(150,100,3);
		this.addRole(platform);
		var platform = new Platform(1300,200,1);
		this.addRole(platform);
		
		var platform = new Platform(1900,300,1);
		this.addRole(platform);
		
		var platform = new Platform(2500,100,1);
		this.addRole(platform);
		
		//platform.removeFromLayer();
		
		//var platform = new Platform(920,100,2);
		//this.addRole(platform);
		
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
		//this.addChild(this._debugNode);
		
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
		return this.player.sprite.getPositionX()-this.PlayerPosOfScene;
	}
});