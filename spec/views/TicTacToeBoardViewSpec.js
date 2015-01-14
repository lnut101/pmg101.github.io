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
		this.newObjects = [];

		Kinetic.Text = function() { self.newObjects.push('T'); };
		Kinetic.Group = function() { self.newObjects.push('G'); };
		Kinetic.Group.prototype.on = function(event, callback) { self.callbacks.push(callback); };
		Kinetic.Group.prototype.add = function(o) { self.newObjects.push('added'); };
		Kinetic.Rect = function() { self.newObjects.push('R'); };
		Kinetic.Line = function() { self.newObjects.push('L'); };

		this.view = new TicTacToeBoardView(node, controller, board); 
	});

    it('renders board', function() {
    	this.view.render();
    	expect(this.newObjects).toEqual([ 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added', 'G', 'R', 'added', 'T', 'added' ]);
    });

    it('clicking tile plays move', function() {
    	this.view.render();
    	expect(this.callbacks.length).toBe(9);
    	this.callbacks[0]();
    	expect(this.movesPlayed).toEqual([ 0 ]);
    });

});
