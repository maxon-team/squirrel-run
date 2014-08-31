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
	          
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    
    physics: {
    	groundHeight: 40
    }
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}