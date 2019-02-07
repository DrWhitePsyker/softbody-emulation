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

static drawGrid(grid,x,y,cellsize,context,graphics){ //draw a 2D array cube on screen at set point with cells being a set size
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
	
	//sorting algo

	// Array of points;
	const points = []
	for(var i = 0; i < polygons.length; i++ ){
	points.push({x:polygons[i][0],y:polygons[i][1]})
	}	
	console.log(points);
	
	// Find min max to get center
	// Sort from top to bottom
	points.sort((a,b)=>a.y - b.y);

	// Get center y
	const cy = (points[0].y + points[points.length -1].y) / 2;

	// Sort from right to left
	points.sort((a,b)=>b.x - a.x);

	// Get center x
	const cx = (points[0].x + points[points.length -1].x) / 2;

	// Center point
	const center = {x:cx,y:cy};

	// Pre calculate the angles as it will be slow in the sort
	// As the points are sorted from right to left the first point
	// is the rightmost

	// Starting angle used to reference other angles
	var startAng;
	points.forEach(point => {
		var ang = Math.atan2(point.y - center.y,point.x - center.x);
		if(!startAng){ startAng = ang }
		else {
			 if(ang < startAng){  // ensure that all points are clockwise of the start point
				 ang += Math.PI * 2;
			 }
		}
		point.angle = ang; // add the angle to the point
	 });


	 // Sort clockwise;
	 points.sort((a,b)=> a.angle - b.angle);
	
	return points;
	
	//https://stackoverflow.com/questions/45660743/sort-points-in-counter-clockwise-in-javascript
	//https://stackoverflow.com/questions/13746284/merging-multiple-adjacent-rectangles-into-one-polygon
}

static drawPolygon(points,context,graphics){ //draw a 2D array cube on screen at set point with cells being a set size
	graphics.beginPath();
	graphics.moveTo(points[0][0], points[0][1]);
	for(var i = 1; i < points.length; i++ ){
		graphics.lineTo(points[i][0],points[i][1]);
	}
	graphics.closePath();
	graphics.fillPath();
}

static gridClean(grid){
	//TODO//
	//IT NEEDS TO MAKE CELLS REXIST IF THEY HAVE 4 NEIGHBOURS
}



//Impact management//
//TODO//


//Subset management//
//TODO//

}