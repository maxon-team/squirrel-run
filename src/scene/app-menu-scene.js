var AppMenuScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		var open = new GameOpeningLayer();
		this.addChild(open, 1, 1);
		setTimeout(function(){
			var layer = new AppMenuLayer();
			this.addChild(layer,1);
			//this.removeChild(1,true);
		}.bind(this),3000);
	}
});
