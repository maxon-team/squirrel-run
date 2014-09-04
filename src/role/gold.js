/**Platform
 * @param ctor : posX,posY,length
 * length can be 0..n
 */

var Gold = cc.Class.extend({

	// renderer related.
	spriteSheet: null,
	sprite: null,

	// physics related.
	space: null,
	body: null,
	shape: null,

	/**
	 * Construct a new player.
	 */
	ctor: function (posX, posY) {

		cc.spriteFrameCache.addSpriteFrames(res.gold.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.gold.png);

		this.rotatingAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("gold" + i + ".png");
				}), 0.15)
		));
		this.rotatingAction.retain();

		this.sprite = new cc.PhysicsSprite("#gold0.png");
		this.spriteSheet.addChild(this.sprite);
		this.sprite.runAction(this.rotatingAction);
		this.sprite.retain();
		
		//physics
		var contentSize = this.sprite.getContentSize();
		var radius = 0.95 * this.sprite.getContentSize().width / 2;
		var body = new cp.StaticBody();
		body.setPos(cc.p(posX, posY));
		this.sprite.setBody(body);

		this.shape = new cp.CircleShape(body, radius, cp.vzero);
		this.shape.setCollisionType(SpriteTag.gold);
		//Sensors only call collision callbacks, and never generate real collisions
		this.shape.setSensor(true);
	},

	/**
	 * Called by layer initialization.
	 * 
	 */
	addToLayer: function(space, layer) {
		this.layer = layer;
		layer.addChild(this.spriteSheet);

		this.space = space;
		space.addShape(this.shape);
	},

	/**
	 * Called by layer cleanup.
	 */
	removeFromLayer: function () {
		this.space.removeStaticShape(this.shape);
		this.shape = null;

		this.sprite.removeFromParent();
		this.sprite.release;
		this.sprite = null;
		
	},
	
	getShape : function() {
		return this.shape;
	}
}) 