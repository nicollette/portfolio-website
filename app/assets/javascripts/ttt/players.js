(function (root) {
	var TTT = root.TTT = (root.TTT || {});

  var ComputerPlayer = TTT.ComputerPlayer = function () {  
  };
  
  ComputerPlayer.prototype.move = function (game, mark) {
    var node = new TTT.Node(game.board, mark);
    var possibleMoves = node.children();
    
    var winner = _.find(possibleMoves, function (child) {
      return child.isWinningNode(mark);
    });
    
    var notLoser = _.find(possibleMoves, function (child) {
      return !child.isLosingNode(mark);
    });
    
    var bestMove = winner || notLoser || possibleMoves[(Math.floor(Math.random() * possibleMoves.length))];
    
    return bestMove.prevMovePos;
  };
})(this);