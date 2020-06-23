function map (board, rows, cols) {
  for (var i = 0; i < rows; i++) {
    board.push([]);
    board[i].push(new Array(cols));
    for (var j = 0; j < cols; j++) {
      // Initializes:
      board[i][j] = String.fromCharCode(68181);
    }
  }
}

module.exports = {
  map
};
