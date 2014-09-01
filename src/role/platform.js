/**Platform
 * @param ctor : posX,posY,length
 * length can be 0..n
 */

var Platform = cc.Class.extend({

	// renderer related.
	spriteSheet: null,
	sprite: null,

	// physics related.
	space: null,
	body: null,
	shape_l: null,
	shape_r: null,
	shape: null,
	
	//platform
	paltform: null,
	platform_l: null,
	platform_m: null,
	platform_r: null,
	length : 0,
	leftWidth: 0,
	midWidth: 0,

	/**
	 * Construct a new player.
	 */
	ctor: function (boardX, boardY, length) {
		this.length = length;
		var leftWidth = 102;
		var midWidth = 290;
		this.leftWidth = leftWidth;
		
		boardX += leftWidth/2;  //let x goes right

		cc.spriteFrameCache.addSpriteFrames(res.platform.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.platform.png);
		
		//create platform
		this.platform_l = new cc.PhysicsSprite(cc.spriteFrameCache.getSpriteFrame("platform_l.png"));
		this.platform_r = new cc.PhysicsSprite(cc.spriteFrameCache.getSpriteFrame("platform_r.png"));//
		
		this.spriteSheet.addChild(this.platform_l);
		this.spriteSheet.addChild(this.platform_r);//
		
		var cSize_l = this.platform_l.getContentSize();
		
		var body_l = new cp.StaticBody();
		body_l.setPos(cc.p(boardX, boardY));
		this.platform_l.setBody(body_l);
		
		var offsetY = 3;
		if(length != 0) {
			var body = [];
			this.platform_m = [];
			var shape = [];
			for(var i=0; i<length; i++) {
				this.platform_m[i] = new cc.PhysicsSprite(cc.spriteFrameCache.getSpriteFrame("platform_m.png"));//
				this.spriteSheet.addChild(this.platform_m[i]);

				body[i] = new cp.StaticBody();
				body[i].setPos(cc.p(
						leftWidth/2+midWidth/2+this.platform_l.getPositionX()+midWidth*i
						,boardY));
				this.platform_m[i].setBody(body[i]);
				shape[i] = new cp.BoxShape(body[i], this.platform_m[i].width, cSize_l.height-offsetY);
				offsetY+=3;
			}
			this.shape = shape;

			var body_r = new cp.StaticBody();
			body_r.setPos(cc.p(this.platform_m[length-1].getPositionX()+midWidth/2+leftWidth/2, boardY));
			this.platform_r.setBody(body_r);//
			this.body_r = body_r;
		}else{  //no middle platform
			var body_r = new cp.StaticBody();
			body_r.setPos(cc.p(leftWidth+this.platform_l.getPositionX(), boardY));
			this.platform_r.setBody(body_r);//
			this.body_r = body_r;
		}
		
		this.shape_l = new cp.BoxShape(body_l, cSize_l.width, cSize_l.height );
		this.shape_r = new cp.BoxShape(body_r, cSize_l.width, cSize_l.height-offsetY);
		
//		var shape = new cp.SegmentShape(
//				body,
//				// Start point
//				cc.p(0, 0),
//				// MAX INT:4294967295
//				cc.p(length * contentSize.width, 0),
//				// thickness of wall
//				contentSize.height / 2);
	},

	/**
	 * Called by layer initialization.
	 * 
	 */
	addToLayer: function(space, layer) {
		this.layer = layer;
		/*for(var i=0; i<this.length+2; i++) {
			layer.addChild(this.platform[i]);
		}*/
		layer.addChild(this.spriteSheet);
		this.space = space;
		this.space.addStaticShape(this.shape_l);
		this.space.addStaticShape(this.shape_r);
		
		for(var i=0;i<this.length;i++){
			this.space.addStaticShape(this.shape[i]);
		}
	},

	/**
	 * Called by layer cleanup.
	 */
	removeFromLayer: function () {
		this.space.removeStaticShape(this.shape_l);
		this.space.removeStaticShape(this.shape_r);
		this.shape_l = null;
		this.shape_r = null;
		
		this.platform_l.removeFromParent();
		this.platform_r.removeFromParent();
		this.platform_l = null;
		this.platform_r = null;
	
		//clean middle platform
		for(var i=0; i<this.length; i++) {
			this.space.removeStaticShape(this.shape[i]);
			this.shape[i] = null;
			this.platform_m[i].removeFromParent();
			this.platform_m[i] = null;
		}	
	},
	
	getLastX : function() {
		return this.platform_r.getPositionX()+this.leftWidth/2;
	}
}) 