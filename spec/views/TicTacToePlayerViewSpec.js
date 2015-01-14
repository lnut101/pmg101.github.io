describe('TicTacToePlayerView', function() {
	beforeEach(function() {
		var self = this;
		
		this.currentPlayer = new Observable(Player.NOUGHTS);

		// Spy:
		this.redrawCount = 0;
		var node = {
			getLayer: function() { return { draw: function() { self.redrawCount++; } }; },
			add: function() { }
		};

		// Spy:
		this.textShown = null;
		Kinetic.Text = function(args) { self.textShown = args.text; };
		Kinetic.Text.prototype.text = function(text) { self.textShown = text; };

		this.view = new TicTacToePlayerView(node, this.currentPlayer); 
	});

    it('initially shows noughts turn', function() {
    	this.view.render();
    	expect(this.textShown).toEqual('o');
    });

    it('when current player switches, shows crosses turn', function() {
    	this.view.render();
    	expect(this.redrawCount).toBe(1);
    	this.currentPlayer.set(Player.CROSSES);
    	expect(this.textShown).toEqual('x');
    	expect(this.redrawCount).toBe(2);
    });

});
