var TicTacToeBoardView = (function() {
  function TicTacToeBoardView(node, controller, board) {
    this.node = node;
    this.controller = controller;
    this.board = board;
  }

  function _asXY(position) {
    return {x: 10+(position % 3) * 30, y: 10+Math.floor(position / 3) * 30};
  }

  function _asMove(player) {
    return player===Player.NOUGHTS ? 'o' : player===Player.CROSSES ? 'x' : '';
  }

  TicTacToeBoardView.prototype._drawTile = function(position,text,onClick) {
    var xy = _asXY(position);
    var group = new Kinetic.Group({x:xy.x,y:xy.y,width:45,height:45});
    group.add(new Kinetic.Rect({x:xy.x,y:xy.y,width:45,height:45,strokeWidth:4,stroke:'#aaaaaa',fill:'#dddddd'}));
    //group.add(new Kinetic.Text({x: xy.x+2, y: xy.y+20, width:40, align:'center', text:text, fill:'black'}));
    var move = new Kinetic.Text({x: xy.x-5, y: xy.y-5, width:50,align:'center',fontSize:50,fill:'grey'});
    group.add(move);
    group.on('click tap', onClick);
    this.node.add(group);
    return move;
  }

  TicTacToeBoardView.prototype._drawLine = function(startPos, endPos) {
    var xy0 = _asXY(startPos);
    var xy1 = _asXY(endPos);
    this.node.add(new Kinetic.Line({points:[xy0.x*2.5,xy0.y*2.5,xy1.x*2.5,xy1.y*2.5], stroke: 'red', strokeWidth: 10}));
  }

  TicTacToeBoardView.prototype._drawEndGame = function() {
    if (this.board.hasRow()) {
      var row = this.board.getRow();
      this._drawLine(row[0], row[2]);
    }
    else { // a draw
      this._drawLine(0, 8);
      this._drawLine(6, 2);
    }
    this.node.getLayer().draw();
  }

  TicTacToeBoardView.prototype._drawBoard = function() {
    var self = this;
    this.board.squares.forEach(function (square, position) {
      var move = self._drawTile(position, '', function() {
        self.controller.tryPlayMoveAt(position);
        if (self.controller.isGameOver()) {
          self._drawEndGame();
        }
      });

      square.onChange(function() {
        move.text(_asMove(square.get()));
        self.node.getLayer().draw();
      });
    });
  }

  TicTacToeBoardView.prototype.render = function() {
    this._drawBoard();
    this.node.getLayer().draw();
  }

  return TicTacToeBoardView;
})();