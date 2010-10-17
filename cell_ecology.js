function CellEcology(state) {
  this.neighbors = [];
  this.alive = state.cell_alive;
  var me = this;

  this.add_neighbor = function(neighbor) {
    me.neighbors.push(neighbor);
  };

  this.has_living_cell = function() { return me.alive; };

  this.num_living_neighbors = function() {
    var count = 0;
    $.each(me.neighbors, function(idx, neighbor) {
      if (neighbor.has_living_cell()) {
        count++;
      }
    });
    return count;
  };

  this.is_underpopulated = function() {
    return me.num_living_neighbors() < 2;
  };
  
  this.is_life_sustaining = function() {
    return me.num_living_neighbors() == 2;
  };

  this.is_life_generating = function() {
    return me.num_living_neighbors() == 3;
  };

  this.is_overcrowded = function() {
    return me.num_living_neighbors() >= 4;
  };

  this.next_state = function() { 
    if (this.is_life_generating() ||
        (this.has_living_cell() && this.is_life_sustaining())
       ) {
      return true;
    }
    return false;
  };
}
