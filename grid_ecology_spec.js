describe("A Game of Life grid of N x N dimensions", function() {
  var grid, input_state;
  beforeEach(function() {
    input_state = [
      [1, 1],
      [1, 0]
    ];
  });

  it("should expect a board of N x N as input_state", function() {
    grid = GameOfLifeGrid(input_state);
    expect(grid).toBeDefined();
  });

  it("should error when given an M x N as input_state", function() {
    input_state.push([0, 0]);
    expect(function() {
      GameOfLifeGrid(input_state);
    }).toThrow("M x N not allowed");
  });

  it("should know that it is of size N", function() {
    grid = GameOfLifeGrid(input_state);
    expect(grid.size()).toEqual(input_state.length);
  });

  it("should be able to extract its current state", function() {
    grid = GameOfLifeGrid(input_state);
    expect(grid.state()).toEqual(input_state);
  });
});

describe("A 2 x 2 game of life", function() {
  it("should be able to transition to its next state", function() {
    var input_state = [
      [1, 1],
      [1, 0]
    ];
    var expected_state = [
      [1, 1],
      [1, 1]
    ];
    grid = GameOfLifeGrid(input_state);
    grid.iterate();
    expect(grid.state()).toEqual(expected_state);
  });
});
