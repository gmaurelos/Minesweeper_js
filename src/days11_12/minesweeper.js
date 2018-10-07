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
		board[randomRowIndex][randomColumnIndex] = 'B';
		numberOfBombsPlaced++;

		// Have to fix the issue of placing bombs
		// on top of already existing bombs
	}
	return board;
}

const printBoard = board => {
	
	let	newboard = board.map(row => row.join(' | ')).join('\n');

	return newboard;
}

console.log('Empty board:');
console.log(printBoard(generatePlayerBoard(4,6)));
console.log('Board with Bombs:');
console.log(printBoard(generateBombBoard(4,6,6)));