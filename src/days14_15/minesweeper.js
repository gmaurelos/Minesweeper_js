const generatePlayerBoard = (numberOfRows , numberOfColumns) =>{
	var board =[];
	for (var i = 0; i < numberOfRows; i++) {
		var row = [];
		for (var j =0; j < numberOfColumns; j++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
}

const getRandomInt = (max,min = 0) =>{
	let diff = max-min;
	let randomDiff = Math.floor(diff *Math.random());
	return min+randomDiff;
}	
	
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) =>{
	var board =[];
	var numberOfBombsPlaced =0;
	
	for (var i = 0; i < numberOfRows; i++) {
		var row = [];
		for (var j =0; j < numberOfColumns; j++) {
			row.push(null);
		}
		board.push(row);
	}

	while (numberOfBombsPlaced<numberOfBombs){
		let randomRowIndex =getRandomInt(numberOfRows-1);
		let randomColumnIndex = getRandomInt(numberOfColumns-1);
	
		if(board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}
	return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex)=>{
	const neighborOffsets = [
			[-1,-1],
			[-1,0],
			[-1,1],
			[0,-1],
			[0,1],
			[1,-1],
			[1,0],
			[1,1]];
	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;
	neighborOffsets.forEach(offset=>{
		let neighborRowIndex = offset[0] + rowIndex;
		let neighborColumnIndex = offset[1] + columnIndex;
		if(neighborRowIndex>=0 && neighborRowIndex <numberOfRows && neighborColumnIndex>=0 && neighborColumnIndex <numberOfColumns){
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	});
	return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>{
	if(playerBoard[rowIndex][columnIndex] !== ' '){
		console.log('This tile has already been flipped!');
		return;
	} else if(bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}

}

const printBoard = board => {
	
	let	newboard = board.map(row => row.join(' | ')).join('\n');

	return newboard;
}
pl_board = generatePlayerBoard(4,6);
bm_board = generateBombBoard(4,6,6);
console.log('Board with Bombs:');
console.log(printBoard(bm_board));
console.log('Player board:');
console.log(printBoard(pl_board));
console.log('Flipping 0,0');
flipTile(pl_board,bm_board,0,0);
console.log(printBoard(pl_board));
console.log('Flipping 2,3');
flipTile(pl_board,bm_board,2,3);
console.log(printBoard(pl_board));