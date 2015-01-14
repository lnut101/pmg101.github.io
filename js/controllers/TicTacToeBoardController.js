function TicTacToeBoardController(node) {
  this.node = node;
  this.board = new TicTacToeBoard();
  this.currentPlayer = new Observable(Player.NOUGHTS);
  this.view = new CompositeView([
    new TicTacToeBoardView(node, this, this.board),
    new TicTacToePlayerView(node, this.currentPlayer)
    ]);
}

TicTacToeBoardController.prototype.render = function() {
  this.view.render();
}

TicTacToeBoardController.prototype._swapCurrentPlayer = function() {
  this.currentPlayer.set( this.currentPlayer.get()===Player.NOUGHTS ? Player.CROSSES : Player.NOUGHTS );
}

TicTacToeBoardController.prototype.isGameOver = function() {
  return this.board.hasRow() || this.board.isFull();
}

TicTacToeBoardController.prototype.tryPlayMoveAt = function(position) {
  if (!this.isGameOver() && this.board.hasFreeSquareAt(position)) {
    this.board.playMoveAt(position, this.currentPlayer.get() );
    if (!this.isGameOver()) {
      this._swapCurrentPlayer();
    }
  }
}
