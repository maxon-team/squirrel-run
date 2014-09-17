var HubLayer = cc.Layer.extend({

	labelCoin: null,
	
	ctor: function () {
		this._super();
		
		var winSize = cc.director.getWinSize();
		
		var goldbar = new cc.Sprite(res.ui.goldbar);
		goldbar.attr({
			x: 120,
			y: winSize.height - 40
		});
		goldbar.setScale(0.8);
		this.addChild(goldbar);
		
		var energybar = new cc.Sprite(res.ui.energybar);
		energybar.attr({
			x: 350,
			y: winSize.height - 40
		});
		energybar.setScale(0.8);
		this.addChild(energybar);
		
		this.labelCoin = new cc.LabelTTF("Coins: " + statistics.score, "Helvetica", 50);
		this.labelCoin.setColor(cc.color(255, 255, 255));//white color
		this.labelCoin.setPosition(cc.p(130, winSize.height - 43));
		this.labelCoin.setScale(0.4);
		this.addChild(this.labelCoin);
		
		this.scheduleUpdate();
	},

	update: function (dt) {
		this.labelCoin.setString(statistics.score);
	}
});