var AppMenuLayer = cc.Layer.extend({
	
	/**
	 * Initialize the application menu layer.
	 */
	ctor: function(){
		this._super();
	},
	
	/**
	 * Initialize the content.
	 */
	init: function(){
		this._super();

		var winsize = cc.director.getWinSize();
		var spritebg = new cc.Sprite(res.HelloWorld_png);
		
		spritebg.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 100));
		this.addChild(spritebg);

		cc.MenuItemFont.setFontSize(60);

		// create a menu and assign onPlay event callback to it
		var playBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.startBtn.normal), // normal state image
				new cc.Sprite(res.startBtn.selected), // select state image
				this.onPlay, this));
		playBtn.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 40));
		this.addChild(playBtn);
		
		var aboutBtn = new cc.Menu(new cc.MenuItemSprite(
				new cc.Sprite(res.aboutBtn.normal),
				new cc.Sprite(res.aboutBtn.selected),
				this.onAbout, this));
		aboutBtn.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 140));
		this.addChild(aboutBtn);
	},

	/**
	 * Triggered when play is clicked.
	 */
	onPlay : function () {
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