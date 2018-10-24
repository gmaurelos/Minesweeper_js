export class Board {
	constructor(numberOfRows, numberOfColumns,numberOfBombs) {
		this._numberOfRows = numberOfRows;
		this._numberOfColumns = numberOfColumns;
		this._numberOfBombs = numberOfBombs;
		this._playerBoard = this.generatePlayerBoard(numberOfRows,numberOfColumns);
		this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
		this._numberOfTiles = numberOfRows*numberOfColumns;
	}


	get playerBoard() {
		return this._playerBoard;
	}

	get bombBoard() {
		return this._bombBoard;
	}

	flipTile(rowIndex, columnIndex){
		if(this._playerBoard[rowIndex][columnIndex] !== ' '){
			console.log('This tile has already been flipped!');
			return;
		} else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}
		this._numberOfTiles--;
	}

	getNumberOfNeighborBombs(rowIndex, columnIndex){
		const neighborOffsets = [
				[-1,-1],
				[-1,0],
				[-1,1],
				[0,-1],
				[0,1],
				[1,-1],
				[1,0],
				[1,1]];
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;
		neighborOffsets.forEach(offset=>{
			let neighborRowIndex = offset[0] + rowIndex;
			let neighborColumnIndex = offset[1] + columnIndex;
			if(neighborRowIndex>=0 && neighborRowIndex <numberOfRows && neighborColumnIndex>=0 && neighborColumnIndex <numberOfColumns){
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});
		return numberOfBombs;
	}

	hasSafeTiles(){
		return this._numberOfTiles === this._numberOfBombs;
	}
	print (){
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	}

	generatePlayerBoard(numberOfRows,numberOfColumns) {
		var board =[];
		for (var i = 0; i < this._numberOfRows; i++) {
			var row = [];
			for (var j =0; j < this._numberOfColumns; j++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}

	generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
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
			let randomRowIndex =this.getRandomInt(numberOfRows-1);
			let randomColumnIndex = this.getRandomInt(numberOfColumns-1);
		
			if(board[randomRowIndex][randomColumnIndex] !== 'B') {
				board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced++;
			}
		}
		return board;
	}


	getRandomInt(max,min = 0){
		let diff = max-min;
		let randomDiff = Math.floor(diff *Math.random());
		return min+randomDiff;
	}
}
