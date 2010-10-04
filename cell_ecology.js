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
    next_state: function() { 
      if (this.has_living_cell() &&
          (this.is_life_sustaining() || this.is_life_generating())) {
        return true;
      } else if (this.is_life_generating()) {
        return true;
      }
      return false;
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
    }
  }
};


