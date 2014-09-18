var AppMenuLayer = cc.Layer.extend({
	
	/**
	 * Initialize the application menu layer.
	 */
	ctor: function(){
		this._super();

		var winsize = cc.director.getWinSize();
		var spritebg = new cc.Sprite(res.menu.bg);
		
		spritebg.setPosition(cc.p(0, 0));
		spritebg.attr({
			anchorX: 0,
			anchorY: 0,
			width: winsize.width,
			height: winsize.height
		});
		spritebg.setScale(0.8);
		this.addChild(spritebg);
		
		var move = cc.MoveTo.create(5, cc.p(0, -30)).easing(cc.easeElasticOut());
		spritebg.runAction(move);

		cc.MenuItemFont.setFontSize(60);
		
		//init logo
		var logo = new cc.Sprite(res.menu.logo);
		logo.setPosition(cc.p(-200, winsize.height-160));
		logo.setScale(0.8);
		this.addChild(logo);
		var actionTo = cc.MoveTo.create(1, cc.p(250, winsize.height-160)).easing(cc.easeElasticOut());
		var sequence = cc.Sequence.create(
				actionTo,
				cc.CallFunc.create(function (logo) {
					var shaking = cc.MoveTo.create(1, cc.p(250, winsize.height-250)).easing(cc.easeElasticIn());
					var shakingBack = cc.MoveTo.create(1, cc.p(250, winsize.height-140)).easing(cc.easeElasticOut());
					var shakingSeq = cc.Sequence.create(shaking, shakingBack);
					var shakingSeq = cc.Sequence.create(shaking,shakingBack);
					logo.runAction(shakingSeq.repeatForever());
				}, logo));
		logo.runAction(sequence);
		
		// play btn
		var playBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.menu.playBtn), // normal state image
				new cc.Sprite(res.menu.playBtnS), // select state image
				this.onPlay, this));
		var playBtnPosX = 200, playBtnPosY = 150;
		playBtn.setPosition(cc.p(-200, winsize.height));
		this.addChild(playBtn);
		var seq = cc.Sequence.create(
				cc.MoveTo.create(2, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeElasticInOut(0.8)),
				cc.CallFunc.create(function(playBtn){
					var shaking = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeIn(2.0));
					var shakingBack = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY-10)).easing(cc.easeOut(2.0));
					var shakingSeq = cc.Sequence.create(shaking, shakingBack);
					var shakingSeq = cc.Sequence.create(shaking, shakingBack);
					playBtn.runAction(shakingSeq.repeatForever());
				},playBtn));
		playBtn.runAction(seq);

		//storeBtn
		var storeBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.menu.storeBtn),
				new cc.Sprite(res.menu.storeBtnS),
				this.onAbout, this));
		storeBtn.setPosition(cc.p(winsize.width+200, winsize.height-220));
		this.addChild(storeBtn);
		var actionTo = cc.MoveTo.create(2, cc.p(winsize.width-200, winsize.height-220)).easing(cc.easeElasticOut());
		var seq = cc.Sequence.create(
				actionTo,
				cc.CallFunc.create(function(storeBtn){
					var shaking = cc.MoveTo.create(2, cc.p(winsize.width-205, winsize.height-220)).easing(cc.easeBackInOut());
					var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width-195, winsize.height-220)).easing(cc.easeBackInOut());
					var shakingSeq = cc.Sequence.create(shaking, shakingBack);
					storeBtn.runAction(shakingSeq.repeatForever());
				},storeBtn));
		storeBtn.runAction(seq);
		
		//setting btn
		var setBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.menu.setBtn),
				new cc.Sprite(res.menu.setBtnS),
				this.onAbout, this));
		setBtn.setPosition(cc.p(200, winsize.height-300));
		this.addChild(setBtn,1);
		var actionTo = cc.MoveTo.create(2, cc.p(winsize.width-200, winsize.height-300)).easing(cc.easeElasticOut());
		var seq = cc.Sequence.create(
				actionTo,
				cc.CallFunc.create(function(setBtn){
					var shaking = cc.MoveTo.create(2, cc.p(winsize.width-205, winsize.height-300)).easing(cc.easeBackInOut());
					var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width-195, winsize.height-300)).easing(cc.easeBackInOut());
					var shakingSeq = cc.Sequence.create(cc.DelayTime.create(0.3),shaking, shakingBack);
					setBtn.runAction(shakingSeq.repeatForever());
				},setBtn));
		setBtn.runAction(seq);
		
		//aboutBtn
		var aboutBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.menu.aboutBtn),
				new cc.Sprite(res.menu.aboutBtnS),
				this.onAbout, this));
		aboutBtn.setPosition(cc.p(winsize.width-200, winsize.height+100));
		this.addChild(aboutBtn,1);
		var actionTo = cc.MoveTo.create(2, cc.p(winsize.width-200, winsize.height-375)).easing(cc.easeElasticOut());
		var seq = cc.Sequence.create(
				actionTo,
				cc.CallFunc.create(function(aboutBtn){
					var shaking = cc.MoveTo.create(2, cc.p(winsize.width-205, winsize.height-375)).easing(cc.easeBackInOut());
					var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width-195, winsize.height-375)).easing(cc.easeBackInOut());
					var shakingSeq = cc.Sequence.create(cc.DelayTime.create(0.2), shaking, shakingBack);
					aboutBtn.runAction(shakingSeq.repeatForever());
				},aboutBtn));
		aboutBtn.runAction(seq);
		
		//add an player here
		cc.spriteFrameCache.addSpriteFrames(res.panda.plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.panda.png);
		this.runningAction = new cc.RepeatForever(new cc.Animate(
				new cc.Animation([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
					return cc.spriteFrameCache.getSpriteFrame("panda_run_0" + i + ".png");
				}), 0.08)
		));
		this.runningAction.retain();
		this.sprite = new cc.Sprite("#panda_run_01.png");
		this.sprite.setPosition(cc.p(-100,30));
		this.spriteSheet.setPosition(cc.p(-100,30));
		this.spriteSheet.addChild(this.sprite);
		this.addChild(this.spriteSheet,0);
		this.sprite.runAction(this.runningAction);
		
		var moveTo = cc.MoveTo.create(10, cc.p(winsize.width+200, 30));
		var seq = cc.Sequence.create(moveTo, cc.CallFunc(function(panda){
			panda.setPositionX(-100);
		},this.sprite));
		
		this.spriteSheet.runAction(seq.repeatForever());
		//play opening music
		cc.audioEngine.playMusic(res.sound.menu);
	},

	/**
	 * Triggered when play is clicked.
	 */
	onPlay : function () {
		cc.audioEngine.playEffect(res.sound.button);
		cc.director.runScene(new GameScene());
	},
	
	/**
	 * Triggered when option is clicked.
	 */
	onOption: function () {
		// TODO: option screen trigger.
	},
	
	/**
	 * Triggered when about is clicked.
	 */
	onAbout: function () {
		// TODO: about screen trigger.
	}
});