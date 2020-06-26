const ENUM = require('./enums');
const gradient = require('gradient-string');

function numbers (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let number = 0;
      if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1] === ENUM.MINE) {
        number++;
      }
      if (j - 1 >= 0 && arr[i][j - 1] === ENUM.MINE) {
        number++;
      }
      if (j - 1 >= 0 && i + 1 < arr.length && arr[i + 1][j - 1] === ENUM.MINE) {
        number++;
      }
      if (i - 1 >= 0 && arr[i - 1][j] === ENUM.MINE) {
        number++;
      }
      if (i + 1 < arr.length && arr[i + 1][j] === ENUM.MINE) {
        number++;
      }
      if (i - 1 >= 0 && arr[i - 1][j + 1] === ENUM.MINE) {
        number++;
      }
      if (arr[i][j + 1] === ENUM.MINE) {
        number++;
      }
      if (i + 1 < arr.length && arr[i + 1][j + 1] === ENUM.MINE) {
        number++;
      }
      if (number !== 0 && arr[i][j] !== ENUM.MINE) {
        arr[i][j] = '' + number + '';
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === '1') {
        arr[i][j] = gradient([{ r: 1, g: 0, b: 254 }, { r: 1, g: 0, b: 254 }])('1');
      }
      if (arr[i][j] === '2') {
        arr[i][j] = gradient([{ r: 1, g: 127, b: 1 }, { r: 1, g: 127, b: 1 }])('2');
      }
      if (arr[i][j] === '3') {
        arr[i][j] = gradient([{ r: 254, g: 0, b: 0 }, { r: 254, g: 0, b: 0 }])('3');
      }
      if (arr[i][j] === '4') {
        arr[i][j] = gradient([{ r: 1, g: 0, b: 128 }, { r: 1, g: 0, b: 128 }])('4');
      }
      if (arr[i][j] === '5') {
        arr[i][j] = gradient([{ r: 129, g: 1, b: 2 }, { r: 129, g: 1, b: 2 }])('5');
      }
      if (arr[i][j] === '6') {
        arr[i][j] = gradient([{ r: 0, g: 128, b: 129 }, { r: 0, g: 128, b: 129 }])('6');
      }
      if (arr[i][j] === '7') {
        arr[i][j] = gradient([{ r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }])('7');
      }
      if (arr[i][j] === '8') {
        arr[i][j] = gradient([{ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 }])('8');
      }
    }
  }
}

module.exports = {
  numbers
};
