// const table = require('table');

// process.stdout.write('slma');
const arr = [[1, 2, 0, 0], [3, 4, 0, 0]];

const config = {
  /* columns: {
    1: {
      width: 10
    }
  }, */
  border: {
    topBody: '─',
    topJoin: '┬',
    topLeft: '┌',
    topRight: '┐',

    bottomBody: '─',
    bottomJoin: '┴',
    bottomLeft: '└',
    bottomRight: '┘',

    bodyLeft: '│',
    bodyRight: '│',
    bodyJoin: '│',

    joinBody: '─',
    joinLeft: '├',
    joinRight: '┤',
    joinJoin: '┼'
  }
  // columnCount: 2
};
// console.log(fuc.length);
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i], config);
}
// process.stdout.write(arr + 'arr');
// console.log(table.table(arr), table.table(arr, config));
