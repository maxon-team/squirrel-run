var GoldGenerator = cc.Class.extend({
	px : 0,
	py : 0,
	layer : null,
	goldArr: [],
	ctor : function(layer) {
		//cc.log(layer.index);
		this.layer = layer;
		var ginx = layer.goldInx;
		if(layer.goldInx == 0){
			this.px = layer.platformArr[0].getX();
			this.py = layer.platformArr[0].getY();
			this.create(1);
		}
		layer.goldInx = layer.index;
		if(layer.goldInx > ginx){
			if(parseInt(Math.random()*3) == 2) {  //consider whether to create gold
				this.px = layer.platformArr[layer.goldInx].getX();
				this.py = layer.platformArr[layer.goldInx].getY();
				var randType = parseInt(Math.random()*2);
				this.create(randType);
			}
		}
	},
	
	create : function(type) {
		
		switch(type)
		{
			case 0 :   //bridge shape
				var x = this.px + 200;
				var y = this.py + 140;
				var radius = Math.random()*5+5;

				for(var i=-4; i<5; i++) {
					x += 60;
					dy = -i*i*radius+100;
					var gold = new Gold(x, y+dy);
					this.goldArr.push(gold);
					this.layer.objects.push(gold);
					this.layer.addRole(gold);
				}

				break;
			case 1 : 
				var x = this.px + 130;
				var y = this.py + 150;
				
				for(var i =0; i<8; i++) {
					for(var j=0; j<4; j++) {
						var gold = new Gold(x+i*60, y+j*60);
						this.goldArr.push(gold);
						this.layer.objects.push(gold);//collide use
						this.layer.addRole(gold);
					}
				}
				
				break;
				
		}
		
	}
}); 