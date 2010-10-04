var ecology;

function cell_ecology(args) {
  var num_neighbors = args.with_living_neighbors;
  var predicate = args.should_be;

  describe("with " + num_neighbors + " living neighbors", function() {
    beforeEach(function() { 
      _(num_neighbors).times(function() {
        ecology.neighbors.push(CellEcology({cell_alive: true}));
      });
    });

    it("should be " + predicate, function() {
      expect(ecology["is_" + predicate]()).toEqual(true);
    });
  });
}

describe("A cell ecology containing a living cell", function() {
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

  cell_ecology({with_living_neighbors:1, should_be: "underpopulated"});
  cell_ecology({with_living_neighbors:2, should_be: "life_sustaining"});
  cell_ecology({with_living_neighbors:3, should_be: "life_generating"});
  cell_ecology({with_living_neighbors:4, should_be: "overcrowded"});

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

  cell_ecology({with_living_neighbors: 2, should_be: "life_sustaining"});
  cell_ecology({with_living_neighbors: 3, should_be: "life_generating"});

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
