(function (root) {
	var TTT = root.TTT = (root.TTT || {});
  
  var Node = TTT.Node = function (board, mark, prevMovePos) {
    this.board = board;
    this.mark = mark;
    this.prevMovePos = prevMovePos;
  };
  
  Node.prototype.children = function () {
    var children = [];
    var node = this;

    _.times(9, function (pos) {
      if(node.board.tiles[pos] == null) {
        var newBoard = new TTT.Board(_.clone(node.board.tiles))
        newBoard.tiles[pos] = node.mark;
        var nextMark = node.mark == "orange" ? "blue" : "orange";
        children.push(new TTT.Node(newBoard, nextMark, pos));
      }
    });
    return children;
  };
  
  Node.prototype.isLosingNode = function (evaluator) {
    if (this.board.isGameOver()) {
      return this.board.isGameWon() && (this.board.winner() != evaluator);
    }
    
    var children = this.children();
    if (this.mark == evaluator) {
      return children.every(function (child) {
        return child.isLosingNode(evaluator);
      });
    } else {
      return children.some(function (child) {
        return child.isLosingNode(evaluator);
      });
    }
  };
  
  Node.prototype.isWinningNode = function (evaluator) {
    if (this.board.isGameOver()) {
      return this.board.winner() == evaluator;
    }
    
    var children = this.children();
    if (this.mark == evaluator) {
      return children.some(function (child) {
        return child.isWinningNode(evaluator);
      });
    } else {
      return children.every(function (child) {
        return child.isWinningNode(evaluator);
      });
    }
  };
})(this);