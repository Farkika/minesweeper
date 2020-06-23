function generateMines (start, mineAmmo) {
  let count = 0;
  const mines = Array(0);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      mines.push({ x: start.x + i, y: start.y + j });
    }
  }
  // mines.push(start); // ide kattint először a játékos
  // console.log('Kezdés: X = ' + (start.y + 1) + ' Y = ' + (start.x + 1));
  while (count < mineAmmo) {
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

module.exports = {
  generateMines
};
