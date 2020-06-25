function countMines (arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === String.fromCharCode(1758)) { // ENUM.MINE
        count++;
      }
    }
  }
  return count;
}

module.exports = {
  countMines
};
