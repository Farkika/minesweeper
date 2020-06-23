const readlineSync = require('readline-sync');
const matrix = require('./matrix');
const ENUM = require('./enums');
const generatemines = require('./generateMines');
const countmines = require('./countMines');
const numbers = require('./numbers');
const map = require('./map');
// const click = require('./click');

/* function matrix (arr, value) {
  // Creates all lines:
  for (var i = 0; i < ROWS; i++) {
    // Creates an empty line
    arr.push([]);
    // Adds cols to the empty line:
    arr[i].push(new Array(COLS));
    for (var j = 0; j < COLS; j++) {
      // Initializes:
      arr[i][j] = '0';
      for (let k = 9; k < value.length; k++) {
        if (value[k].x === i && value[k].y === j) {
          arr[i][j] = '*';
        }
      }
    }
  }
  // return arr;
}
*/
/*
function generateMines (start) {
  let count = 0;
  const mines = Array(0);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      mines.push({ x: start.x + i, y: start.y + j });
    }
  }
  // mines.push(start); // ide kattint először a játékos
  console.log('Kezdés: X = ' + (start.y + 1) + ' Y = ' + (start.x + 1));
  while (count < Math.floor(ROWS * COLS * 1 / 5)) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    let include = 0;
    for (let i = 0; i < mines.length; i++) {
      if (mines[i].x === x && mines[i].y === y) {
        include++;
        // console.log(include);
      }
    }
    if (include === 0) {
      mines.push({ x, y });
      // console.log({ x, y });
      count++;
    }
  }
  return mines;
}
*/
/*
function countMines (arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === '*') {
        count++;
      }
    }
  }
  return count;
}
*/
/*
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
*/
/*
function map (board) {
  for (var i = 0; i < ROWS; i++) {
    board.push([]);
    board[i].push(new Array(COLS));
    for (var j = 0; j < COLS; j++) {
      // Initializes:
      board[i][j] = EMPTY;
    }
  }
}
*/
function click (board, arr, clicked) {
  // console.log(irany);
  // console.log(clickedField.x, clickedField.y);
  // console.log(board[clicked.x][clicked.y]);
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

// const MINE = String.fromCharCode(1758);

const FLAG = String.fromCharCode(55298);
const EMPTY = String.fromCharCode(68181);
const ROWS = 10;
const COLS = 10;
const arr = [];
const board = [];

const clickedStatus = 'leftClick';
const clickedField = { x: 0, y: 0 };
const y = readlineSync.questionInt('x koordináta: ');
clickedField.y = y - 1;
const x = readlineSync.questionInt('y koordináta: ');
clickedField.x = x - 1;
let gameOver = false;
// let irany = 'sehova';
// console.log('Akna darabszám: ' + mineCount);

// console.log(matrix(row, col, generateMines(row, col)));
// countMines(matrix(row, col, generateMines(row, col)));
const mineAmount = generatemines.generateMines(clickedField, ENUM.mineAmount);
matrix.matrix(arr, mineAmount, ENUM.ROWS, ENUM.COLS);
// console.log(arr);
console.log('Akna db: ' + countmines.countMines(arr));
numbers.numbers(arr);
// console.log(arr);
map.map(board, ROWS, COLS);
// console.log(board);
click(board, arr, clickedField);
console.log(board);
while (!gameOver) {
  const y = readlineSync.questionInt('x koordináta: ');
  clickedField.y = y - 1;
  const x = readlineSync.questionInt('y koordináta: ');
  clickedField.x = x - 1;
  click(board, arr, clickedField);
  console.log(board);
  if (arr[clickedField.x][clickedField.y] === '*') {
    gameOver = true;
    console.log(arr);
    console.log('Vesztettél!!!');
  }
  let counter = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === EMPTY) {
        counter++;
      }
    }
  }
  if (counter === ENUM.mineAmount) {
    gameOver = true;
    console.log(arr);
    console.log('Győztél!!!');
  }
}
