describe('TicTacToeBoardView', function() {
	beforeEach(function() {
		var self = this;
		
		// Mocks:
		this.movesPlayed = [];

		var node = {
			getLayer: function() { return { draw: function() {} }; },
			add: function() { }
		};
		var board = new TicTacToeBoard();
		var controller = {
			isGameOver: function() { return false; }, 
			tryPlayMoveAt: function(position) { self.movesPlayed.push(position); }, 
		};

		// Stubs:
		this.callbacks = [];
		this.groupsCreated = 0;

		Kinetic.Text = function() { };
		Kinetic.Group = function() { self.groupsCreated++; };
		Kinetic.Group.prototype.on = function(event, callback) { self.callbacks.push(callback); };
		Kinetic.Group.prototype.add = function(o) { };
		Kinetic.Rect = function() { };
		Kinetic.Line = function() { };

		this.view = new TicTacToeBoardView(node, controller, board); 
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

});
