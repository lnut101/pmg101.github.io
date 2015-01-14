describe('TicTacToePlayerView', function() {
	beforeEach(function() {
		var self = this;
		
		// Mocks:
		var node = {
			getLayer: function() { return { draw: function() {} }; },
			add: function() { }
		};
		this.currentPlayer = new Observable(Player.NOUGHTS);

		// Stubs:
		this.textShown = null;

		Kinetic.Text = function(args) { self.textShown = args.text; };
		Kinetic.Text.prototype.text = function(text) { self.textShown = text; };

		this.view = new TicTacToePlayerView(node, this.currentPlayer); 
	});

    it('initially shows noughts turn', function() {
    	this.view.render();
    	expect(this.textShown).toEqual('o');
    });

    it('when current player switches shows crosses turn', function() {
    	this.view.render();
    	this.currentPlayer.set(Player.CROSSES);
    	expect(this.textShown).toEqual('x');
    });

});
