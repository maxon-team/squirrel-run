var GameOverLayer = cc.LayerColor.extend({
	
	labelCoin: null,
	
	// constructor
	ctor:function () {
		this._super();
		this.init(cc.color(0, 0, 0, 80));
		
		var winSize = cc.director.getWinSize();
		
//		var text = null;
//		if (statistics.score > 10000) {
//			text = '兄弟，您在逗我吗？';
//		} else if (statistics.score > 1000) {
//			text = "恭喜你获得了 " + statistics.score + " 的高分！"; 
//		} else {
//			text = '不错了，再接再厉。';
//		}
//		
//		this.labelCoin = cc.LabelTTF.create(text, "Helvetica", 52);
//		this.labelCoin.setColor(cc.color(255, 255, 255));//black color
//		this.labelCoin.setPosition(cc.p(winSize.width / 2, winSize.height / 2 + 100));
//		this.addChild(this.labelCoin);
		
//		cc.MenuItemFont.setFontSize(30);
//		var menuItemRestart = new cc.MenuItemSprite(
//				new cc.Sprite(res.startBtn.normal),
//				new cc.Sprite(res.startBtn.selected),
//				this.onRestart, this);
//		this.menu = new cc.Menu(menuItemRestart);
//		this.menu.attr({
//			x:winSize.width+250,
//			y:winSize.height/2-200,
//		});
//		this.menu.setScale(0.7);
//		this.addChild(this.menu,1);
		
		//score board
		this.board = new cc.Sprite(res.over.board);
		this.board.attr({
			x:winSize.width+250,
			y:winSize.height/2,
		});
		this.board.setScale(0.7);
		this.addChild(this.board,0);
		var actionTo = cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut());
		var actionTo1 = cc.MoveTo.create(0.7, cc.p(winSize.width/2-120, winSize.height/2-200)).easing(cc.easeBounceOut());
		this.board.runAction(actionTo);
		//this.menu.runAction(actionTo1);
		
	},
	
	onRestart: function (sender) {
		var winSize = cc.director.getWinSize();
		var actionTo = cc.MoveTo.create(0.7, cc.p(-300, winSize.height/2)).easing(cc.easeElasticInOut(0.45));
		var actionTo1 = cc.MoveTo.create(0.7, cc.p(winSize.width/2-120, winSize.height/2-200)).easing(cc.easeBounceOut());
		var action = cc.Sequence.create(
				actionTo,
				cc.CallFunc.create(this.onCallback.bind(this)));
		this.board.runAction(action);
		//this.menu.runAction(action.clone());
		//play button effect
		cc.audioEngine.playEffect(res.sound.button);
		
	},
	
	onCallback: function() {
		cc.director.runScene(new GameScene());
	}
});