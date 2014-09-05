var PlatformGenerator = cc.Class.extend({
	layer: null,
	
	platformArr : [],
	
	ctor : function(layer) {
		this.layer = layer;
		
		var platform = new Platform(200,200,2);
		layer.addRole(platform);
		this.platformArr.push(platform);
		
		this.generate(platform.getLastX());
	},
	
	generate: function (x, y) {
		var gap = parseInt(Math.random()*300+100); //100~200
		var height = parseInt(Math.random()*200+100) //100~300
		var block = parseInt(Math.random()*4);
		
		var platform = new Platform(x + gap, height, block);
		
		this.layer.addRole(platform);
		this.platformArr.push(platform);
		
		return platform;
	},
	
	update: function () {
		var layer = this.layer;
		var i = 0;
		var winSize = cc.director.getWinSize();
		
		for (i = 0; i<this.platformArr.length; i++) {
			if (layer.getEyeX() - this.platformArr[i].getLastX() < 0) {
				break;
			} else {
				this.platformArr[i].removeFromLayer();
			}
		}

		this.platformArr.splice(0, i);
		
		var mostX = this.platformArr[this.platformArr.length - 1].getLastX();
		if (mostX < layer.getEyeX() + winSize.width) {
			return this.generate(mostX);
		}
		
		return null;
	}
});