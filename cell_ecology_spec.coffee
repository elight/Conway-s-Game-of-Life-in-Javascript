ecology = null

describe "A cell ecology", ->
  beforeEach -> 
    ecology = CellEcology {cell_alive: true}

  it "should know whether the contained cell is alive or dead", ->
    expect(ecology.has_living_cell).toBeTruthy()

  for count in [1..3] 
    describe "with " + count + " living neighbors", ->
      beforeEach ->
        for i in [1..count]
          ecology.neighbors.push CellEcology cell_alive: true 

      it "should know it has " + count + " living neighbors", ->
        expect(ecology.num_living_neighbors()).toEqual count

    describe "with " + count + " dead neighbors", ->
      beforeEach ->
        for i in [1..count]
          ecology.neighbors.push CellEcology cell_alive: false

      it "should know it has 0 living neighbors", ->
        expect(ecology.num_living_neighbors()).toEqual 0


describe "A cell ecology containing a living cell", ->
  beforeEach ->
    ecology = CellEcology cell_alive: true

  assert_cell_ecology with_living_neighbors:1, should_be: "underpopulated"
  assert_cell_ecology with_living_neighbors:2, should_be: "life_sustaining"
  assert_cell_ecology with_living_neighbors:3, should_be: "life_generating"
  assert_cell_ecology with_living_neighbors:4, should_be: "overcrowded"

  next_cell_state where_ecology: "is_under_populated", should_be: "dead"
  next_cell_state where_ecology:"is_life_sustaining", should_be: "alive"
  next_cell_state where_ecology:"is_life_generating", should_be: "alive"
  next_cell_state where_ecology: "is_overcrowded", should_be: "dead"


describe "A cell ecology containing a dead cell", ->
  beforeEach ->
    ecology = CellEcology cell_alive: false

  assert_cell_ecology with_living_neighbors: 2, should_be: "life_sustaining"
  assert_cell_ecology with_living_neighbors: 3, should_be: "life_generating"

  next_cell_state where_ecology: "is_under_populated", should_be: "dead"
  next_cell_state where_ecology: "is_life_sustaining", should_be: "dead"
  next_cell_state where_ecology: "is_life_generating", should_be: "alive"
  next_cell_state where_ecology: "is_overcrowded", should_be: "dead"
