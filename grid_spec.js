describe("A Game of Life grid of N x N dimensions", function() {
  var grid, input_state;
  beforeEach(function() {
    input_state = [
      [1, 1],
      [1, 0]
    ];
    grid = new GameOfLifeGrid(input_state);
  });

  it("should expect a board of N x N as input_state", function() {
    expect(grid).toBeDefined();
  });

  it("should error when given an M x N as input_state", function() {
    input_state.push([0, 0]);
    expect(function() {
      new GameOfLifeGrid(input_state);
    }).toThrow("M x N not allowed");
  });

  it("should know that it is of size N", function() {
    expect(grid.size()).toEqual(input_state.length);
  });

  it("should be able to extract its current state", function() {
    expect(grid.state()).toEqual(input_state);
  });

  it("should be able to get the CellEcology at any position in the grid", function() {
    _(2).times(function(x) {
      _(2).times(function(y) {
        expect(grid.get(x, y)).toBeDefined();
      })
    })
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
    grid = new GameOfLifeGrid(input_state);
    grid.iterate();
    _(2).times(function(x) {
      _(2).times(function(y) {
        expect(grid.get(x,y).has_living_cell()).toBeTruthy();
      });
    });
  });

  it("should assign all of the other cells as the neighbor to each cell", function() {
    // I hate this spec. But I also don't want to write this spec, sans inner loop, 4 times...
    // or sans outer loop 16 times.  Fuck... that... shit.
    grid = new GameOfLifeGrid(input_state);
    var x, y;
    _(2).times(function(x) {
      _(2).times(function(y) {
        var ecology = grid.get(x, y);
        expect(ecology.neighbors.length).toEqual(3);
        _(2).times(function(x_prime) {
          _(2).times(function(y_prime) {
            if (!(x == x_prime && y == y_prime)) {
              var neighbor = grid.get(x_prime, y_prime);
              expect(_(ecology.neighbors).include(neighbor))
                .toBeTruthy("Cell doesn't have expected neighbor as neighbor");
            }
          });
        });
      });
    });
  });
});

xdescribe("A 3 x 3 game of life", function() {
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
    grid = new GameOfLifeGrid(input_state);
    grid.iterate();
    expect(grid.state()).toEqual(expected_state);
  });
});


