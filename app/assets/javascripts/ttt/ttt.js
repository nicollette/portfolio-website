(function(root) {
	var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function (computer) {
    this.board = new TTT.Board;
    this.players = { 
      "orange": "you",
      "blue": computer
    }
    this.turn = "orange";
  };

	Game.prototype.bindClicks = function() {
		$('.tile').on('click', this.handleTClick.bind(this));
	};

	Game.prototype.changeTileColor = function($tile) {
		if(this.turn === "blue") {
			$tile.addClass('xtile');
		}
		else {
  		$tile.addClass('otile');
    }
		$tile.off("click");
	};

	Game.prototype.gameOverClicks = function() {
		$('.tile').off("click");
	}

  Game.prototype.handleComputerMove = function ($tile) {
    this.changeTileColor($tile);
    this.placeMark($tile[0].id);
  };
  
  Game.prototype.handleGameOver = function () {
    if (this.board.winner()) {
      var winner = this.board.winner() == "orange" ? "you" : "Hal"
      if(winner === "Hal") {
        $('body').addClass('gameover');
      }
      $('#instructions').text(winner + ' won again')
    } else if (this.board.isBoardFull()) {
      $('#instructions').text('game over, no one wins');
    }
    this.gameOverClicks();
  };

	Game.prototype.handleTClick = function(event) {
    event.preventDefault();
		this.changeTileColor($(event.currentTarget));
		this.placeMark(event.currentTarget.id);
    
    if (this.board.isGameOver()) {
      this.handleGameOver();
    } else {
      this.playCompTurn();  
    }
	};
  
  Game.prototype.playCompTurn = function () {
    var computerMove = this.players[this.turn].move(this, this.turn);
    var $tile = $("#" + computerMove);
    this.handleComputerMove($tile); 
    
    if (this.board.isGameOver()) {
     this.handleGameOver(); 
    }
  };
  
	Game.prototype.placeMark = function(tile_id) {
		this.board.tiles[parseInt(tile_id)] = this.turn;
    this.switchPlayer();
	};

  Game.prototype.run = function () {
    this.bindClicks();
  };

  Game.prototype.switchPlayer = function () {
    this.turn = this.turn === this.board.marks[0] ? 
      this.board.marks[1] : this.board.marks[0];
  };
})(this);

$(function () {
	var game = new TTT.Game(new TTT.ComputerPlayer);
  game.run();
});