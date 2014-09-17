function testNextGen(area){
	var nextGenCell = nextGenUpdate(area);
	console.log(nextGenCell);
}


/*
	creating basic + osscilating shape,by creating | of lenght 3 in middle of board first. 
	Expected return for next step is - of lenght 3 in the middle of the board.
	UNCOMMENT THE LINES BELOW TO VIEW.
*/
console.log("Testing area 1");
var testingArea1Spots = [[1,2],[2,2],[3,2]];
var testingArea1 = boardCreator(testingArea1Spots,4,4);
// testNextGen(testingArea1);
// setStartingGen(testingArea1);
// init(false);
//console.log(testingArea1);
// console.log(testingArea1[1]);

/* 
	creating basic + osscilating shape, by creating | of length 3 at left most side of board. 
	Expected return for next step is - of length 3 with two points at the left most side, and one point at the right most side.
	UNCOMMENT THE LINES BELOW TO VIEW.

*/
console.log("Testing area 2");
var testingArea2Spots = [[1,0],[2,0],[3,0]];
var testingArea2 = boardCreator(testingArea2Spots,4,4);
// testNextGen(testingArea2);
// testNextGen(testingArea2);
// setStartingGen(testingArea2);
// init(true);
// console.log(testingArea2);

/*
	creating basic + osscilating shape,by creating - of length 3 and top most area of board. 
	Expected return for next step if | of length 3 with two points at top, and one point at bottom in middle column.
	
	UNCOMMENT THE LINES BELOW TO VIEW.
*/ 
console.log("Testing area 3");
var testingArea3Spots = [[0,1],[0,2],[0,3]];
var testingArea3 = boardCreator(testingArea3Spots,4,4);
console.log(testingArea3);
setStartingGen(testingArea3);
init(false);

/*
	Initalizing new board of none specific shapes.
	
	UNCOMMENT THE LINES BELOW TO VIEW.
*/ 
// var testingArea4Spots=[[0,1],[0,2],[0,3],[1,4]];
// var testingArea4 = boardCreator(testingArea4Spots,4,4);
// console.log(testingArea4);
// testNextGen(testingArea4);



/* 
testing random board creation and initalizing it. 
Uncomment below to use the test.
*/
// console.log("Testing random area");
// var genList = randomGen();
//console.log("generation list");
//console.log(genList);
// var genBoard = boardCreator(genList,0,0);
//console.log("generation board");
//console.log(genBoard);
//setStartingGen(genBoard);

//init(false);

//testing party mode

