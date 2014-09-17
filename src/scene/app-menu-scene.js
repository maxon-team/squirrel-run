var AppMenuScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		var layer = new AppMenuLayer();
		this.addChild(layer,1);
	}
});
