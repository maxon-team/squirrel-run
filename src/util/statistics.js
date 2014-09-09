var statistics = {

	coins: 0,
	
	get score() {
		return this.coins * 10;
	},
	
	reset: function () {
		this.coins = 0;
	}
};