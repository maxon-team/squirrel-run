/*
 * Frog Enemy Class
 * 
 */

var Frog = cc.Class.extend({
	
	// renderer related.
	spriteSheet: null,
	sprite: null,

	// physics related.
	space: null,
	body: null,
	shape: null,
	runningSpeed: -100,
	/**
	 * Construct a new player.
	 */
	ctor: function (posX, posY) {

		cc.spriteFrameCache.addSpriteFrames(res.enemy.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.enemy.png);

		this.frogAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4, 5, 6].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("enemy_frog_" + i + ".png");
				}), 0.15)
		));
		this.frogAction.retain();

		this.sprite = new cc.PhysicsSprite("#enemy_frog_1.png");
		this.sprite.setScale(0.8);
		this.spriteSheet.addChild(this.sprite);
		this.sprite.runAction(this.frogAction);
		this.sprite.retain();
		
		//get random speed
		this.runningSpeed = -parseInt(Math.random()*150 +50);
		
		//physics
		var contentSize = this.sprite.getContentSize();
		var body = new cp.Body(2, cp.momentForBox(Number.POSITIVE_INFINITY, contentSize.width, contentSize.height));
		body.applyImpulse(cp.v(this.runningSpeed, 0), cp.v(0, 0));
		body.setPos(cc.p(posX, posY));
		this.body = body;
		this.sprite.setBody(body);

		var shape = new cp.BoxShape(body, contentSize.width - 14, contentSize.height-18);
		this.shape = shape;
		this.shape.setElasticity(0);
		this.shape.setCollisionType(SpriteTag.frog);
		//Sensors only call collision callbacks, and never generate real collisions
		//this.shape.setSensor(true);
	},

	/**
	 * Called by layer initialization.
	 * 
	 */
	addToLayer: function(space, layer) {
		this.layer = layer;
		layer.addChild(this.spriteSheet);
		
		this.space = space;
		space.addBody(this.body);
		space.addShape(this.shape);
	},

	/**
	 * Called by layer cleanup.
	 */
	removeFromLayer: function () {
		this.space.removeShape(this.shape);
		this.shape = null;

		this.sprite.removeFromParent();
		this.sprite.release;
		this.sprite = null;
	},

	getX : function() {
		return this.sprite.getPositionX();
	},

	getShape : function() {
		return this.shape;
	}
});