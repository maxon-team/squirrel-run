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
		
		cc.MenuItemFont.setFontSize(30);
		
		//score board
		this.board = new cc.Sprite(res.over.board);
		this.board.attr({
			x:winSize.width/2,
			y:winSize.height+100,
		});
		this.board.setScale(0.7);
		this.addChild(this.board,0);
		var actionTo = cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2)).easing(cc.easeBounceOut());
//		var actionTo1 = cc.MoveTo.create(0.7, cc.p(winSize.width/2-120, winSize.height/2-200)).easing(cc.easeBounceOut());
		this.board.runAction(actionTo);
//		this.menu.runAction(actionTo1);
		
		this.labelCoins = cc.LabelTTF.create(statistics.score, "Helvetica", 52);
		this.labelCoins.setColor(cc.color(255, 255, 255));
		this.labelCoins.setPosition(cc.p(winSize.width / 2 + 70, winSize.height));
		this.labelCoins.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width / 2 + 70, winSize.height/2+65)).easing(cc.easeBounceOut()));
		this.addChild(this.labelCoins);
		
		this.labelLength = cc.LabelTTF.create(statistics.length, "Helvetica", 52);
		this.labelLength.setColor(cc.color(255, 255, 255));
		this.labelLength.setPosition(cc.p(winSize.width / 2 + 70, winSize.height));
		this.labelLength.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width / 2 + 70, winSize.height/2)).easing(cc.easeBounceOut()));
		this.addChild(this.labelLength);
		
		this.restartBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.menu.startBtn),
				new cc.Sprite(res.menu.startBtnS),
				this.onRestart, this));
//		this.restartBtn.setPosition(cc.p(winSize.width / 2, winSize.height/2-300));
		this.restartBtn.setPosition(cc.p(winSize.width / 2, 60));
		this.restartBtn.attr({
			anchorX: 0,
			anchorY: 0,
			x: winSize.width / 2,
			y: winSize.height
		});
		this.restartBtn.setScale(0.7);
		this.restartBtn.runAction(cc.MoveTo.create(0.7, cc.p(winSize.width/2, winSize.height/2-120)).easing(cc.easeBounceOut()));
		this.addChild(this.restartBtn, 1);
	},
	
	onRestart: function (sender) {
		var winSize = cc.director.getWinSize();
//		var actionTo1 = cc.MoveTo.create(0.7, cc.p(winSize.width/2-120, winSize.height/2-200)).easing(cc.easeBounceOut());
		var action = cc.Sequence.create(
				cc.MoveTo.create(0.7, cc.p(-300, winSize.height/2)).easing(cc.easeElasticInOut(0.45)),
				cc.CallFunc.create(this.onCallback.bind(this)));
		this.board.runAction(action);
		this.restartBtn.runAction(cc.Sequence.create(
				cc.MoveTo.create(0.7, cc.p(-300, winSize.height/2-120)).easing(cc.easeElasticInOut(0.45)),
				cc.CallFunc.create(this.onCallback.bind(this))));
		//play button effect
		cc.audioEngine.playEffect(res.sound.button);
		
	},
	
	onCallback: function() {
		cc.director.runScene(new GameScene());
	}
});