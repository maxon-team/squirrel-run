var HubLayer = cc.Layer.extend({

	labelCoin: null,
	
	ctor: function () {
		this._super();
		
		var winSize = cc.director.getWinSize();
		
		this.labelCoin = new cc.LabelTTF("Coins: " + statistics.score, "Helvetica", 40);
		this.labelCoin.setColor(cc.color(0, 0, 0));//black color
		this.labelCoin.setPosition(cc.p(winSize.width-40, winSize.height - 20));
		this.labelCoin.setScale(0.4);
		this.addChild(this.labelCoin);
		
		this.scheduleUpdate();
	},
	
	update: function (dt) {
		this.labelCoin.setString(statistics.score);
	}
});