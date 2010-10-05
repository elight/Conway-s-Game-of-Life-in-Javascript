var CellEcology = function(state) {
  return {
    neighbors: [],
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
    is_underpopulated: function() {
      return this.num_living_neighbors() < 2;
    },
    is_life_sustaining: function() {
      return this.num_living_neighbors() == 2;
    },
    is_life_generating: function() {
      return this.num_living_neighbors() == 3;
    },
    is_overcrowded: function() {
      return this.num_living_neighbors() >= 4;
    },
    next_state: function() { 
      if (this.is_life_generating() ||
          (this.has_living_cell() && this.is_life_sustaining())
         ) {
        return true;
      }
      return false;
    }
  }
};


