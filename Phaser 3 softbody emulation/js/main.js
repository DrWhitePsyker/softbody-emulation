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
	var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x0000aa } });
	
	Grid = softBodyManager.createNewGrid(5,5,100);
	softBodyManager.drawGrid(Grid,0,0,10,this,graphics)
	points = softBodyManager.CalcPolygon(Grid,0,0,25,this)
	//console.log(points);
	softBodyManager.drawPolygon(points,this,graphics)
	//createbody (this needs to create a matter physics object using the vertices. 
	
	for(var i = 0; i < 6; i++ ){
	//softBodyManager.removeCell(Grid,Phaser.Math.Between(0,4),Phaser.Math.Between(0,4))
	softBodyManager.drawGrid(Grid,100+100*i,0,10,this,graphics)
	points = softBodyManager.CalcPolygon(Grid,0,0,25,this)
	//console.log(points);
	softBodyManager.drawPolygon(points,this,graphics)
	}
	
	
}