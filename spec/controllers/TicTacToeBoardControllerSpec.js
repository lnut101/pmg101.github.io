describe('TicTacToeBoardController', function() {
	beforeEach(function() {
		// stub:
		CompositeView = function(views) { };

		this.controller = new TicTacToeBoardController(null);
	});

    it('detects game over when board full', function() {
    	var self = this;
    	expect(this.controller.isGameOver()).toBeFalsy();
    	[0,1,2,3,4,5,6,7,8].forEach(function (position) {
    		self.controller.tryPlayMoveAt(position);
    	});
    	expect(this.controller.isGameOver()).toBeTruthy();
    });

    it('detects game over when player has row', function() {
    	var self = this;
    	expect(this.controller.isGameOver()).toBeFalsy();
    	[0,1,3,5,6].forEach(function (position) {
    		self.controller.tryPlayMoveAt(position);
    	});
    	expect(this.controller.isGameOver()).toBeTruthy();
    });

    it("only allows move on empty square", function() {
    	this.controller.tryPlayMoveAt(3);
    	var hasSwappedPlayer = false;
    	this.controller.currentPlayer.onChange(function() { hasSwappedPlayer = true; });
    	this.controller.tryPlayMoveAt(3);
    	expect(hasSwappedPlayer).toBeFalsy();
    });
});
