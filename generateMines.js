const ENUM = require('./enums');

function generateMines (start, mineAmmo) {
  let count = 0;
  const mines = Array(0);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      mines.push({ x: start.x + i, y: start.y + j });
    }
  }
  while (count < mineAmmo) {
    const x = Math.floor(Math.random() * ENUM.COLS);
    const y = Math.floor(Math.random() * ENUM.ROWS);
    let include = 0;
    for (let i = 0; i < mines.length; i++) {
      if (mines[i].x === x && mines[i].y === y) {
        include++;
      }
    }
    if (include === 0) {
      mines.push({ x, y });
      count++;
    }
  }
  return mines;
}

module.exports = {
  generateMines
};
