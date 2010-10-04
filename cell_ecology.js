var CellEcology = function(state) {
  return {
    has_living_cell: function() { return state.cell_alive; },
    num_living_neighbors: function() { 
      var count = 0;
      $.each(this.neighbors, function(idx, neighbor) {
        if (neighbor.has_living_cell()) {
          count++;
        }
      });
      return count;
    },
    next_state: function() { 
      if (this.num_living_neighbors() == 2) {
        return this.has_living_cell();
      } else if (this.num_living_neighbors() == 3) {
        return true; 
      }
      return false;
    },
    neighbors: []
  }
};


