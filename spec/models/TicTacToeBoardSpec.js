describe('TicTacToeBoard', function() {
	beforeEach(function() {
		this.board = new TicTacToeBoard(); 
	});

	function playMoves(board, positions, player) {
		positions.forEach(function(position) { board.playMoveAt(position, player); });
	}

    it('finds free squares', function() {
        var self = this;
        expect([0,1,2,3,4,5,6,7,8].map(function (position) { return self.board.hasFreeSquareAt(position); }))
            .toEqual([true,true,true,true,true,true,true,true,true]);
        this.board.playMoveAt(4, Player.NOUGHTS);
        this.board.playMoveAt(8, Player.CROSSES);
        expect([0,1,2,3,4,5,6,7,8].map(function (position) { return self.board.hasFreeSquareAt(position); }))
            .toEqual([true,true,true,true,false,true,true,true,false]);
    });

    it('knows when full', function() {
        var self = this;
        expect(self.board.isFull()).toBeFalsy();
        [0,1,2,3,4,5,6,7].forEach(function (position) {
            self.board.playMoveAt(position, Player.NOUGHTS);
        });
        expect(self.board.isFull()).toBeFalsy();
        self.board.playMoveAt(8, Player.NOUGHTS);
        expect(self.board.isFull()).toBeTruthy();
    });

    it('finds any row', function() {
        var rows = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
        rows.forEach(function (row) {
            var board = new TicTacToeBoard(); 
            expect(board.hasRow()).toBeFalsy();
            playMoves(board, row, Player.CROSSES);
            expect(board.hasRow()).toBeTruthy();
            expect(board.getRow()).toEqual(row);
        });
    });
});
