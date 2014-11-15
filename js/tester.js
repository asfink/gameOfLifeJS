/*
*	Ali Finkelstein tester.js file for 6.170 Game of Life (project 1)
*/

/*
	draws board for an oscillating plus in middle, and tests.
	expected to start with | and turn to -

	returns the testing board created
*/
function test1(){
	var testingBoard = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}

/*
	draws board for an oscillating plus on right hand side, and tests.
	expected to start with | and turn to - and wrap around board

	returns the testing board created
*/
function test2(){
	var testingBoard = [[0,0,0,0,0],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}

/*
	draws board for an oscillating plus on right hand side, and tests.
	expected to start with | and turn to - and wrap around board

	returns the testing board created
*/
function test3(){
	var testingBoard = [[0,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}
/*
	draws board for an oscillating plus on top of board, and tests.
	expected to start with | and turn to - and wrap around board

	returns the testing board created
*/
function test4(){
	var testingBoard = [[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}

/*
	draws board for an oscillating plus on bottom of board, and tests.
	expected to start with | and turn to - and wrap around board
	
	returns the testing board created
*/
function test5(){
	var testingBoard = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}

/*
	draws board for an oscillating plus on top right hand corner of board, and tests.
	expected to start with | and turn to - and wrap around board
	returns the testing board created
*/
function test6(){
	var testingBoard = [[1,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;

}


/*
	testing static, not oscillating area.
	returns the testingBoard created
*/
function test7(){
	var testingBoard = [[0,0,0,0,0],[0,1,1,0,0],[0,1,1,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	readBoard(testingBoard);
	drawWorld();
	return testingBoard;
}

/*
	tests the random generator of the board
*/
function test8(){
	var createdBoard = randomBoardCreator();
	return createdBoard();
}
