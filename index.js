// const readlineSync = require('readline-sync');
const term = require('terminal-kit').terminal;
const table = require('table');
const matrix = require('./matrix');
const ENUM = require('./enums');
const generatemines = require('./generateMines');
// const countmines = require('./countMines');
const numbers = require('./numbers');
const map = require('./map');

function click (board, arr, clicked) {
  if (clicked.x >= 0 && clicked.y >= 0 && clicked.x < ENUM.ROWS && clicked.y < ENUM.COLS) {
    if (clickedStatus === 'rightClick') {
      board[clicked.x][clicked.y] = ENUM.FLAG;
    }
    if (clickedStatus === 'leftClick') {
      board[clicked.x][clicked.y] = arr[clicked.x][clicked.y];
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][(clicked.y - 1) >= 0 ? clicked.y - 1 : clicked.y] === ENUM.EMPTY) {
        // irany = 'bal';
        clicked.y--;
        click(board, arr, clicked);
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y] === ENUM.EMPTY) {
        // irany = 'le';
        clicked.x++;
        click(board, arr, clicked);
        clicked.x--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][clicked.y + 1] === ENUM.EMPTY) {
        // irany = 'jobb';
        clicked.y++;
        click(board, arr, clicked);
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y] === ENUM.EMPTY) {
        // irany = 'fel';
        clicked.x--;
        click(board, arr, clicked);
        clicked.x++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y - 1] === ENUM.EMPTY) {
        // irany = 'bal fel';
        clicked.x--;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x++;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y - 1] === ENUM.EMPTY) {
        // irany = 'bal le';
        clicked.x++;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : clicked.x][clicked.y + 1] === ENUM.EMPTY) {
        // irany = 'jobb le';
        clicked.x++;
        clicked.y++;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y + 1] === ENUM.EMPTY) {
        // irany = 'jobb fel';
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
let started = 0;

term.grabInput({ mouse: 'button' });
term.on('key', function (name, matches, data) {
  // console.log("'key' event:", name);
  if (name === 'CTRL_C') { terminate(); }
});

term.clear();
map.map(board, ENUM.ROWS, ENUM.COLS);
console.log(table.table(board));

term.on('mouse', function (name, data) {
  // console.log("'mouse' event:", data.x, data.y, data);
  if (started !== 0) {
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x <= (ENUM.COLS * 4) && data.y <= (ENUM.ROWS * 2)) {
      // const y = readlineSync.questionInt('x koordináta: ');
      clickedField.y = Math.ceil(data.x / 4) - 1;
      // const x = readlineSync.questionInt('y koordináta: ');
      clickedField.x = (data.y / 2) - 1;
      if (data.code === 0) {
        clickedStatus = 'leftClick';
      }
      if (data.code === 2) {
        clickedStatus = 'rightClick';
      }
    }
    term.clear();
    click(board, arr, clickedField);
    console.log(table.table(board));
    // console.log(data.x, data.y, clickedField.x, clickedField.y);
    if (arr[clickedField.x][clickedField.y] === ENUM.MINE && clickedStatus === 'leftClick') {
      lose = true;
      term.clear();
      // arr[clickedField.x][clickedField.y] = ENUM.MINE;
      console.log(table.table(arr));
      console.log('Vesztettél!!!');
      term.grabInput(false);
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
      console.log('Győztél!!!');
      term.grabInput(false);
    }
  }

  if (started === 0) {
    if (data.code === 0) {
      clickedStatus = 'leftClick';
    }
    if (data.code === 2) {
      clickedStatus = 'rightClick';
    }
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x <= (ENUM.COLS * 4) && data.y <= (ENUM.ROWS * 2) && clickedStatus === 'leftClick') {
      // const y = readlineSync.questionInt('x koordináta: ');
      clickedField.y = Math.ceil(data.x / 4) - 1;
      // const x = readlineSync.questionInt('y koordináta: ');
      clickedField.x = (data.y / 2) - 1;
      term.clear();
      const mineAmount = generatemines.generateMines(clickedField, ENUM.mineAmount);
      matrix.matrix(arr, mineAmount, ENUM.ROWS, ENUM.COLS);
      numbers.numbers(arr);
      click(board, arr, clickedField);
      console.log(table.table(board));
      // console.log(data.x, data.y, clickedField.x, clickedField.y);
      started++;
    }
  }
});
