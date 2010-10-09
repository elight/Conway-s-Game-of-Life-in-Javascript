describe("A Game of Life grid of N x N dimensions", function() {
  var grid, input_state;
  beforeEach(function() {
    input_state = [
      [1, 1],
      [1, 0]
    ];
    grid = GameOfLifeGrid(input_state);
  });

  it("should expect a board of N x N as input_state", function() {
    expect(grid).toBeDefined();
  });

  it("should error when given an M x N as input_state", function() {
    input_state.push([0, 0]);
    expect(function() {
      GameOfLifeGrid(input_state);
    }).toThrow("M x N not allowed");
  });

  it("should know that it is of size N", function() {
    expect(grid.size()).toEqual(input_state.length);
  });

  it("should be able to extract its current state", function() {
    expect(grid.state()).toEqual(input_state);
  });

  it("should be able to get the CellEcology at any position in the grid", function() {
    expect(grid.get(0, 0)).toBeDefined();
    expect(grid.get(1, 1)).toBeDefined();
  });
});

describe("A 2 x 2 game of life", function() {
  var input_state, expected_state;
  beforeEach(function() {
    input_state = [
      [1, 1],
      [1, 0]
    ];
    expected_state = [
      [1, 1],
      [1, 1]
    ];
  });

  it("should be able to transition to its next state", function() {
    grid = GameOfLifeGrid(input_state);
    grid.iterate();
    expect(grid.state()).toEqual(expected_state);
  });

  it("should assign neighbors to each cell when the grid is created", function() {
    grid = GameOfLifeGrid(input_state);
    var x, y;
    for(x = 0; x < 2; x++) {
      for(y = 0; y < 2; y++) {
        expect(grid.get(x, y).neighbors.length).toEqual(3);
      }
    }

  });
});

describe("A 3 x 3 game of life", function() {
  it("should be able to transition to its next state", function() {
    var input_state = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ];
    var expected_state = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ];
    grid = GameOfLifeGrid(input_state);
    grid.iterate();
    expect(grid.state()).toEqual(expected_state);
  });
});

