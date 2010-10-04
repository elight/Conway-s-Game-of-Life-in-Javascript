describe("A cell ecology containing a living cell", function() {
  var ecology;
  beforeEach(function() {
    ecology = CellEcology({cell_alive: true});
  });

  it("should know whether the contained cell is alive or dead", function() {
    expect(ecology.has_living_cell()).toBeTruthy();
  });

  it("should be dead in its next state", function() {
    expect(ecology.next_state()).toEqual(false);
  });

  _(3).times(function(idx) {
    var count = idx;
    describe("with " + count + " living neighbors", function() {
      beforeEach(function() { 
        _(count).times(function() {
          ecology.neighbors.push(CellEcology({cell_alive: true}));
        });
      });

      it("should know it has " + count + " living neighbors", function() {
        expect(ecology.num_living_neighbors()).toEqual(count);
      });
    });

    describe("with " + count + " dead neighbors", function() {
      beforeEach(function() { 
        _(count).times(function() {
          ecology.neighbors.push(CellEcology({cell_alive: false}));
        });
      });

      it("should know it has " + count + " living neighbors", function() {
        expect(ecology.num_living_neighbors()).toEqual(0);
      });
    });
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
  });

  describe("with 3 living neighbors", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true}),CellEcology({cell_alive: true}),CellEcology({cell_alive: true})];
    });

    it("should be alive in its next state", function() {
      expect(ecology.next_state()).toEqual(true);
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
