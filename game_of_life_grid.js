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

  var is_in_bounds = function(x, y) {
    return x < me.grid.length && x >= 0 && y < me.grid.length && y >= 0;
  }

  var connect_neighbors_to_ecology_at = function(x, y) {
    var ecology = me.grid[x][y];
    var delta_x, delta_y;
    for(delta_x = -1; delta_x <= 1; delta_x++) {
      for(delta_y = -1; delta_y <= 1; delta_y++) {
        if(delta_x == 0 && delta_y == 0) {
          continue;
        }
        var x_prime = x + delta_x;
        var y_prime = y + delta_y;
        if (!is_in_bounds(x_prime, y_prime)) {
          continue;
        }
        var neighbor = me.grid[x_prime][y_prime];
        ecology.add_neighbor(neighbor);
      }
    }
  }

  var connect_neighbors_in = function(grid) {
    _(grid.length).times(function(x) {
      _(grid.length).times(function(y) {
        connect_neighbors_to_ecology_at(x, y);
      });
    });
  }

  var compute_iteration_grid = function() {
    var iteration_grid = [];
    _(me.grid.length).times(function(x) {
      var row = [];
      iteration_grid.push(row);
      _(me.grid.length).times(function(y) {
        row.push(me.grid[x][y].next_state());
      });
    });
    return iteration_grid;
  };

  var modify_grid_state_using = function(iteration_grid) {
    _(me.grid.length).times(function(x) {
      _(me.grid.length).times(function(y) {
        me.grid[x][y].alive = iteration_grid[x][y];
      });
    });
  };

  var me = this;
  this.grid = populate_grid_from(board);
  connect_neighbors_in(this.grid);

  this.size = function() { return me.grid.length };

  this.state = function() { 
    var serialized = [];
    _(me.grid.length).times(function(x) {
      var row = [];
      serialized.push(row);
      _(me.grid.length).times(function(y) {
        row.push(me.grid[x][y].alive ? 1 : 0);
      });
    });
    return serialized;
  };

  this.get = function(x, y) { return me.grid[x][y] };

  this.iterate = function() { 
    var iteration_grid = compute_iteration_grid();
    modify_grid_state_using(iteration_grid);
  };

};
