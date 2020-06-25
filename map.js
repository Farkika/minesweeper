function map (board, rows, cols) {
  for (var i = 0; i < rows; i++) {
    board.push([]);
    board[i].push(new Array(cols));
    for (var j = 0; j < cols; j++) {
      board[i][j] = String.fromCharCode(9633); // ENUM.EMPTY
    }
  }
}

module.exports = {
  map
};
