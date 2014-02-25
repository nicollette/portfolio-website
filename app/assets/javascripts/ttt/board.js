(function (root) {
  var TTT = root.TTT = (root.TTT || {});
  
  var Board = TTT.Board = function (tiles) {
    this.tiles = tiles || this.makeBoard();
    this.marks = ["orange", "blue"];
  }
  
  Board.prototype.diagonalWinner = function () {
    var diagonalPositions1 = [0, 4, 8];
    var diagonalPositions2 = [2, 4, 6];

    return this.isWinner([diagonalPositions1, diagonalPositions2]);
  };

  Board.prototype.horizontalWinner = function () {
		var horizontalPositions1 = [0, 1, 2];
		var horizontalPositions2 = [3, 4, 5];
		var horizontalPositions3 = [6, 7, 8];

    return this.isWinner([horizontalPositions1, horizontalPositions2, horizontalPositions3])
  };
  
  Board.prototype.isBoardFull = function () {
    return  _.every(this.tiles, function(tile) {
      return tile;
    });
  };
  
  Board.prototype.isGameOver = function () {
    return this.isGameWon() || this.isBoardFull();
  };
  
  Board.prototype.isGameWon = function () {
    return !!this.winner();
  };

  Board.prototype.isWinner = function (positions) {
    var board = this;
    var winner = null;
    _(this.marks).each(function (mark) {
       function didWin (position) {
         return _.every(position, function (pos) {
           return board.tiles[pos] === mark;
         });
       }
			
      var won = _.any(positions, didWin);
      
      if(won) {
        winner = mark;
      }
    });
    return winner;
  };
  
  Board.prototype.makeBoard = function () {
    return _.times(9, function (i) {
      return null;
    });
  };

  Board.prototype.verticalWinner = function () {
		var verticalPositions1 = [0, 3, 6];
		var verticalPositions2 = [1, 4, 7];
		var verticalPositions3 = [2, 5, 8];

    return this.isWinner([verticalPositions1, verticalPositions2, verticalPositions3])
  };

  Board.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };
})(this);