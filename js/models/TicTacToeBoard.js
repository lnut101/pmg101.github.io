var Player = { NOUGHTS: 1, CROSSES: 2 };

function TicTacToeBoard() {
  var squares = 
    [0, 0, 0,
     0, 0, 0,
     0, 0, 0];
  this.squares = squares.map(function (each) { return new Observable(each); });
}

TicTacToeBoard.prototype.rows = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

TicTacToeBoard.prototype.hasFreeSquareAt = function(position) {
  return this.squares[position].get() === 0;
}

TicTacToeBoard.prototype.playMoveAt = function(position, player) {
  this.squares[position].set( player );
}

TicTacToeBoard.prototype._getMoveAt = function(pos) {
  return this.squares[pos].get();
}

TicTacToeBoard.prototype._getRows = function() {
  var self = this;
  return this.rows.filter(function (row) {
      return row.map(function(pos) {
          return self._getMoveAt(pos);
        }).reduce(function(acc, move) {
          return (acc===null || acc===move) ? move : false;
        }, null);
  });
}

TicTacToeBoard.prototype.getRow = function() {
  return this._getRows()[0];
}

TicTacToeBoard.prototype.hasRow = function() {
  return this._getRows(0).length > 0;
}

TicTacToeBoard.prototype.isFull = function() {
  return this.squares.filter(function (square) {
    return square.get() === 0;
  }).length === 0;
}

