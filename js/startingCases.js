// randomly choosing starting board

var randomNum=Math.floor(Math.random()*5)+1;
console.log(randomNum);

if(randomNum===1){
		var aliveSpots1 = [[3,4],[4,5],[5,3],[5,4],[5,5]];
		var area = boardCreator(aliveSpots1,7,7);
		setStartingGen(area);
		init(false);
}else if(randomNum===2){
		var aliveSpots2 = [[0,1],[0,2],[0,3]];
		var area = boardCreator(aliveSpots2,4,4);
		setStartingGen(area);
		init(false);
}else if(randomNum===3){
		var aliveSpots3 = [[0,1],[0,2],[0,3]];
		var area = boardCreator(aliveSpots3,4,4);
		setStartingGen(area);
		init(true);
}else if(randomNum===4){
		var aliveSpots4 = [[0,1],[0,2],[0,3],[3,8],[1,2],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5],[5,3],[5,4],[5,5]];
		var area = boardCreator(aliveSpots4,9,9);
		setStartingGen(area);
		init(false);
}else if(randomNum===5){
		var aliveSpots5= [[0,1],[0,2],[0,3],[3,8],[1,2],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5],[5,3],[5,4],[5,5]];
		var area = boardCreator(aliveSpots5,9,9);
		setStartingGen(area);
		init(true);
}else if(randomNum===6){
		var aliveSpots6 = [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8][9,9],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5]];
		var area = boardCreator(aliveSpots6,9,9);
		setStartingGen(area);
		init(false);
} 
else if(randomNum==7){
		var aliveSpots7 = [[13,28],[13,24],[15,23],[15,24],[15,25],[15,27],[15,28],[15,29]];
		var area = boardCreator(aliveSpots7,31,52);
		setStartingGen(area);
		init(true);
}

//Switch cases proved to be too buggy at the moment
// }
// switch(randomNum){
// 	case 1:
// 		console.log("area1");

// 		var aliveSpots1 = [[3,4],[4,5],[5,3],[5,4],[5,5]];
// 		var area = boardCreator(aliveSpots1,7,7);
// 		setStartingGen(area);
// 		init(false);
// 		break;
// 	case 2: 
// 		console.log("area2");

// 		var aliveSpots2 = [[13,28],[13,24],[15,23],[15,24],[15,25],[15,27],[15,28],[15,29]];
// 		var area = boardCreator(aliveSpots2,31,52);
// 		setStartingGen(area);
// 		init(true);
// 		break;
// 	case 3:
// 		console.log("area3");

// 		var aliveSpots3 = [[0,1],[0,2],[0,3]];
// 		var area = boardCreator(aliveSpots3,4,4);
// 		setStartingGen(area);
// 		init(false);
// 		break;
// 	case 4:
// 		console.log("area4");

// 		var aliveSpots4 = [[0,1],[0,2],[0,3]];
// 		var area = boardCreator(aliveSpots4,4,4);
// 		setStartingGen(area);
// 		init(true);
// 		break;
// 	case 5:
// 		console.log("area5");

// 		var aliveSpots5 = [[0,1],[0,2],[0,3],[3,8],[1,2],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5],[5,3],[5,4],[5,5]];
// 		var area = boardCreator(aliveSpots5,9,9);
// 		setStartingGen(area);
// 		init(false);

// 		break;
// 	case 6:
// 		console.log("area6");

// 		var aliveSpots6= [[0,1],[0,2],[0,3],[3,8],[1,2],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5],[5,3],[5,4],[5,5]];
// 		var area = boardCreator(aliveSpots6,9,9);
// 		setStartingGen(area);
// 		init(true);
// 		break;
// 	case 7:
// 		console.log("area7");

// 		var aliveSpots7 = [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8][9,9],[5,2],[9,2],[1,5],[5,7],[5,8],[5,9],[3,4],[4,5]];
// 		var area = boardCreator(aliveSpots7,9,9);
// 		setStartingGen(area);
// 		init(false);
// 		break;
// }