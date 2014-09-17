

var LOCATION_SCALE = 10;
var BOX_SIZE = 10;
var TIMESTEP = 1000; //miliseconds -> ~1 second
var PARTYMODE_TIMESTEP=100;
var CANVAS_WIDTH=20*BOX_SIZE;
var CANVAS_HEIGHT=20*BOX_SIZE;
var canvasElement = $("<canvas width='"+CANVAS_WIDTH+"' height='"+CANVAS_HEIGHT+"'>Sorry, Canvas is not supported with this browser.</canvas>");
var canvas = canvasElement.get(0).getContext("2d");
var partyMode = false;
var currentGen = [];

$(document).ready(function(){
	canvasElement.appendTo('body');
})

/*
	Cell "object" that stores info about a specific cell
	int x = x location of the cell
	int y = y location of the cell
	String currentState = the state of the cell. Must be either "alive" or "dead"
*/
var Cell = function(x,y,currentState){
	return {
		xPos: x,
		yPos: y,
		state: currentState,
	};
}

/*
	Randomly generates a list of tuples of locations to be alive on the board. 
*/
function randomGen()
{
	var maxXNum = CANVAS_WIDTH;
	var maxYNum = CANVAS_HEIGHT;

	var numberOfStartingSpots=Math.floor(Math.random()*maxXNum);
	var generationList= [];
	for(m =0; m < 10;m++){
		for(i =0; i<numberOfStartingSpots;i++) {
			var xLocation=Math.floor(Math.random()*maxXNum);
			var yLocation=Math.floor(Math.random()*maxYNum);
			// var xLocation=Math.floor(Math.random()*maxXNum);
			// var yLocation=Math.floor(Math.random()*maxYNum);
			var location = [xLocation,yLocation];
			generationList.push(location);
		}
	}
	return generationList;
}

/*
	Creates a 2D array of cells (the board) given a list of points of the location of alive cells

	int xLength and yLength mean that your board will have the last index of the board be at this number
	Array[[]] alivespots = the list that contains a list of indices as [x,y] of the alive spots that are within the boundaries of the given xLength and yLength

	returns Array[][] board = a 2D array that contains the cell info for the area of the generation created from the plot of living things
*/
function boardCreator(aliveSpots, xLength, yLength){
	var board = []
	var xLen = xLength;
	var yLen = yLength;
	if(xLength==0) xLen=CANVAS_WIDTH;
	if(yLength==0) yLen=CANVAS_HEIGHT;
	console.log(xLen);
	console.log(yLen);

	for (x=0;x<=xLen;x++) {
		var row = [];
		for (y=0; y<=yLen;y++) {
			row[y] = Cell(x,y,"dead");
		}
		//putting this row into the board. 
		board[x]=row;
	}
	for (i=0; i<aliveSpots.length;i++) {
		board[aliveSpots[i][0]][aliveSpots[i][1]]=Cell(aliveSpots[i][0],aliveSpots[i][1],"alive");
	}
	return board;
}

/*
	Allows user to set the starting generation. 
	Array[][] gen = the 2D array that contains the cell info for the starting generation
*/
function setStartingGen(gen){
	currentGen=gen;
}

/*
	Draws the currentGen of the world on the webpage
*/
function drawWorld(){
	//clearing the canvas
	canvas.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	canvas.stroke();

	//if party mode is active color changing and setting colors occurs here.
	if(partyMode){
		var fillColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		$('html').css("background",fillColor);
		canvas.fillStyle= fillColor;
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
		var r=Math.floor(Math.random()*256),
		g=Math.floor(Math.random()*256),
		b=Math.floor(Math.random()*256),
		a=(Math.floor(Math.random()*6)+5)/10; // rand between 0.5 and 1.0
		canvas.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";

	}

	//going through and drawing each square if it is alive. 
	for(x=0;x<currentGen.length;x++) {
		var currentRow = currentGen[x];
		for (y=0; y<currentRow.length;y++) {
			var cellement = currentRow[y];
			var xPlace = cellement.xPos*LOCATION_SCALE;
			var yPlace = cellement.yPos*LOCATION_SCALE;
			if (cellement.state === "alive") canvas.fillRect(xPlace,yPlace,BOX_SIZE,BOX_SIZE);
		}
	}
}

/*
	initalizing function for the world.
	boolean party - true if you wish for party mode to be on. 
*/
function init(party) {
	canvas = canvasElement.get(0).getContext("2d");

	//drawing world for first generation
	drawWorld();
	partyMode=party;
	if (partyMode) {		
		//adding party mode audio
		audioElement = $("<audio loop onloadeddata='var audioPlayer = this; setTimeout(function() { audioPlayer.play(); }, 0)'> <source src='http://nyanit.com/audio/nyanlooped.mp3' type='audio/mpeg'> Sorry, audio is not supported with this browser. </audio>");
		audioElement.appendTo('body');

		setInterval(updateWorld, PARTYMODE_TIMESTEP);
	} else {
		setInterval(updateWorld, TIMESTEP);
	}
}

/*
	Updates the world
*/
function updateWorld(){
	var gen = currentGen;
	currentGen = nextGenUpdate(gen);
	drawWorld();
}

/*
	Updates currentGen to the next generation. 
	[][] currGen - the 2D array that contains the cell info of the current generation
	returns nextGen - the 2D array that contains the cell info for the next generation
*/
function nextGenUpdate(currGen){
	var nextGen = [];

	//taking the column and pulling the row
	for(x=0;x<currGen.length;x++){
		var currentGenRow = currGen[x];
		var nextGenRow = [];

		//going through each cell of the row
		for(y = 0; y<currentGenRow.length;y++){
			var currentCell = currentGenRow[y];

			//getting the neighbours of the row
			var currentY = currentCell.yPos;
			var currentX = currentCell.xPos;
			var maxW = currGen[1].length;
			var maxH = currGen.length;
			
			//getting values 
			var prevY = ((currentY-1)>=0) ? (currentY-1) : (maxH-1);
			var nextY = (maxH>(currentY+1)) ? (currentY+1) :  0;
			var prevX = ((currentX-1)>=0) ? (currentX-1) :  (maxW-1);
			var nextX = (maxW>(currentX+1)) ? (currentX+1) : 0;

			//testing the locations possible to check for neighbours
			var neighbours = {
				n: currGen[prevX][currentY],
				e: currGen[currentX][nextY],
				s: currGen[nextX][currentY],
				w: currGen[currentX][prevY],
				ne: currGen[prevX][nextY],
				se: currGen[nextX][nextY],
				sw: currGen[nextX][prevY],
				nw: currGen[prevX][prevY]
			};

			//getting number of neighbours who are alive
			var aliveNeighbourCount = 0;
			if (neighbours.n.state==="alive") aliveNeighbourCount++;
			if (neighbours.e.state==="alive") aliveNeighbourCount++;
			if (neighbours.s.state==="alive") aliveNeighbourCount++;
			if (neighbours.w.state==="alive") aliveNeighbourCount++;
			if (neighbours.ne.state==="alive") aliveNeighbourCount++;
			if (neighbours.se.state==="alive") aliveNeighbourCount++;
			if (neighbours.sw.state==="alive") aliveNeighbourCount++;
			if (neighbours.nw.state==="alive") aliveNeighbourCount++;
			
			var newCellState = "";

			//getting state of new cell
			if(aliveNeighbourCount>3 || aliveNeighbourCount<2) newCellState="dead";
			else if(currentCell.state==="alive" && (aliveNeighbourCount==3 || aliveNeighbourCount==2)) newCellState="alive";
			else if(currentCell.state==="dead" && aliveNeighbourCount===3) newCellState="alive";
			else newCellState="dead";

			var newCell = Cell(currentX,currentY,newCellState);
			nextGenRow[y] = newCell;
		}	
		nextGen[x] = nextGenRow;
	}
	return nextGen;
}