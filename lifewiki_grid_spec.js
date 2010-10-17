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
    game = new GameOfLifeGrid(39, 21, lifewiki_str);
  });

  it("should not know its width", function() {
    expect(game.width).toEqual(39);
  });

  it("should not know its height", function() {
    expect(game.height).toEqual(21);
  });
});
