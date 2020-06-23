const FLAG = String.fromCharCode(55298);
const EMPTY = String.fromCharCode(68181);
const ROWS = 10;
const COLS = 10;
const mineAmount = Math.floor(ROWS * COLS * 1 / 10);
// const start = { x: 5, y: 5 };
const arr = [];
const board = [];
const clickedField = { x: 0, y: 0 };

module.exports = {
  FLAG,
  EMPTY,
  ROWS,
  COLS,
  mineAmount,
  arr,
  board,
  clickedField
};
