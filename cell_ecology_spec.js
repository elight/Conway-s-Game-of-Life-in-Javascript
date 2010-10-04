var ecology;

describe("A cell ecology", function() {
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
})

describe("A cell ecology containing a living cell", function() {
  beforeEach(function() {
    ecology = CellEcology({cell_alive: true});
  });

  cell_ecology({with_living_neighbors:1, should_be: "underpopulated"});
  cell_ecology({with_living_neighbors:2, should_be: "life_sustaining"});
  cell_ecology({with_living_neighbors:3, should_be: "life_generating"});
  cell_ecology({with_living_neighbors:4, should_be: "overcrowded"});

  next_cell_state({where_ecology: "is_under_populated", should_be: "dead"});
  next_cell_state({where_ecology:"is_life_sustaining", should_be: "alive"});
  next_cell_state({where_ecology:"is_life_generating", should_be: "alive"});
  next_cell_state({where_ecology: "is_overcrowded", should_be: "dead"});
});

describe("A cell ecology containing a dead cell", function() {
  beforeEach(function() {
    ecology = CellEcology({cell_alive: false});
  });

  cell_ecology({with_living_neighbors: 2, should_be: "life_sustaining"});
  cell_ecology({with_living_neighbors: 3, should_be: "life_generating"});

  next_cell_state({where_ecology: "is_under_populated", should_be: "dead"});
  next_cell_state({where_ecology: "is_life_sustaining", should_be: "dead"});
  next_cell_state({where_ecology: "is_life_generating", should_be: "alive"});
  next_cell_state({where_ecology: "is_overcrowded", should_be: "dead"});
});

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

function next_cell_state(args) {
  var ecology_state = args.where_ecology
  var expected_cell_state = args.should_be == "alive";
  var life_adjective = expected_cell_state ? "living" : "dead";

  describe("where the ecology " + ecology_state, function() {
    beforeEach(function() {
      ecology[ecology_state] = function() { return true };
    });

    it("should have a " + life_adjective + " cell after transitioning", function() {
      expect(ecology.next_state()).toEqual(expected_cell_state);
    });
  });
}
