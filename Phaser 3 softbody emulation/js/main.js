var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'phaser-example',
	physics: {
		default: 'matter',
		matter: {
			gravity: {
				y: 0.8
			},
			debug: true,
			debugBodyColor: 0xffffff
		}
	},
	scene: {
		create: create
	}
};

var game = new Phaser.Game(config);

function create(){
	Grid = softBodyManager.createNewGrid(5,5,100);
	softBodyManager.drawGrid(Grid,0,0,10,this)
	points = softBodyManager.CalcPolygon(Grid,0,0,25,this)
	console.log(points);
	softBodyManager.drawPolygon(points,this)
	
	for(var i = 0; i < 6; i++ ){
	softBodyManager.removeCell(Grid,Phaser.Math.Between(0,4),Phaser.Math.Between(0,4))
	softBodyManager.drawGrid(Grid,100+100*i,0,10,this)
	points = softBodyManager.CalcPolygon(Grid,0,0,25,this)
	console.log(points);
	}
	
	
	
	
}