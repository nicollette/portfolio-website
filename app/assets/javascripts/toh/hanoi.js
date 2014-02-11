(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[4, 3, 2, 1, 0], [], []];
		this.startTowerIdx = null;
		this.endTowerIdx = null;
	};

  Game.prototype.isWon = function () {
    return (this.towers[2].length == 5) || (this.towers[1].length == 5);
  };

  Game.prototype.isValidMove = function () {
    var startTower = this.towers[this.startTowerIdx];
    var endTower = this.towers[this.endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function () {
    if (this.isValidMove()) {
      this.towers[this.endTowerIdx].push(this.towers[this.startTowerIdx].pop());
      this.resetTowerIndices();
			return true;
    } else {
      this.resetTowerIndices();
      return false;
    }
  };

	Game.prototype.resetTowerIndices = function() {
		this.startTowerIdx = null;
		this.endTowerIdx = null;
	}
})(this);