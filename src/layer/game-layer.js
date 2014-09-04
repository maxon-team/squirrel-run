var GameLayer = cc.Layer.extend({

	// the physics space.
	space: null,

	// the hero sprite.
	player: null,
	
	//all objects
	objects: [],
	
	//platform
	platformArr: [],
	index: 0,
	
	//gold
	goldInx: 0,
	
	// the recognizer.
	recognizer: null,

	// virtual Pos of player on the scene.
	playerPosOfScene: {
		x: 230,
		y: 250
	},

	ctor: function(space) {
		this._super();
		this.space = space;
		
		//index init
		this.index = 0;
		this.goldInx = 0; 
		
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2-100, 400);
		
		// Role init.
		var player = this.player = new Player(centerPos.x, centerPos.y);
		this.addRole(player);
		
		//create platform
//		var platform = new Platform(150,50,3);
//		this.addRole(platform);
//		var platform = new Platform(1300,200,1);
//		this.addRole(platform);
//		
//		var platform = new Platform(1900,300,1);
//		this.addRole(platform);
//		
//		var platform = new Platform(2500,100,1);
//		this.addRole(platform);
		
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
		new PlatformGenerator(this);
		new GoldGenerator(this);
	},
	
	//create
	addRole: function (role) {
		role.addToLayer(this.space, this);
	},
	
	//remove
	removeObjectByShape:function (shape) {
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].getShape() == shape) {
				this.objects[i].removeFromLayer();
				this.objects.splice(i, 1);
				break;
			}
		}
	},
	
	//Tap to jump
	onTouchBegan: function (touch, event) {
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		
		event.getCurrentTarget().player.jump();

		return true;
	},

	onTouchMoved: function (touch, event) {
		event.getCurrentTarget().player.quickDown();
	},

	onTouchEnded: function (touch, event) {

	},

	getEyeX: function () {
		return this.player.sprite.getPositionX() - this.playerPosOfScene.x;
	},
	
	getEyeY: function () {
		return this.player.sprite.getPositionY() - this.playerPosOfScene.y;
	}
});