const term = require('terminal-kit').terminal;
const table = require('table');
const gradient = require('gradient-string');
const matrix = require('./matrix');
const ENUM = require('./enums');
const generatemines = require('./generateMines');
const numbers = require('./numbers');
const text = require('./text');
const difficulty = require('./difficulty');
const click = require('./click');
const terminate = require('./terminate');
const afterdiff = require('./afterdiff');

const arr = [];
const board = [];
let clickedStatus = 'leftClick';
const clickedField = { x: 0, y: 0 };
let lose = false;
let started = -1;

term.clear();
text.minesweeper();
text.menu();
term.grabInput({ mouse: 'button' });
term.on('key', function (name, matches, data) {
  if (name === 'CTRL_C') { terminate.terminate(); }
});

term.on('mouse', function (name, data) {
  // console.log("'mouse' event:", data.x, data.y, data);
  if (started > 0) {
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x <= (ENUM.COLS * 4) && data.y <= (ENUM.ROWS * 2)) {
      clickedField.y = Math.ceil(data.x / 4) - 1;
      clickedField.x = (data.y / 2) - 1;
      if (name === 'MOUSE_LEFT_BUTTON_PRESSED') {
        clickedStatus = 'leftClick';
      }
      if (name === 'MOUSE_RIGHT_BUTTON_PRESSED') {
        clickedStatus = 'rightClick';
      }
    }
    term.clear();
    click.click(board, arr, clickedField, clickedStatus);
    console.log(table.table(board));
    if (arr[clickedField.x][clickedField.y] === ENUM.MINE && clickedStatus === 'leftClick') {
      term.grabInput(false);
      lose = true;
      term.clear();
      arr[clickedField.x][clickedField.y] = gradient('red', 'red')(String.fromCharCode(1758));
      console.log(table.table(arr));
      text.lose();
    }
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === ENUM.EMPTY || board[i][j] === ENUM.FLAG) {
          counter++;
        }
      }
    }
    if (counter === ENUM.mineAmount && lose === false) {
      term.clear();
      console.log(table.table(arr));
      text.win();
      term.grabInput(false);
    }
  }
  if (started === 0) {
    if (name === 'MOUSE_LEFT_BUTTON_PRESSED') {
      clickedStatus = 'leftClick';
    }
    if (name === 'MOUSE_RIGHT_BUTTON_PRESSED') {
      clickedStatus = 'rightClick';
    }
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x <= (ENUM.COLS * 4) && data.y <= (ENUM.ROWS * 2) && clickedStatus === 'leftClick') {
      clickedField.y = Math.ceil(data.x / 4) - 1;
      clickedField.x = (data.y / 2) - 1;
      term.clear();
      const mineAmount = generatemines.generateMines(clickedField, ENUM.mineAmount);
      matrix.matrix(arr, mineAmount, ENUM.ROWS, ENUM.COLS);
      numbers.numbers(arr);
      click.click(board, arr, clickedField, clickedStatus);
      console.log(table.table(board));
      started++;
    }
  }
  if (name === 'MOUSE_LEFT_BUTTON_PRESSED') {
    if (started === -1) {
      if (data.y >= 13 && data.y <= 15 && data.x >= 7 && data.x <= 16) { // Easy
        difficulty.diff('easy');
        afterdiff.afterDiff(board);
        started++;
      }
      if (data.y >= 13 && data.y <= 14 && data.x >= 51 && data.x <= 69) { // Medium
        difficulty.diff('medium');
        afterdiff.afterDiff(board);
        started++;
      }
      if (data.y >= 13 && data.y <= 14 && data.x >= 103 && data.x <= 112) { // Hard
        difficulty.diff('hard');
        afterdiff.afterDiff(board);
        started++;
      }
    }
  }
});
