var GameLayer = cc.Layer.extend({

	// the physics space.
	space: null,

	// the hero sprite.
	player: null,
	
	//platform
	platformArr: [],
	index: 0,
	rmIndex:0,
	
	// the recognizer.
	recognizer: null,

	// virtual Pos of player on the scene.
	playerPosOfScene: {
		x: 300,
		y: 200
	},

	ctor: function(space) {
		this._super();
		this.space = space;
		
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		
		// Role init.
		var player = this.player = new Player(centerPos.x, centerPos.y);
		this.addRole(player);
		
		var platform = new Platform(400,120,2);
		this.addRole(platform);
		this.platformArr.push(platform);
		
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
		
		//To Generate Platform Randomly
		var curX = this.player.sprite.getPositionX();
		//cc.log(curX + "    " + this.platformArr[this.index].getLastX()*0.8+"    "+this.index);
		//if(this.platformArr[index].getLastX())
		if(curX - this.platformArr[this.index].getLastX()*0.7 > 0) { //pass middle of platform
			
			//Get Random Data
			var gap = parseInt(Math.random()*200+120); //100~200
			var height = parseInt(Math.random()*200+50) //100~300
			var block = parseInt(Math.random()*4);
			
			this.index++;
			var platform = new Platform(this.platformArr[this.index-1].getLastX() + gap,height,block);
			this.addRole(platform);
			this.platformArr.push(platform);
			
			//remove platform which is out of scene
			if(this.index >=5){
				if(parseInt(curX - this.platformArr[this.index-5].getLastX()) > 400){
					this.platformArr[this.index-5].removeFromLayer();
					cc.log("curIndex:"+this.index+"  "+"remove: "+(this.index-5));
				}
			}
		}
		
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