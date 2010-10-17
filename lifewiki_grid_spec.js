describe("A GameOfLifeGrid created with X and Y dimensions and a LifeWiki grid string", function() {
  var game = null;
  beforeEach(function() {
    var lifewiki_str = (<here><![CDATA[
.OO
.OO.................O
...................O.O............O.O
....................O............O
OO.......OO.......................O..O
OO.O.....OO.......................O.O.O
...O.......................O.......O..O
...O.......................OO.......OO
O..O.................OO.....O
.OO..................O
.....................OOO
....................................OO
....................................OO
.OO
O..O
O.O.O................O.O....OO.....OO
.O..O.................OO....OO.....OO.O
.....O............O...O...............O
..O.O............O.O..................O
..................O................O..O
....................................OO
]]></here>).toString();
    game = new GameOfLifeGrid(41, 23, lifewiki_str);
  });

  it("should not know its num_rows", function() {
    expect(game.num_rows).toEqual(41);
  });

  it("should not know its num_cols", function() {
    expect(game.num_cols).toEqual(23);
  });

  it("should have num_row rows", function() {
    expect(game.grid.length).toEqual(game.num_rows);
  });

  it("should have 41 columns in each row", function() {
    _(game.num_rows).times(function(row_num) {
      expect(game.grid[row_num].length).toEqual(23);
    });
  });

});
