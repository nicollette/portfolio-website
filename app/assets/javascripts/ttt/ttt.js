(function(root) {
	var TTT = root.TTT = root.TTT || {};

  var Game = TTT.Game = function () {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  };
  Game.marks = ["orange", "blue"];

  Game.prototype.makeBoard = function () {
    return _.times(9, function (i) {
      return null;
    });
  };

	Game.prototype.placeMark = function(tile_id) {
		this.board[parseInt(tile_id)] = this.player;
	};

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
      $("#curr-player").text("blue's turn")
    } else {
      this.player = Game.marks[0];
      $("#curr-player").text("orange's turn")
    }
  };

	Game.prototype.bindClicks = function() {
		$('.tile').on('click', this.handleTClick.bind(this));
	};

	Game.prototype.handleTClick = function(event) {
    event.preventDefault();
    
		this.changeTileColor(event.currentTarget)
		$(event.currentTarget).off("click");
		this.placeMark(event.currentTarget.id);
		this.switchPlayer();

		if (this.winner()) {
			alert(this.winner() + " won!");
			this.gameOverClicks();
		} else if (this.isBoardFull()) {
      alert("Game over, no more moves left.");
      this.gameOverClicks();
    }

	};
  
  Game.prototype.isBoardFull = function () {
    var boardIsFull = true;
    this.board.forEach(function (tile) {
      if (!tile) {
        boardIsFull = false;
      }
    });
    
    return boardIsFull;
  };
  
	Game.prototype.gameOverClicks = function() {
		$('.tile').off("click");
	}

	Game.prototype.changeTileColor = function(tile) {
		if(this.player === "blue") {
			$(tile).addClass('xtile');
		}
		else {
			$(tile).addClass('otile');
		}
	};

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [0, 4, 8];
    var diagonalPositions2 = [2, 4, 6];

    var winner = null;
    _(Game.marks).each(function (mark) {
			function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos] === mark;
      	});
    	}

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.verticalWinner = function () {
    var game = this;
		var verticalPositions1 = [0, 3, 6];
		var verticalPositions2 = [1, 4, 7];
		var verticalPositions3 = [2, 5, 8];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinVertical (verticalPositions) {
        return _.every(verticalPositions, function (pos) {
          return game.board[pos] === mark;
				});
			}

      var won = _.any(
        [verticalPositions1, verticalPositions2, verticalPositions3],
        didWinVertical
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;
		var horizontalPositions1 = [0, 1, 2];
		var horizontalPositions2 = [3, 4, 5];
		var horizontalPositions3 = [6, 7, 8];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinVertical (horizontalPositions) {
        return _.every(horizontalPositions, function (pos) {
          return game.board[pos] === mark;
				});
			}

      var won = _.any(
        [horizontalPositions1, horizontalPositions2, horizontalPositions3],
        didWinVertical
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };
  
  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

 

})(this);

$(function () {
	new TTT.Game($(".wrapper")).bindClicks();
});