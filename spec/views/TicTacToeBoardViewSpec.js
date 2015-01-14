describe('TicTacToeBoardView', function() {
	beforeEach(function() {
		var self = this;
		
		// Mocks:
		this.movesPlayed = [];

		var node = {
			getLayer: function() { return { draw: function() {} }; },
			add: function() { }
		};
		this.board = new TicTacToeBoard();
		var controller = {
			isGameOver: function() { return false; }, 
			tryPlayMoveAt: function(position) { self.movesPlayed.push(position); }, 
		};

		// Stubs:
		Kinetic.Rect = function() { };
		Kinetic.Line = function() { };
		this.textShown = null;
		Kinetic.Text = function(args) { self.textShown = args.text; };
		Kinetic.Text.prototype.text = function(text) { self.textShown = text; };
		this.groupsCreated = 0;
		Kinetic.Group = function() { self.groupsCreated++; };
		this.callbacks = [];
		Kinetic.Group.prototype.on = function(event, callback) { self.callbacks.push(callback); };
		Kinetic.Group.prototype.add = function(o) { };

		this.view = new TicTacToeBoardView(node, controller, this.board); 
	});

    it('renders board of nine tiles', function() {
    	this.view.render();
    	expect(this.groupsCreated).toEqual(9);
    });

    it('clicking tile plays move', function() {
    	this.view.render();
    	expect(this.callbacks.length).toBe(9);
    	this.callbacks[0]();
    	expect(this.movesPlayed).toEqual([ 0 ]);
    });

    it('when board is modified, tile shows move', function() {
    	this.view.render();
    	this.board.squares[4].set(Player.CROSSES);
    	expect(this.textShown).toEqual('x');
    });

});
