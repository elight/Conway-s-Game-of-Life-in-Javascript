describe("A cell ecology containing a living cell", function() {
  var ecology;
  beforeEach(function() {
    ecology = CellEcology({cell_alive: true});
  });

  it("should know whether the contained cell is alive or dead", function() {
    expect(ecology.has_living_cell()).toBeTruthy();
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

      it("should know it has 0 living neighbors", function() {
        expect(ecology.num_living_neighbors()).toEqual(0);
      });
    });
  });

  describe("with 1 live neighbor", function() {
    beforeEach(function() { 
      ecology.neighbors = [CellEcology({cell_alive: true})];
    });

    it("should be under populated", function() {
      expect(ecology.is_underpopulated()).toEqual(true);
    });
  });

  describe("with 2 living neighbors", function() {
    beforeEach(function() { 
      _(2).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be life-sustaining", function() {
      expect(ecology.is_life_sustaining()).toEqual(true);
    });
  });

  describe("with 3 living neighbors", function() {
    beforeEach(function() { 
      _(3).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be life-generating", function() {
      expect(ecology.is_life_generating()).toEqual(true);
    });
  });

  describe("with more than three living neighbors", function() {
    beforeEach(function() { 
      _(4).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be over-crowded", function() {
      expect(ecology.is_overcrowded()).toEqual(true);
    });
  });

  live_predicates = ["is_life_sustaining", "is_life_generating"];
  $.each(live_predicates, function(idx, predicate) {
    var ecology_state = predicate;
    describe("where the ecology " + ecology_state, function() {
      beforeEach(function() {
        ecology[ecology_state] = function() { return true };
      });

      it("should have a living cell after transitioning", function() {
        expect(ecology.next_state()).toEqual(true);
      });
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
      _(2).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be life-sustaining", function() {
      expect(ecology.is_life_sustaining()).toEqual(true);
    });
  });

  describe("with 3 living neighbors", function() {
    beforeEach(function() { 
      _(3).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be life-generating", function() {
      expect(ecology.is_life_generating()).toEqual(true);
    });
  });

  describe("where the ecology is life generating", function() {
    beforeEach(function() {
      ecology.is_life_generating = function() { return true };
    });

    it("should have a living cell after transitioning", function() {
      expect(ecology.next_state()).toEqual(true);
    });
  });

  dead_predicates = ["is_under_populated", "is_life_sustaining"], 
  $.each(dead_predicates, function(idx, predicate) {
    var ecology_state = predicate;
    describe("where the ecology " + ecology_state, function() {
      beforeEach(function() {
        ecology[ecology_state] = function() { return true };
      });

      it("should have a dead cell after transtioning", function() {
        expect(ecology.next_state()).toEqual(false);
      });
    });
  });
});
