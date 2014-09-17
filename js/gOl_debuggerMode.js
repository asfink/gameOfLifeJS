

var LOCATION_SCALE = 10;
var BOX_SIZE = 10;
var TIMESTEP = 1000; //miliseconds -> ~1 second
var PARTYMODE_TIMESTEP=100;
// var CANVAS_WIDTH=window.innerWidth;
// var CANVAS_HEIGHT=window.innerHeight;
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
	//var maxXNum = BOX_SIZE;
	//var maxYNum = BOX_SIZE;
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
	// if(xLength==0) xLen= 4;
	// if(yLength==0) yLen= 4;
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
		canvas.fillStyle='#'+(Math.random()*0xFFFFFF<<0).toString(16);
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
		audioElement = $("<audio loop onloadeddata='var audioPlayer = this; setTimeout(function() { audioPlayer.play(); }, 0)'> <source src='https://hackmit.org/core/static/assets/catloop.mp3' type='audio/mpeg'> Sorry, audio is not supported with this browser. </audio>");
		//adding party mode audio
		audioElement.appendTo('body');
		setInterval(updateWorld, PARTYMODE_TIMESTEP);
	} else {
		setInterval(updateWorld, TIMESTEP);
	}
}

function updateWorld(){
	//console.log("world updating");
	//console.log(currentGen);
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
	//console.log("IN nextGenUpdate");
	//console.log(currGen);
	//taking the column and pulling the row
	// console.log(currGen.length);
	for(x=0;x<currGen.length;x++){
		var currentGenRow = currGen[x];
		var nextGenRow = [];
		//going through each cell of the row
		for(y = 0; y<currentGenRow.length;y++){
			var currentCell = currentGenRow[y];
			//console.log("IN NEXT GEN UPDATE" +currentCell);
			//getting the neighbours of the row
			var currentY = currentCell.yPos;
			var currentX = currentCell.xPos;
			var maxW = currGen[1].length;
			var maxH = currGen.length;
			//debugging maxes
			// console.log("maxW is ");
			// console.log(maxW);
			// console.log("maxH  is");
			// console.log(maxH);
			// var prevY = ((currentY-1)>=0) ? (currentY-1) : (maxW-1);
			// var nextY = (maxW>(currentY+1)) ? (currentY+1) :  0;
			// var prevX = ((currentX-1)>=0) ? (currentX-1) :  (maxH-1);
			// var nextX = (maxH>(currentX+1)) ? (currentX+1) : 0;


			var prevY = ((currentY-1)>=0) ? (currentY-1) : (maxH-1);
			var nextY = (maxH>(currentY+1)) ? (currentY+1) :  0;
			var prevX = ((currentX-1)>=0) ? (currentX-1) :  (maxW-1);
			var nextX = (maxW>(currentX+1)) ? (currentX+1) : 0;
			//testing the locations possible to check for neighbours
			// console.log("currentCol is " + currentCol);
			// console.log("currentRow is " + currentRow);
			// console.log("bottomCol is " + bottomCol);
			// console.log("topCol is "+topCol);
			// console.log("rightRow is "+rightRow);
			// console.log("leftRow is "+leftRow);
			// console.log(currentX);
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

			// debugging neighbours 
			// console.log("neighbours is...");
			// console.log(neighbours);
			// neighbourslist=["n is " + neighbours.n.state,"e is " + neighbours.e.state, "s is " + neighbours.s.state,"w is " + neighbours.w.state,"ne is " + neighbours.ne.state,"se is " + neighbours.se.state, "sw is " + neighbours.sw.state, "nw is " + neighbours.nw.state];
			//console.log(neighbourslist);
			
			//getting number of neighbours who are alive
			// console.log("for cell row"+currentX+", column"+currentY);
			var aliveNeighbourCount = 0;
			if (neighbours.n.state==="alive") aliveNeighbourCount++;
			if (neighbours.e.state==="alive") aliveNeighbourCount++;
			if (neighbours.s.state==="alive") aliveNeighbourCount++;
			if (neighbours.w.state==="alive") aliveNeighbourCount++;
			if (neighbours.ne.state==="alive") aliveNeighbourCount++;
			if (neighbours.se.state==="alive") aliveNeighbourCount++;
			if (neighbours.sw.state==="alive") aliveNeighbourCount++;
			if (neighbours.nw.state==="alive") aliveNeighbourCount++;
			

			//debugging Posation of cells
			//console.log("alive neighbour count is "+ aliveNeighbourCount);
			//console.log("north cell is at "+neighbours.n.xPos.toString()+", "+neighbours.n.yPos.toString());
			//console.log("east cell is at "+neighbours.e.xPos.toString()+", "+neighbours.e.yPos.toString());
			//console.log("south cell is at "+neighbours.s.xPos.toString()+", "+neighbours.s.yPos.toString());
			//console.log("west cell is at "+neighbours.w.xPos.toString()+", "+neighbours.w.yPos.toString());
			//console.log("northeast cell is at "+neighbours.ne.xPos.toString()+", "+neighbours.ne.yPos.toString());
			//console.log("southeast cell is at "+neighbours.se.xPos.toString()+", "+neighbours.se.yPos.toString());	
			//console.log("southwest cell is at "+neighbours.sw.xPos.toString()+", "+neighbours.sw.yPos.toString());
			//console.log("North West cell is at "+neighbours.nw.xPos.toString()+", "+neighbours.nw.yPos.toString());

			var newCellState = "";

			if(aliveNeighbourCount>3 || aliveNeighbourCount<2){
				newCellState="dead";
			} else if(currentCell.state==="alive" && (aliveNeighbourCount==3 || aliveNeighbourCount==2)) {
				newCellState="alive";
				// console.log("current state of c"+currentX+currentY+" was alive and is alive and has neighbours ");
				// console.log(neighbourslist);
			} else if(currentCell.state==="dead" && aliveNeighbourCount===3) {
				newCellState="alive";
				// console.log("current state of c"+currentX+currentY+" was dead and is alive and has neighbours ");
				// console.log(neighbourslist);
			} else {
				newCellState="dead";
			}

			//debugging why I couldnt get to 0th column. 
			// if (currentX==2 && currentY==1)
			// {
			// 	console.log("current state of c"+currentX+currentY+" has neighbours ");
			// 	console.log(neighbourslist);
			// 	console.log("prev x is "+prevX);
			// 	console.log("next x is "+nextX);
			// 	console.log("prev y is "+prevY);
			// 	console.log("next y is "+nextY);
			// }
			//console.log("for cell row"+currentRow+", column"+currentCol+" the new cell state is ... "+newCellState);

			var newCell = Cell(currentX,currentY,newCellState);
			nextGenRow[y] = newCell;
		}	
		nextGen[x] = nextGenRow;
	}
	return nextGen;
}