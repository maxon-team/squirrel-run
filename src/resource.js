var res = {
	startBtn: {
		normal: 'res/start-btn-normal.png',
		selected: 'res/start-btn-selected.png'
	},
	aboutBtn: {
		normal: 'res/start-btn-normal.png',
		selected: 'res/start-btn-selected.png' 
	},
	squirrel: {
		plist: 'res/squirrel-running.plist',
		png: 'res/squirrel-running.png'
	},
	platform: {
		left: 'res/platform_l.png',
		middle: 'res/platform_m.png',
		right: 'res/platform_r.png'
	},
	background: [
	          'res/far-bg.png',
		      'res/near-bg.png'
	          ],
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}