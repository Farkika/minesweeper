const ENUM = require('./enums');

const click = (board, arr, clicked, clickedStatus) => {
  if (clicked.x >= 0 && clicked.y >= 0 && clicked.x < ENUM.ROWS && clicked.y < ENUM.COLS) {
    if (clickedStatus === 'rightClick') {
      board[clicked.x][clicked.y] = ENUM.FLAG;
    }
    if (clickedStatus === 'leftClick') {
      board[clicked.x][clicked.y] = arr[clicked.x][clicked.y];
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][(clicked.y - 1) >= 0 ? clicked.y - 1 : clicked.y] === ENUM.EMPTY) { // irany = 'bal';
        clicked.y--;
        click(board, arr, clicked, clickedStatus);
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y] === ENUM.EMPTY) { // irany = 'le';
        clicked.x++;
        click(board, arr, clicked, clickedStatus);
        clicked.x--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[clicked.x][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb';
        clicked.y++;
        click(board, arr, clicked, clickedStatus);
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y] === ENUM.EMPTY) { // irany = 'fel';
        clicked.x--;
        click(board, arr, clicked, clickedStatus);
        clicked.x++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y - 1] === ENUM.EMPTY) { // irany = 'bal fel';
        clicked.x--;
        clicked.y--;
        click(board, arr, clicked, clickedStatus);
        clicked.x++;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : ENUM.ROWS - 1][clicked.y - 1] === ENUM.EMPTY) { // irany = 'bal le';
        clicked.x++;
        clicked.y--;
        click(board, arr, clicked, clickedStatus);
        clicked.x--;
        clicked.y++;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x + 1) < ENUM.ROWS ? clicked.x + 1 : clicked.x][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb le';
        clicked.x++;
        clicked.y++;
        click(board, arr, clicked, clickedStatus);
        clicked.x--;
        clicked.y--;
      }
      while (arr[clicked.x][clicked.y] === ' ' && board[(clicked.x - 1) >= 0 ? clicked.x - 1 : 0][clicked.y + 1] === ENUM.EMPTY) { // irany = 'jobb fel';
        clicked.x--;
        clicked.y++;
        click(board, arr, clicked, clickedStatus);
        clicked.x++;
        clicked.y--;
      }
    }
  }
};

module.exports = {
  click
};
