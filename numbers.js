function numbers (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = 0;
      if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1] === '*') {
        number++;
      }
      if (j - 1 >= 0 && arr[i][j - 1] === '*') {
        number++;
      }
      if (j - 1 >= 0 && i + 1 < arr.length && arr[i + 1][j - 1] === '*') {
        number++;
      }
      if (i - 1 >= 0 && arr[i - 1][j] === '*') {
        number++;
      }
      if (i + 1 < arr.length && arr[i + 1][j] === '*') {
        number++;
      }
      if (i - 1 >= 0 && arr[i - 1][j + 1] === '*') {
        number++;
      }
      if (arr[i][j + 1] === '*') {
        number++;
      }
      if (i + 1 < arr.length && arr[i + 1][j + 1] === '*') {
        number++;
      }
      if (number !== 0 && arr[i][j] !== '*') {
        arr[i][j] = '' + number + '';
      }
    }
  }
}

module.exports = {
  numbers
};
