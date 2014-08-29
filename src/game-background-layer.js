var GameBackgroundLayer = cc.Layer.extend({

	farBg: null,
	nearBg: null,

	ctor: function () {
		this._super();

		this.farBg = this._tileBg(this._createFarBg.bind(this));
		this.nearBg = this._tileBg(this._createNearBg.bind(this));
	},
	
	_tileBg: function (createMethod) {
		var winSize = cc.director.getWinSize();
		var doubleWinWidth = 2 * winSize.width;
		var tiles = [];
		var remainWidth = doubleWinWidth;
		do {
			var nearBg = createMethod(cc.p(doubleWinWidth - remainWidth, 0));
			remainWidth -= nearBg.width;
			tiles.push(nearBg);
			this.addChild(nearBg);
		} while (remainWidth > 0);
		return tiles;
	},

	_createFarBg: function (pos) {
		pos = pos || cc.p(0, 0);
		var farBg = new cc.Sprite(res.background[0]);
		farBg.setPosition(pos || cc.p(0, 0));
		farBg.attr({
			anchorX: 0,
			anchorY: 0
		});
		farBg.runAction(cc.repeatForever(cc.sequence(
				cc.moveBy(20, cc.p(-farBg.width, 0)),
				cc.moveBy(0, cc.p(farBg.width, 0))
		)));
		return farBg;
	},
	
	_createNearBg: function (pos) {
		pos = pos || cc.p(0, 0);
		var nearBg = new cc.Sprite(res.background[1]);
		nearBg.setPosition(pos);
		nearBg.attr({
			anchorX : 0,
			anchorY : 0
		});
		nearBg.runAction(cc.repeatForever(cc.sequence(
				cc.moveBy(2, cc.p(-nearBg.width, 0)),
				cc.moveBy(0, cc.p(nearBg.width, 0))
		)));
//		nearBg.setScale(0.5);
		return nearBg;
	}
});