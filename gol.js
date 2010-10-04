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

describe("A cell ecology containing a living cell", function() {

  var ecology;
  beforeEach(function() {
    ecology = CellEcology({cell_alive: true});
  });

  it("should know whether the contained cell is alive or dead", function() {
    expect(ecology.has_living_cell()).toBeTruthy();
  });

  it("should know how many living neighbors it has", function() {
    expect(ecology.num_living_neighbors()).toEqual(0);
  });

  it("should be dead in its next state", function() {
    expect(ecology.next_state()).toEqual(false);
  });

  describe("with 1 live neighbor", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true})];
    });

    it("should be dead in its next state", function() {
      expect(ecology.next_state()).toEqual(false);
    });
  });

  describe("with 2 living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be alive in its next state", function() {
      expect(ecology.next_state()).toEqual(true);
    });

    it("should know how many living neighbors it has", function() {
      expect(ecology.num_living_neighbors()).toEqual(2);
    });
  });

  describe("with 3 living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be alive in its next state", function() {
      expect(ecology.next_state()).toEqual(true);
    });

    it("should know how many living neighbors it has", function() {
      expect(ecology.num_living_neighbors()).toEqual(3);
    });
  });

  describe("with more than three living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true}),CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be alive in its next state", function() {
      expect(ecology.next_state()).toEqual(false);
    });
  });
});

describe("A cell ecology containing a dead cell", function() {
  var ecology;
  beforeEach(function() {
    ecology = CellEcology({cell_alive: false});
  });

  describe("with 2 living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be dead in its next state", function() {
      expect(ecology.next_state()).toEqual(false);
    });
  });

  describe("with 3 living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be alive in its next state", function() {
      expect(ecology.next_state()).toEqual(true);
    });
  });

});


