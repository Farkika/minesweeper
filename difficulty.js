const ENUM = require('./enums');

const diff = (difficulty) => {
  if (difficulty === 'easy') {
    ENUM.ROWS = 10;
    ENUM.COLS = 10;
  }
  if (difficulty === 'medium') {
    ENUM.ROWS = 15;
    ENUM.COLS = 15;
  }
  if (difficulty === 'hard') {
    ENUM.ROWS = 20;
    ENUM.COLS = 20;
  }
  ENUM.mineAmount = Math.floor(ENUM.ROWS * ENUM.COLS * 1 / 7);
};

module.exports = {
  diff
};
