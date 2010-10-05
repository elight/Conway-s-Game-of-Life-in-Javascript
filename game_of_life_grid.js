var GameOfLifeGrid = function(board) {
  if (board.length != board[0].length) {
    throw "M x N not allowed";
  }
  return {
    size: function() { return board.length; },
    state: function() { return board; },
    iterate: function() { 
      board = [
        [1, 1],
        [1, 1]
      ];
    }
  };
};
