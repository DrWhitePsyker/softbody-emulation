//~~Whites softbody management suite~~//
class softBodyManager{

	
//Grid management//

static createNewGrid(width,height,initalhealth){  //create a new 2D array cube with a uniform inital value
	var grid = [] //initalise 2d Array
	for ( var i = 0; i < width; i++ ) { //step through each line
		grid[i] = [];
		for ( var j = 0; j < height; j++ ) {
			grid[i][j] = initalhealth; //fill each cell on this line.  
		}				
	}
	return grid;
}

static removeCell(grid,x,y){  //marks a cell as 'dead', effectively removing it from the polygon scan.
	grid[x][y] = []
	grid = this.gridClean(grid)
	return grid;
}


static drawGrid(grid,x,y,cellsize,context){ //draw a 2D array cube on screen at set point with cells being a set size
	var graphics = context.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x0000aa } });	
	var width = grid.length	
	var height = grid[1].length
	for ( var i = 0; i < width; i++ ) { //step through each line
		for ( var j = 0; j < height; j++ ) {
			if(grid[i][j] > 0){ //ignoring any 'dead' cells.
				graphics.fillRect(x+(cellsize*i),y+(cellsize*j),cellsize,cellsize);
				graphics.strokeRect(x+(cellsize*i),y+(cellsize*j),cellsize,cellsize);
			}
		}				
	}
}

static CalcPolygon(grid,x,y,cellsize,context){
	var width = grid.length	
	var height = grid[1].length
	var polygons = []

	var polysort = [[]]
	var polyDistCalc = 0;
	var polyShortestDist = 0;
	var polyID = 0;
	var polySwitch = false;
	
	var point = [];
	var scanpointX = 0;
	var scanpointY = 0;
	var Scanlength = 0
	var celli, cellj, Xx, Yy; 
	
	
	for ( var i = 0; i < width; i++ ) { //step through each grid cell to establish base polygons
		for ( var j = 0; j < height; j++ ) {
			celli = cellsize*i;
			cellj = cellsize*j;
			Xx = x+celli;
			Yy = y+cellj;
			if(grid[i][j] > 0){ //ignoring any 'dead' cells.
				var point = [Xx, Yy];  // point 1
				polygons.push(point);
				var point = [Xx+cellsize, Yy];  // point 2
				polygons.push(point);
				var point = [Xx, Yy+cellsize];  // point 3
				polygons.push(point);
				var point = [Xx+cellsize, Yy+cellsize];  // point 4
				polygons.push(point);
			}
		}	
	}
	
	Scanlength = polygons.length;
	for(var i = 0; i < Scanlength; i++ ){ //basic comparison scan
		if(polygons[i] != 'n'){ //check to see if current point is set to be wiped.
			scanpointX = polygons[i][0] //store point for comparison
			scanpointY = polygons[i][1] //store point for comparison
			for(var j = i+1; j < Scanlength; j++ ){
				if(scanpointX == polygons[j][0] && scanpointY == polygons[j][1]){
					polygons[j] = 'N'; //sets 'B' point to be wiped.
					polygons[i] = 'N'; //set the 'A' point to be wiped (repeats every wipe)
					break;
				}
			}
		}
	}
	
	Scanlength = polygons.length;
	for(var i = 0; i < Scanlength; i++ ){ //removal of all 'n' points
		if(polygons[i] == 'N')
		{
			polygons.splice(i,1);
			i--;
		}
	}
	
	//sorting the polygon array to be cleanly rendered.
	
	polysort[0][0] = polygons[0][0]
	polysort[0][1] = polygons[0][1]
	polygons.shift();
	var polyStep = 0;
	
	for(var i = 0; i < polygons.length; i++ ){
		if(polySwitch == false){//checking against first axis
			for(var j = 1; j < polygons.length; j++ ){
				polyDistCalc = polysort[polyStep]
				polyDistCalc -= polygons[j][0]
				polyDistCalc = Math.abs(polyDistCalc)
				if(j == 0){
					var polyShortestDist = polyDistCalc;
				}
				if(polyShortestDist < polyDistCalc){
					polyShortestDist = polyDistCalc;
					polyID = j;
				}
			}
		}
		
		if(polySwitch == true){//checking against second axis
			for(var j = 1; j < polygons.length; j++ ){
				polyDistCalc = polysort[polyStep][1] 
				polyDistCalc -= polygons[j][1]
				polyDistCalc = Math.abs(polyDistCalc)
				if(j == 0){
					var polyShortestDist = polyDistCalc;
				}
				if(polyShortestDist < polyDistCalc){
					polyShortestDist = polyDistCalc;
					polyID = j;
				}
			}
		}
		
	polysort[polyStep] = polygons[polyID]
	polysort[polyStep][1] = polygons[polyID][0]
	polygons.splice(polyID,1);
	polySwitch != polySwitch	
	polyStep++
	i--
	}
	
	return polysort;
	
	//https://stackoverflow.com/questions/13746284/merging-multiple-adjacent-rectangles-into-one-polygon
}

static drawPolygon(points,context){ //draw a 2D array cube on screen at set point with cells being a set size
	var graphics = context.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x0000aa } });
	graphics.fillStyle(0xffff00, 1);
	graphics.beginPath();
	for(var i = 0; i < points.length; i++ ){
		graphics.lineTo(points[i][0], points[i][1]);
	}
	graphics.closePath();
	graphics.fillPath();
}

static gridClean(grid){
	var width = grid.length	
	var height = grid[1].length

	var outerface = 0;
	for ( var i = 0; i < width; i++ ) { //step through each line
		for ( var j = 0; j < height; j++ ) {
			if(grid[i][j] <= 0){ //checking dead cells and its adjecents
				if(i+1 < width){
					if(grid[i+1][j] < 1)
					{
						outerface++
					}
				}
				
				if(i-1 > -1){
					if(grid[i-1][j] < 1)
					{
						outerface++;
					}
				}
				
				if(j+1 < length){
					if(grid[i][j+1] < 1)
					{
						outerface++
					}
				}
				
				if(j-1 > -1){
					if(grid[i][j-1] < 1)
					{
						outerface++
					}
				}
				
				if(outerface == 4){
					grid[i][j] = 100;
				}
			}
		}				
	}
	return grid;
}



//Impact management//
//TODO//


//Subset management//
//TODO//

}