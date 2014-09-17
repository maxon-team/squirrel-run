var FrogGenerator =  cc.Class.extend({
	
	layer: null,
	px: 0,
	py: 0,
	frogArr: [],
	
	ctor: function(layer) {
		this.layer = layer;
	},
	
	addRandomFrog: function (platform) {
		if (! platform) return;
		this.px = platform.getLastX()-parseInt(Math.random()*180+80);
		this.py = platform.getY()+38;
		if(platform.length>=2){
			// add frog
			var frog = new Frog(this.px, this.py);
			this.layer.addRole(frog);
			this.frogArr.push(frog);
			this.layer.objects.push(frog);
		}
	},

	update: function () {
		this.removeGold();
	}
	
});