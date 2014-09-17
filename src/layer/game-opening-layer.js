/*
 * opening animation
 * 
 */

var GameOpeningLayer = cc.Layer.extend({
	ctor : function() {
		this._super();
		var size = cc.director.getWinSize();
		var bg = new cc.Sprite(res.open.bg);
		bg.setPosition(cc.p(size.width/2, size.height/2));
		this.addChild(bg, 0);
		
		var team = new cc.Sprite(res.open.team);
		team.setPosition(cc.p(size.width/2, size.height/2));
		team.setScale(0.3);
		this.addChild(team, 1);
		team.opacity = 0;
		var fadeIn = cc.FadeIn.create(1.0);
		var fadeOut = cc.FadeOut.create(1.0);
		var delay = cc.delayTime(1);
		var seq = cc.Sequence.create(
				fadeIn,
				delay,
				fadeOut);
		team.runAction(seq);

		cc.audioEngine.playEffect(res.sound.opening);
	}
});