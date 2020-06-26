const term = require('terminal-kit').terminal;
const table = require('table');
const gradient = require('gradient-string');
const matrix = require('./matrix');
const ENUM = require('./enums');
const generatemines = require('./generateMines');
const numbers = require('./numbers');
const map = require('./map');
const text = require('./text');
const difficulty = require('./difficulty');

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function click (board, arr, clicked) {
  if (clicked.x >= 0 && clicked.y >= 0 && clicked.x < ENUM.ROWS && clicked.y < ENUM.COLS) {
    if (clickedStatus === 'rightClick') {
      board[clicked.x][clicked.y] = ENUM.FLAG;
    }
    if (clickedStatus === 'leftClick') {
      board[clicked.x][clicked.y] = arr[clicked.x][clicked.y];
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][(clicked.y - 1) >= 0 ? clicked.y - 1 : clicked.y] === ENUM.EMPTY) { // irany = 'bal';
        clicked.y--;
        click(board, arr, clicked);
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y] === ENUM.EMPTY) { // irany = 'le';
        clicked.x++;
        click(board, arr, clicked);
        clicked.x--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb';
        clicked.y++;
        click(board, arr, clicked);
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y] === ENUM.EMPTY) { // irany = 'fel';
        clicked.x--;
        click(board, arr, clicked);
        clicked.x++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y - 1] === ENUM.EMPTY) { // irany = 'bal fel';
        clicked.x--;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x++;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y - 1] === ENUM.EMPTY) { // irany = 'bal le';
        clicked.x++;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : clicked.x][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb le';
        clicked.x++;
        clicked.y++;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb fel';
        clicked.x--;
        clicked.y++;
        click(board, arr, clicked);
        clicked.x++;
        clicked.y--;
      }
    }
  }
}

function terminate () {
  term.grabInput(false);
  setTimeout(function () { process.exit(); }, 100);
}

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
  if (name === 'CTRL_C') { terminate(); }
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
    click(board, arr, clickedField);
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
      click(board, arr, clickedField);
      console.log(table.table(board));
      started++;
    }
  }
  if (name === 'MOUSE_LEFT_BUTTON_PRESSED') {
    if (started === -1) {
      if (data.y >= 13 && data.y <= 15 && data.x >= 7 && data.x <= 16) { // Easy
        difficulty.diff('easy');
        sleep(500).then(() => {
          term.clear();
          map.map(board, ENUM.ROWS, ENUM.COLS);
          console.log(table.table(board));
          started++;
        });
      }
      if (data.y >= 13 && data.y <= 14 && data.x >= 51 && data.x <= 69) { // Medium
        difficulty.diff('medium');
        sleep(500).then(() => {
          term.clear();
          map.map(board, ENUM.ROWS, ENUM.COLS);
          console.log(table.table(board));
          started++;
        });
      }
      if (data.y >= 13 && data.y <= 14 && data.x >= 103 && data.x <= 112) { // Hard
        difficulty.diff('hard');
        sleep(500).then(() => {
          term.clear();
          map.map(board, ENUM.ROWS, ENUM.COLS);
          console.log(table.table(board));
          started++;
        });
      }
    }
  }
});
