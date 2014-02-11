(function(root) {
	var Hanoi = root.Hanoi = (root.Hanoi || {});

	var TowersUI = Hanoi.TowersUI = function() {
		this.game = new Hanoi.Game();
	};

	TowersUI.prototype.render = function() {
		$("#game").empty();

		for(var i = 0; i < 3; i++) {
			$('#game').append("<div class='tower' id='" + i + "'></div>");
		}

		var disc_ids = ["xs", "small", "medium", "large", "xl"];
		var disc_heights = ["layer5", "layer4", "layer3", "layer2", "layer1"];

		this.game.towers.forEach(function(tower, t_index) {
			tower.forEach(function(disc, d_index) {
				var current_id = disc_ids[disc];
				var div = $('<div>')
				div.addClass('disc').attr('id', current_id);
				$('#' + t_index).prepend(div);
				$('#' + current_id).addClass(disc_heights[d_index]);
			})
		})
		this.bindClicks();
	};

	TowersUI.prototype.bindClicks = function() {
		$(".tower").on("click", this.handleTowerClicks.bind(this));
	};

	TowersUI.prototype.handleTowerClicks = function(event) {
		if(this.game.startTowerIdx === null) {
			this.game.startTowerIdx = event.currentTarget.id;
      this.highlightDisc(event);
    }
		else {
			this.game.endTowerIdx = event.currentTarget.id;
			this.game.move();
			this.render();
		}
		if (this.game.isWon()) {
			alert("You won!");
			this.gameOverClicks();
		}
	};
  
  TowersUI.prototype.highlightDisc = function (event) {
    disc = $(event.currentTarget).find('div').first();
    $(disc).toggleClass('selected');
  };
  
	TowersUI.prototype.gameOverClicks = function() {
		$('.tower').off("click");
	}
})(this);

$(document).ready(function() {
	var gameUI = new Hanoi.TowersUI();
	gameUI.render();
});