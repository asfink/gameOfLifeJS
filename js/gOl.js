/*
*	Ali Finkelstein tester.js file for 6.170 Game of Life (project 1)
*/

/*
	Representation - to represent the board, I used lists of lists comprised of 1s and 0s, representing alive and dead, respectively. 
*/

var LOCATION_SCALE = 10;
var BOX_SIZE = 10;
var TIMESTEP = 1000;
var PARTYMODE_TIMESTEP=50;
var HEYYEAHYEAH_TIMESTEP=100;
var xSize=50;
var ySize=50;

var CANVAS_WIDTH=xSize*BOX_SIZE;
var CANVAS_HEIGHT=ySize*BOX_SIZE;
var DRAWING_WIDTH= xSize;
var DRAWING_HEIGHT= ySize;

var canvasElement = $("<canvas width='"+CANVAS_WIDTH+"' height='"+CANVAS_HEIGHT+"' id='canvasItem'>Sorry, Canvas is not supported with this browser.</canvas></br>");
var canvas = canvasElement.get(0).getContext("2d");
var partyMode = false;
var heyyeahyeahMode = false;
var running = false;
var currentGen = [];
var intervalCall = function(){};


//inserting the canvas to the jumbotron
$(document).ready(function(){
	var canvasLocation = $('.jumbotron');
	canvasElement.appendTo(canvasLocation);
})

/*
	function for changing to HEYYEAHYEAHYEAH MODE
*/
function toggleHeyYeahYeahMode(){
	heyyeahyeahMode = !heyyeahyeahMode;

	//getting elements for manipulation
	var heyyeahAudio=document.getElementById("heyyeahaudioPlayer"); 
	var headerItem=document.getElementById("headerItem"); 
	var infoText = document.getElementById("infoText");
	var stopButton=document.getElementById("stopEverything");  
	var randomizeButton=document.getElementById("randomButtonBar"); 
	var partyModeButton=document.getElementById("togglePartyMode"); 
	var heyyeahButton=document.getElementById("heyyeahyeahbutton"); 
	var jumboTron = document.getElementById("jumbotronItem");
	var infoText = document.getElementById("infoText");

	//activating HEYYEAYEAMODE
	if (heyyeahyeahMode && running){
		//hiding excess DOMs and changing header text
		stopButton.style.display="none";
		partyModeButton.style.display="none";
		infoText.style.display="none";
		headerItem.innerHTML="HEYYEYAAEYAAAEYAEYAA";

		//adding background image and changing drawing color
		canvas.fillStyle = "#000000";
		jumbotronItem.style.backgroundImage="url('http://d2tq98mqfjyz2l.cloudfront.net/image_cache/1336058288405886_animate.gif')";
		
		//playing audio and changing speed of steps
		heyyeahAudio.play();
		clearInterval(intervalCall);
		init();
	}

	else if(running){
		//unhiding excess DOMs and changing back header text
		stopButton.style.display="inline";
		partyModeButton.style.display="inline";
		infoText.style.display="inline";
		headerItem.innerHTML="Please Have Sound On!";

		//changing background back to non-image
		canvas.fillStyle = "#000000";
		jumbotronItem.style.backgroundImage="url('')";

		//pausing the audio and changing the speed of steps
		heyyeahAudio.pause();
		clearInterval(intervalCall);
		init();

	}
}

/*
	function for changing to Party Mode
*/
function togglePartyMode(){
	partyMode = !partyMode;

	//getting elements for manipulation
	var nyanAudio=document.getElementById("nyanaudioPlayer"); 
	var headerItem=document.getElementById("headerItem"); 
	var infoText = document.getElementById("infoText");
	var stopButton=document.getElementById("stopEverything");  
	var randomizeButton=document.getElementById("randomButtonBar"); 
	var partyModeButton=document.getElementById("togglePartyMode"); 
	var heyyeahButton=document.getElementById("heyyeahyeahbutton"); 
	var jumboTron = document.getElementById("jumbotronItem");
	var infoText = document.getElementById("infoText");

	//changing into party mode
	if (partyMode && running) {
		//executing party mode features
		nyanAudio.play();
		partyModeButton.innerHTML="NYAN NYAN NYAN";
		headerItem.innerHTML = "<img id='nyanCat' src='http://static.tumblr.com/7beb23852fe7e9ac1c7e9e224a91bf3d/vpfr6za/hhGn0cie8/tumblr_static__.gif' style='height:1em; width:auto; padding:0 0 0 0;'>";

		//hiding excess DOM items 
		stopButton.style.display="none";
		heyyeahButton.style.display="none";
		infoText.style.display="none";


		//changing the speed of steps
		clearInterval(intervalCall);
		init();
	}
	//deactivating partymode
	else if (running) { 
		//hiding party mode features 
		nyanAudio.pause();
		jumboTron.style.backgroundImage="url('')";
		headerItem.innerHTML = "Please Have Sound On!";
		document.body.style.backgroundColor="white";
		canvas.fillStyle = "#000000";
		partyModeButton.innerHTML="Toggle Party Mode<br><small>WARNING: MAY CAUSE SEIZURES</small>";

		//showing excess DOM items
		stopButton.style.display="inline";
		randomizeButton.style.display="inline";
		heyyeahButton.style.display="inline";
		infoText.style.display="inline";

		//resetting speed of steps
		clearInterval(intervalCall);
		init();
	}
}

/*
	toggle function for creating a new random board
*/
function toggleRandom(){
	randomBoardCreator();
	clearInterval(intervalCall);
	if(running) init();
	else drawWorld();
}

/*
	Allows user to set new board size 
	Function does not work
*/
function submitValue(){
	console.log("SUBMITTED");
	var valueElement = document.getElementById("sizeFormValue");
	var value = valueElement.valueAsNumber;
	console.log(value);
	if ((value <50) && (value > 2)){
		setNewSizes(value,value);
		for(x = 0; x<DRAWING_WIDTH;x++){
			var row = [];

			for (y=0; y<DRAWING_HEIGHT; y++){
				var val =Math.floor(Math.random()*2);
				if(val===0) row[y]=0;
				else row[y]= 1;
			}
			generationList[x]=row;
		}
		setStartingGen(generationList);
		var partyVal = Math.floor(Math.random()*1);
	}
	valueElement.value = 0;
}
/*
	Toggling whether the game is running or is stopped
	boolean state = true if running, false if stopped
*/
function toggleIntervals(){
	running=!running;

	//getting elements for manipulation
	var startButton=document.getElementById("startEverything");  
	var stopButton=document.getElementById("stopEverything"); 
	var partyModeButton=document.getElementById("togglePartyMode"); 
	var heyYeahButton=document.getElementById("heyyeahyeahbutton"); 
	var infoText = document.getElementById("infoText");
	var nyanAudio=document.getElementById("nyanaudioPlayer"); 
	var heyyeahAudio=document.getElementById("heyyeahaudioPlayer"); 

	if(running){
		//showing DOM buttons
		stopButton.style.display="inline";
		startButton.style.display="none";
		partyModeButton.style.display="inline";
		heyYeahButton.style.display="inline";

		//starting the steps
		headerItem.innerHTML = "Please Have Sound On!";
		init();
	}
	else{
		//hiding DOM buttons
		stopButton.style.display="none";
		startButton.style.display="inline";
		partyModeButton.style.display="none";
		heyYeahButton.style.display="none";
		document.body.style.background='white';

		//stopping the steps
		headerItem.innerHTML = "Welcome to the Game of Life!";
		clearInterval(intervalCall);
	}
}

/*
	Resizes the canvas size
	input x and y value for size of board
*/
function setNewSizes(x,y){
	var canvasElement = document.getElementById("canvasItem");
	canvasElement.width=x*LOCATION_SCALE;
	canvasElement.height=y*LOCATION_SCALE;
	xSize=x*LOCATION_SCALE;
	ySize=y*LOCATION_SCALE;
}
/*
	Reads a board and sets it as the initial generaton
	Array/LIST board = array of arrays that is comprised of 1's and 0's, where 1 means that the cell is alive, and 0 means that the cell is dead.
*/
function readBoard(board){
	generatedBoard = [];
	// var canvasElement = document.getElementById("canvasItem");
	setNewSizes(board[1].length,board.length);
	for(x =0;x<board.length;x++){
		var currentRow = board[x];
		var row = [];

		for (y=0;y<currentRow.length;y++){
			var cellValue=currentRow[y];
			if (cellValue===1) row[y]=1;
			else row[y]=0;
		}
		generatedBoard[x]=row;
	}
	setStartingGen(generatedBoard);
}

/*
	Generates a random board of 1s and 0s. 
	returns the list of lists generated by the board
*/
function randomBoardCreator(){
	var generationList = [];
	var boardSize=(Math.floor(Math.random()*4)+1)*10;
	setNewSizes(boardSize,boardSize);
	for(x = 0; x<DRAWING_WIDTH;x++){
		var row = [];

		for (y=0; y<DRAWING_HEIGHT; y++){
			var val =Math.floor(Math.random()*2);
			if(val===0) row[y]=0;
			else row[y]= 1;
		}
		generationList[x]=row;
	}
	setStartingGen(generationList);
	var partyVal = Math.floor(Math.random()*1);
	return generationList;
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
	canvas.fillStyle="#00000";

	//if party mode is active color changing and setting colors occurs here.
	if(partyMode){
		var backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		document.body.style.background=backgroundColor;
		var fillbackgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		canvas.fillStyle=fillbackgroundColor;
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
		var r=Math.floor(Math.random()*256),
		g=Math.floor(Math.random()*256),
		b=Math.floor(Math.random()*256),
		a=(Math.floor(Math.random()*6)+5)/10; // rand between 0.5 and 1.0
		canvas.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	if(heyyeahyeahMode){
		canvas.fillStyle="#FFFFFF";
	}
	//going through and drawing each square if it is alive. 
	for(x=0;x<currentGen.length;x++) {
		var currentRow = currentGen[x];
		for (y=0; y<currentRow.length;y++) {
			var cellement = currentRow[y];
			if (cellement===1){
				var xPlace = x*LOCATION_SCALE;
				var yPlace = y*LOCATION_SCALE;
				canvas.fillRect(xPlace,yPlace,BOX_SIZE,BOX_SIZE);
			}
		}
	}
}

/*
	for visualy testing the number of blocks present in the world
*/
function coverFullWorld(){
	var drawingVar = 0;
	for(x=0;x<currentGen.length;x++) {
		var currentRow = currentGen[x];
		for (y=0; y<currentRow.length;y++) {
			canvas.fillStyle='#'+(Math.random()*0xFFFFFF<<0).toString(16);
			canvas.fillRect(x*BOX_SIZE,y*BOX_SIZE,BOX_SIZE,BOX_SIZE);
			drawingVar++;
		}
	}
}

/*
	initalizing function for the world.
	boolean party - true if you wish for party mode to be on. 
*/
function init() {
	canvas = canvasElement.get(0).getContext("2d");
	//drawing world for first generation
	drawWorld();
	if (partyMode) {		
		intervalCall = setInterval(updateWorld, PARTYMODE_TIMESTEP);
	} else if (heyyeahyeahMode) {
		intervalCall = setInterval(updateWorld, HEYYEAHYEAH_TIMESTEP);
	} else {
		intervalCall = setInterval(updateWorld, TIMESTEP);
	}
}

/*
	Updates the world by updating the currentGeneration and then drawing the generation.
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
	var maxW = currGen[1].length;
	var maxH = currGen.length;
	for(x=0;x<currGen.length;x++){
		var currentGenRow = currGen[x];
		var nextGenRow = [];
		//going through each cell of the row
		for(y = 0; y<currentGenRow.length;y++){
			var currentCell = currentGenRow[y];
			//getting the neighbours of the row
			var currentY = y;
			var currentX = x;

			var prevY = ((currentY-1)>=0) ? (currentY-1) : (maxH-1);
			var nextY = (maxH>(currentY+1)) ? (currentY+1) :  0;
			var prevX = ((currentX-1)>=0) ? (currentX-1) :  (maxW-1);
			var nextX = (maxW>(currentX+1)) ? (currentX+1) : 0;

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
			if (neighbours.n===1) aliveNeighbourCount++;
			if (neighbours.e===1) aliveNeighbourCount++;
			if (neighbours.s===1) aliveNeighbourCount++;
			if (neighbours.w===1) aliveNeighbourCount++;
			if (neighbours.ne===1) aliveNeighbourCount++;
			if (neighbours.se===1) aliveNeighbourCount++;
			if (neighbours.sw===1) aliveNeighbourCount++;
			if (neighbours.nw===1) aliveNeighbourCount++;
			
			//determining state based off rules
			if(aliveNeighbourCount>3 || aliveNeighbourCount<2){
				nextGenRow[y]=0;
			} else if(currentCell===1 && (aliveNeighbourCount==3 || aliveNeighbourCount==2)) {
				nextGenRow[y]=1;
			} else if(currentCell===0 && aliveNeighbourCount===3) {
			 	nextGenRow[y]=1;
			} else {
				nextGenRow[y]=0;
			}
		}	
		nextGen[x] = nextGenRow;
	}
	return nextGen;
}
