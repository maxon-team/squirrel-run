var GoldGenerator = cc.Class.extend({
	px : 0,
	py : 0,
	layer : null,
	goldArr: [],
	ctor : function(layer) {
		this.layer = layer;
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
			case 1 :   // rectangle shape
				var x = this.px + 130;
				var y = this.py + 150;
				
				for(var i =0; i<8; i++) {
					for(var j=0; j<4; j++) {
						var gold = new Gold(x+i*60, y+j*60);
						this.goldArr.push(gold);
						this.layer.objects.push(gold);    //collide use
						this.layer.addRole(gold);
					}
				}
				
				break;
			case 2 :   //line
				var x = this.px + 130;
				var y = this.py + 100;
				var nums = 0;
				
				if(this.layer.platformArr[this.layer.index].length == 0 ){  //one length
					nums = 4;
					x = this.px + 20;
				} else {
					nums = parseInt(Math.random()*7)+5;
				}
				
				for(var i =0; i<nums; i++) {
					var gold = new Gold(x+i*60, y);
					this.goldArr.push(gold);
					this.layer.objects.push(gold);    //collide use
					this.layer.addRole(gold);    //display
				}
			break;
			case 3 : //two lines
				var x = this.px + 130;
				var y = this.py + 100;
				var nums = 0;

				if(this.layer.platformArr[this.layer.index].length == 0 ){  //one length
					nums = 4;
					x = this.px + 20;
				} else {
					nums = parseInt(Math.random()*7)+5;
				}

				for(var i =0; i<nums; i++) {
					for(var j=0; j<2; j++) {
						var gold = new Gold(x+i*60, y+j*50);
						this.goldArr.push(gold);
						this.layer.objects.push(gold);    //collide use
						this.layer.addRole(gold);    //display
					}
				}
			break;
			case 4 : //two bridges
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
					
					dy2 = -i*i*radius+150;
					var gold = new Gold(x, y+dy2);
					this.goldArr.push(gold);
					this.layer.objects.push(gold);
					this.layer.addRole(gold);
				}
				break;
			case 5 : //triangle shape
				var x = this.px + 220;
				var y = this.py + 100;
				var dx = 0;
				var dy = 0;
				for(var i = 0; i < 6; i++) {
					dy = i*40;
					dx = 25*i;
					for(var j =0; j<6-i; j++) {
						var gold = new Gold(x+dx+j*50, y+dy);
						this.goldArr.push(gold);
						this.layer.objects.push(gold);    //collide use
						this.layer.addRole(gold);    //display
					}
				}
			break;
			case 6 : ////prismatic shape
				var x = this.px + 200;
				var y = this.py + 100;
				for(var i=0; i<7; i++){
					dy = i*35; 
					if(i<4) {
						var nums = i+1;
						var offsetLeft = (3-i)*30;
					}else{
						var nums = 7-i;
						var offsetLeft = (i-3)*30;
					}
					
					for(var j=0; j<nums; j++) {
						var gold = new Gold(x+ offsetLeft + 60*j, y+dy);
						this.goldArr.push(gold);
						this.layer.objects.push(gold);    //collide use
						this.layer.addRole(gold);    //display
					}
				}
			break;
				
			default:break;
				
		}
		
	},
	
	removeGold : function() {
		if(this.layer.goldInx>3){
			for(var i =0; i<this.goldArr.length; i++) {
				if(this.goldArr[i].getShape() != null) {
					if(this.layer.player.sprite.getPositionX() - this.goldArr[i].getX() > 800){
						this.goldArr[i].removeFromLayer();
						this.goldArr.splice(i, 1);
					}
				}
			}
		}
	},
	
	update: function () {
		var layer = this.layer;
		
		//cc.log(layer.index);
		this.layer = layer;
		var ginx = layer.goldInx;
		var chance = 0;
		layer.goldInx = layer.index;
		if(layer.goldInx > ginx){
			if(layer.platformArr[layer.index].length > 0 ){
				chance = (parseInt(Math.random()*2) == 1) ? 1 : 0;
			}else {
				chance = (layer.goldInx%2 == 0)? 1 : 0; 
			}
			if(chance) {  //consider whether to create gold
				this.px = layer.platformArr[layer.goldInx].getX();
				this.py = layer.platformArr[layer.goldInx].getY();
				var randType = parseInt(Math.random()*7);
				this.create(randType);
			}
		}
		//remove
		this.removeGold();
	}
}); 