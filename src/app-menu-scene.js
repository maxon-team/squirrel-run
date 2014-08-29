var AppMenuScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		var layer = new AppMenuLayer();
		layer.init();
		this.addChild(layer);
	}
});
