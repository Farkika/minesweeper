var term = require('terminal-kit').terminal;

function terminate () {
  term.grabInput(false);
  setTimeout(function () { process.exit(); }, 100);
}

term.grabInput({ mouse: 'button' });

term.on('key', function (name, matches, data) {
  console.log("'key' event:", name);
  if (name === 'CTRL_C') { terminate(); }
});

term.on('mouse', function (name, data) {
  console.log("'mouse' event:", data.x, data.y);
  if (data.x >= 10) {
    console.log('x >= 10');
    term.clear();
    // term.grabInput(false);
  }
});
