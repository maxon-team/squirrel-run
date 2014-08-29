var GameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.addChild(new GameBackgroundLayer(), 0);
		this.addChild(new GameLayer(), 1);
	}
});