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
	shape: null,
	
	//platform
	paltform: null,
	platform_l: null,
	platform_m: null,
	platform_r: null,
	length : 0,

	/**
	 * Construct a new player.
	 */
	ctor: function (boardX, boardY, length) {
		this.length = length;

		this.spriteSheet = new cc.SpriteBatchNode(res.platform.left);
		
		//create platform
		this.platform_l = new cc.PhysicsSprite(res.platform.left);
		this.spriteSheet.addChild(this.platform_l);
		
		var contentSize = this.platform_l.getContentSize();

		var body = new cp.StaticBody();
		body.setPos(cc.p(boardX, boardY));
		this.platform_l.setBody(body);
		this.body = body;
		
		var winSize = cc.director.getWinSize();
//		var shape = new cp.SegmentShape(
//				body,
//				// Start point
//				cc.p(0, 0),
//				// MAX INT:4294967295
//				cc.p(length * contentSize.width, 0),
//				// thickness of wall
//				contentSize.height / 2);
		var shape = new cp.BoxShape(body, contentSize.width, contentSize.height);
		this.shape = shape;
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
		this.space.addStaticShape(this.shape);
	},

	/**
	 * Called by layer cleanup.
	 */
	removeFromLayer: function () {
		// TODO: do some cleanups.
	}
}) 