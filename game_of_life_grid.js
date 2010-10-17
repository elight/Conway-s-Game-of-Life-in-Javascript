function GameOfLifeGrid(board) {
  var populate_grid_from = function(board) {
    var grid = [];
    _(board.length).times(function(x) {
      var row = [];
      grid.push(row);
      _(board.length).times(function(y) {
        var alive = board[x][y] == 1;
        row.push(new CellEcology({cell_alive: alive}));
      });
    });
    return grid;
  };

  _(board.length).times(function(idx) {
    if (board.length != board[idx].length) {
      throw "M x N not allowed";
    }
  });

  var me = this;
  this.grid = populate_grid_from(board);

  this.size = function() { return me.grid.length };

  this.state = function() { return board; };

  this.get = function() { return new CellEcology({alive: true}) };

  this.iterate = function() { 
    this.board = [
      [1, 1],
      [1, 1]
    ];
  };

};
