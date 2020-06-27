const term = require('terminal-kit').terminal;
const map = require('./map');
const table = require('table');
const ENUM = require('./enums');

const afterDiff = (board) => {
  term.clear();
  map.map(board, ENUM.ROWS, ENUM.COLS);
  console.log(table.table(board));
};

module.exports = {
  afterDiff
};
