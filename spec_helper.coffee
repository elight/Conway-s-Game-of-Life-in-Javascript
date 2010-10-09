assert_cell_ecology = (args) ->
  num_neighbors = args.with_living_neighbors
  predicate = args.should_be

  describe "with " + num_neighbors + " living neighbors", ->
    beforeEach ->
      for i in [1..num_neighbors]
        ecology.neighbors.push CellEcology cell_alive: true

    it "should be " + predicate, ->
      expect(ecology["is_" + predicate]()).toEqual true


next_cell_state = (args) ->
  ecology_state = args.where_ecology
  expected_cell_state = args.should_be == "alive"
  life_adjective = expected_cell_state ? "living" : "dead"

  describe "where the ecology " + ecology_state, ->
    beforeEach ->
      ecology[ecology_state] = -> true

    it "should have a " + life_adjective + " cell after transitioning", ->
      console.debug life_adjective
      expect(ecology.next_state()).toEqual expected_cell_state


