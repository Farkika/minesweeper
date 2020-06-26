const gradient = require('gradient-string');

const FLAG = gradient([{ r: 255, g: 255, b: 0 }, { r: 255, g: 255, b: 0 }])(String.fromCharCode(9872));
const EMPTY = String.fromCharCode(9633);
const MINE = gradient([{ r: 255, g: 255, b: 0 }, { r: 255, g: 255, b: 0 }])(String.fromCharCode(1758));
const ROWS = 0;
const COLS = 0;
const mineAmount = 0;

module.exports = {
  FLAG,
  EMPTY,
  MINE,
  ROWS,
  COLS,
  mineAmount
};
