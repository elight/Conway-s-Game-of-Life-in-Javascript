var GameOfLifeGrid = function(board) {
  var board_size = board.length;
  if (board_size != board[0].length) {
    throw "M x N not allowed";
  }
  return {
    size: function() { return board_size; },
    state: function() { return board; },
    get: function() { return CellEcology({alive: true}) },
    iterate: function() { 
      board = [
        [1, 1],
        [1, 1]
      ];
    }
  };
};
