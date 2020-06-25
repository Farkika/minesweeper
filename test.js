const readlineSync = require('readline-sync');
const term = require('terminal-kit').terminal;
const table = require('table');
const matrix = require('./matrix');
const ENUM = require('./enums');
const generatemines = require('./generateMines');
const countmines = require('./countMines');
const numbers = require('./numbers');
const map = require('./map');

function click (board, arr, clicked) {
  if (clicked.x >= 0 && clicked.y >= 0 && clicked.x < ROWS && clicked.y < COLS) {
    if (clickedStatus === 'rightClick') {
      board[clicked.x][clicked.y] = FLAG;
    }
    if (clickedStatus === 'leftClick') {
      board[clicked.x][clicked.y] = arr[clicked.x][clicked.y];
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][(clicked.y - 1) >= 0 ? clicked.y - 1 : clicked.y] === EMPTY) {
        // irany = 'bal';
        clicked.y--;
        click(board, arr, clicked);
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ROWS ? clicked.x + 1 : ROWS - 1][clicked.y] === EMPTY) {
        // irany = 'le';
        clicked.x++;
        click(board, arr, clicked);
        clicked.x--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][clicked.y + 1] === EMPTY) {
        // irany = 'jobb';
        clicked.y++;
        click(board, arr, clicked);
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y] === EMPTY) {
        // irany = 'fel';
        clicked.x--;
        click(board, arr, clicked);
        clicked.x++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y - 1] === EMPTY) {
        // irany = 'bal fel';
        clicked.x--;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x++;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ROWS ? clicked.x + 1 : ROWS - 1][clicked.y - 1] === EMPTY) {
        // irany = 'bal le';
        clicked.x++;
        clicked.y--;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ROWS ? clicked.x + 1 : clicked.x][clicked.y + 1] === EMPTY) {
        // irany = 'jobb le';
        clicked.x++;
        clicked.y++;
        click(board, arr, clicked);
        clicked.x--;
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y + 1] === EMPTY) {
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

const FLAG = String.fromCharCode(55298);
const EMPTY = String.fromCharCode(68181);
const ROWS = 10;
const COLS = 10;
const arr = [];
const board = [];

const clickedStatus = 'leftClick';
const clickedField = { x: 0, y: 0 };
// const field = { x: 0, y: 0 };

term.grabInput({ mouse: 'button' });

term.on('key', function (name, matches, data) {
  console.log("'key' event:", name);
  if (name === 'CTRL_C') { terminate(); }
});

let gameOver = false;
let lose = false;
term.clear();
let started = 0;

term.clear();
map.map(board, ROWS, COLS);
console.log(table.table(board));

term.on('mouse', function (name, data) {
  // console.log("'mouse' event:", data.x, data.y);

  if (started !== 0) {
    // console.log(field);
  // const y = readlineSync.questionInt('x koordináta: ');
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x < (COLS * 4) && data.y <= (ROWS * 2)) {
      clickedField.y = Math.ceil(data.x / 4) - 1;

      // const x = readlineSync.questionInt('y koordináta: ');
      clickedField.x = (data.y / 2) - 1;
    }
    term.clear();
    click(board, arr, clickedField);
    console.log(table.table(board));
    console.log(data.x, data.y, clickedField.x, clickedField.y);

    if (arr[clickedField.x][clickedField.y] === '*') {
      gameOver = true;
      lose = true;
      term.clear();
      console.log(table.table(arr));
      console.log('Vesztettél!!!');
      term.grabInput(false);
    }
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === EMPTY) {
          counter++;
        }
      }
    }
    if (counter === ENUM.mineAmount && lose === false) {
      gameOver = true;
      term.clear();
      console.log(table.table(arr));
      console.log('Győztél!!!');
      term.grabInput(false);
    }
  }

  if (started === 0) {
    // console.log(field);
    // const y = readlineSync.questionInt('x koordináta: ');
    if (data.y % 2 === 0 && (data.x + 3) % 4 !== 0 && data.x < (COLS * 4) && data.y <= (ROWS * 2)) {
      clickedField.y = Math.ceil(data.x / 4) - 1;

      // const x = readlineSync.questionInt('y koordináta: ');

      clickedField.x = (data.y / 2) - 1;

      term.clear();

      const mineAmount = generatemines.generateMines(clickedField, ENUM.mineAmount);
      matrix.matrix(arr, mineAmount, ENUM.ROWS, ENUM.COLS);
      numbers.numbers(arr);
      click(board, arr, clickedField);
      console.log(table.table(board));
      console.log(data.x, data.y, clickedField.x, clickedField.y);
      started++;
    }
  }

  // term.grabInput(false);
});