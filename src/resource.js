var res = {
	
	// Start button.
	startBtn: {
		normal: 'res/start-btn-normal.png',
		selected: 'res/start-btn-selected.png'
	},
	
	// About button.
	aboutBtn: {
		normal: 'res/start-btn-normal.png',
		selected: 'res/start-btn-selected.png' 
	},
	
	//menu
	menu: {
		bg: 'res/menu-bg.png',
		playBtn: 'res/play-btn.png',
		playBtnS: 'res/play-btn-s.png',
		storeBtn: 'res/store-btn.png',
		storeBtnS: 'res/store-btn-s.png',
		setBtn: 'res/set-btn.png',
		setBtnS: 'res/set-btn-s.png',
		aboutBtn: 'res/about-btn.png',
		aboutBtnS: 'res/about-btn-s.png',
		logo: 'res/game-logo.png'
	},
	
	// Squirrel animation resources.
	squirrel: {
		plist: 'res/squirrel-running.plist',
		png: 'res/squirrel-running.png'
	},
	
	panda : {
		plist: 'res/panda.plist',
		png: 'res/panda.png'
	},
	
	// Platform Related.
	platform: {
		left: 'res/platform_l.png',
		middle: 'res/platform_m.png',
		right: 'res/platform_r.png',
		plist: 'res/platform.plist',
		png: 'res/platform.png'
	},
	
	// Background
	background: [
	          'res/far-bg.png',
		      'res/near-bg.png'
	          ],
	// gold
	gold: {
		plist: 'res/gold.plist',
		png: 'res/gold.png',
	}, 
	
	//particle
	particle: {
		circle: 'res/circle_particle.plist',
		stars: 'res/stars_particle.plist'
	},
	
	//fire
	fire: {
		plist: 'res/fire.plist'
	},
	
	//game over res
	over: {
		board: 'res/score-board.png'
	},
	          
	// Sound Effect
	sound:{
		bg_mp3: 'res/sound/bg.mp3',
		jump_mp3: 'res/sound/jump.mp3',
		gold_mp3: 'res/sound/eat_gold.mp3',
		game_over: 'res/sound/game_over.mp3',
		button: 'res/sound/button.mp3',
		opening: 'res/sound/opening.mp3'
	},
	
	ui: {
		goldbar: 'res/ui/gold-bar.png',
		energybar: 'res/ui/energy-bar.png'
	},
     
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    
    physics: {
    	groundHeight: -1500
    }
};

var SpriteTag = {
	player : 0,
	gold : 1
	
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}