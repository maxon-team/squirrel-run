var GameOverLayer = cc.LayerColor.extend({
	
	labelCoin: null,
	
	// constructor
	ctor:function () {
		this._super();
		this.init(cc.color(0, 0, 0, 100));
		
		var winSize = cc.director.getWinSize();
		
		var text = null;
		if (statistics.score > 10000) {
			text = '兄弟，您在逗我吗？';
		} else if (statistics.score > 1000) {
			text = "恭喜你获得了 " + statistics.score + " 的高分！"; 
		} else {
			text = '不错了，再接再厉。';
		}
		
		this.labelCoin = cc.LabelTTF.create(text, "Helvetica", 52);
		this.labelCoin.setColor(cc.color(255, 255, 255));//black color
		this.labelCoin.setPosition(cc.p(winSize.width / 2, winSize.height / 2 + 100));
		this.addChild(this.labelCoin);
		
		cc.MenuItemFont.setFontSize(30);
		var menuItemRestart = new cc.MenuItemSprite(
				new cc.Sprite(res.startBtn.normal),
				new cc.Sprite(res.startBtn.selected),
				this.onRestart, this);
		var menu = new cc.Menu(menuItemRestart);
		menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
		this.addChild(menu);
	},
	
	onRestart: function (sender) {
		cc.director.runScene(new GameScene());
		cc.director.resume();
	}
});