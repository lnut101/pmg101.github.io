var TicTacToePlayerView = (function() {
  function TicTacToePlayerView(node, currentPlayer) {
    this.node = node;
    this.currentPlayer = currentPlayer;
  }

  function _asMove(player) {
    return player==1 ? 'o' : player==2 ? 'x' : '';
  }

  TicTacToePlayerView.prototype._getCurrentMove = function() {
    return _asMove(this.currentPlayer.get());
  };

  TicTacToePlayerView.prototype.render = function() {
    var self = this;
    this.node.add(new Kinetic.Text({x: 50, y: 210, text: 'Turn: ', fontSize:20,fill:'black'}));
    var move = new Kinetic.Text({x: 100, y: 190, text: self._getCurrentMove(), fontSize:50,fill:'grey'});
    this.node.add(move);
    this.currentPlayer.onChange(function() {
      move.text(self._getCurrentMove());
      self.node.getLayer().draw();
    });

    this.node.getLayer().draw();
  }

  return TicTacToePlayerView;
})();