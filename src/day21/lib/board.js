'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfRows = numberOfRows;
		this._numberOfColumns = numberOfColumns;
		this._numberOfBombs = numberOfBombs;
		this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
		this._numberOfTiles = numberOfRows * numberOfColumns;
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log('This tile has already been flipped!');
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;
			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = offset[0] + rowIndex;
				var neighborColumnIndex = offset[1] + columnIndex;
				if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles === this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var i = 0; i < this._numberOfRows; i++) {
				var row = [];
				for (var j = 0; j < this._numberOfColumns; j++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];
			var numberOfBombsPlaced = 0;

			for (var i = 0; i < numberOfRows; i++) {
				var row = [];
				for (var j = 0; j < numberOfColumns; j++) {
					row.push(null);
				}
				board.push(row);
			}

			while (numberOfBombsPlaced < numberOfBombs) {
				var randomRowIndex = this.getRandomInt(numberOfRows - 1);
				var randomColumnIndex = this.getRandomInt(numberOfColumns - 1);

				if (board[randomRowIndex][randomColumnIndex] !== 'B') {
					board[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}
			return board;
		}
	}, {
		key: 'getRandomInt',
		value: function getRandomInt(max) {
			var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var diff = max - min;
			var randomDiff = Math.floor(diff * Math.random());
			return min + randomDiff;
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}, {
		key: 'bombBoard',
		get: function get() {
			return this._bombBoard;
		}
	}]);

	return Board;
}();