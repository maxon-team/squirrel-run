var PlatformGenerator = cc.Class.extend({
	layer: null,
	platformArr : [],
	ctor : function(layer) {
		this.layer = layer;
	},
	update: function () {
		var layer = this.layer;
		
		//To Generate Platform Randomly
		var curX = layer.player.sprite.getPositionX();
		//platform init
		if(layer.index == 0){
			var platform = new Platform(200,200,2);
			layer.addRole(platform);
			this.platformArr.push(platform);
			layer.platformArr = this.platformArr;
		}
		//-300
		if(curX - (this.platformArr[layer.index].getX()-300) > 0) { //pass middle of platform
			//Get Random Data
			var gap = parseInt(Math.random()*300+100); //100~200
			var height = parseInt(Math.random()*200+100) //100~300
			var block = parseInt(Math.random()*4);

			layer.index++;
			var platform = new Platform(this.platformArr[layer.index-1].getLastX() + gap,height,block);
			layer.addRole(platform);
			this.platformArr.push(platform);

			layer.platformArr = this.platformArr;

			//remove platform which is out of scene 
			if(layer.index >=3){
				this.platformArr[layer.index-3].removeFromLayer();
				//cc.log("curIndex:"+layer.index+"  "+"remove: "+(layer.index-3));
			}
		}
	}
});