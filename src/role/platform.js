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

		//create platform
		this.platform_l = new cc.PhysicsSprite(res.platform.left);
		
		//init physic
		/*var body = new cp.StaticBody();
		body.p = cc.p(boardX, boardY);
		this.body = body;
		this.body.applyImpulse(cp.v(35, 0), cp.v(0, 0));
		this.platform_l.setBody(body);

		this.shape = new cp.BoxShape(body,
				this.platform_l.getContentSize().width,
				this.platform_l.getContentSize().height);
				
				*/
		
		var contentSize = this.platform_l.getContentSize();
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		this.body.p = cc.p(boardX, boardY);
		
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);

		this.platform_l.setBody(this.body);
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
		layer.addChild(this.platform_l);
		this.space = space;
		this.space.addBody(this.body);
		//this.space.addStaticShape(this.shape);
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
	}
}) 