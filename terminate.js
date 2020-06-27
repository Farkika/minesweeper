const term = require('terminal-kit').terminal;

const terminate = () => {
  term.grabInput(false);
  setTimeout(function () { process.exit(); }, 100);
};

module.exports = {
  terminate
};
