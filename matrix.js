function matrix (arr, value, rows, cols) {
  for (var i = 0; i < rows; i++) {
    arr.push([]);
    arr[i].push(new Array(cols));
    for (var j = 0; j < cols; j++) {
      arr[i][j] = ' ';
      for (let k = 9; k < value.length; k++) {
        if (value[k].x === i && value[k].y === j) {
          arr[i][j] = String.fromCharCode(1758); // ENUM.MINE
        }
      }
    }
  }
}

module.exports = {
  matrix
};
