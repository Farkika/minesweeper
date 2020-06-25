const gradient = require('gradient-string');

const minesweeper = () => {
  console.log(' __  __ _ ');
  console.log('|  \\/  (_) ');
  console.log('| \\  / |_ _ __   ___  _____      _____  ___ _ __   ___ _ __ ');
  console.log('| |\\/| | | \'_ \\ / _ \\/ __\\ \\ /\\ / / _ \\/ _ \\ \'_ \\ / _ \\ \'__|');
  console.log('| |  | | | | | |  __/\\__  \\ V  V /  __/  __/ |_) |  __/ |   ');
  console.log('|_|  |_|_|_| |_|\\___||___/ \\_/\\_/ \\___|\\___| .__/ \\___|_|   ');
  console.log('                                           | | ');
  console.log('                                           |_| ');
};

const win = () => {
  console.log(gradient.rainbow('   _   _                 _    _  _ _ '));
  console.log(gradient.rainbow('  | \\ | |               | |  /_/| | |'));
  console.log(gradient.rainbow('  |  \\| |_   _  ___ _ __| |_ ___| | |'));
  console.log(gradient.rainbow('  | . ` | | | |/ _ \\ \'__| __/ _ \\ | |'));
  console.log(gradient.rainbow('  | |\\  | |_| |  __/ |  | ||  __/ |_|'));
  console.log(gradient.rainbow('  |_| \\_|\\__, |\\___|_|   \\__\\___|_(_)'));
  console.log(gradient.rainbow('          __/ |                      '));
  console.log(gradient.rainbow('         |___/                       '));
};

const lose = () => {
  console.log((gradient([{ r: 255, g: 0, b: 0 }, { r: 255, g: 0, b: 0 }]))('    ...........      .......        .....       .... ................  '));
  console.log((gradient([{ r: 255, g: 13, b: 0 }, { r: 255, g: 13, b: 0 }]))('  .:k0kxxxxxxxl.    .l0Okk0k;.     .l000d\'.   .c000d.;O000kxxxxxxxxxd, '));
  console.log((gradient([{ r: 255, g: 26, b: 0 }, { r: 255, g: 26, b: 0 }]))('.:O00k;........   .oO0Ko.;k0OO:.  ..oXXXK0d\'.lOKXXXk\':KXX0:.......... '));
  console.log((gradient([{ r: 255, g: 39, b: 0 }, { r: 255, g: 39, b: 0 }]))(':k0Xk;.          .okKXo\'.  .,kX0k:..oNXXXXKOkKXXXXXk\':KXX0;          '));
  console.log((gradient([{ r: 255, g: 52, b: 0 }, { r: 255, g: 52, b: 0 }]))('lXXXd.   ;dddddc.\'kXXKc     .dXXXo..oXXXXXXXXXXXXXXk\':KXXKOxxxxdc.   '));
  console.log((gradient([{ r: 255, g: 65, b: 0 }, { r: 255, g: 65, b: 0 }]))('lXXXd.   .:xKXXk\'\'kXXKkolloldOXXXo..oXKXOllOKo:dKKXk\';0XX0o:::::,   '));
  console.log((gradient([{ r: 255, g: 78, b: 0 }, { r: 255, g: 78, b: 0 }]))('\'cdKOl;.   ;0KKk\'\'kKKKdccccclkKKKl..lKKKd..,:. ;0KKx.;OKKk,         '));
  console.log((gradient([{ r: 255, g: 91, b: 0 }, { r: 255, g: 91, b: 0 }]))(' .cdOkc;;;o000x\' .x00O:     .o000l..c000o.     ;O00x.;O00Ol,,,,,,,,,,. '));
  console.log((gradient([{ r: 255, g: 104, b: 0 }, { r: 255, g: 104, b: 0 }]))('   .:lllllllll:. .:lll.      ;lll,. ,lll;.     .cll:..clllllllllllllc.  '));
  console.log();
  console.log((gradient([{ r: 255, g: 130, b: 0 }, { r: 255, g: 130, b: 0 }]))('  .;:::::::;:\'   .,;:;.      \':;:.  .;;;;:;;;;;::;:,..;;;;:;;;;:;;,.   '));
  console.log((gradient([{ r: 255, g: 143, b: 0 }, { r: 255, g: 143, b: 0 }]))('.,cdo:;;;;;cdl;\'..lddo\'     .:ddd;..;dddl;,,,,,,,,,\'.\'oddo:,,,,;:oo:\'. '));
  console.log((gradient([{ r: 255, g: 156, b: 0 }, { r: 255, g: 156, b: 0 }]))(',olo;.     \'lloc..:lll.      ;lll,. ,lll;            .cll:.     .:llc. '));
  console.log((gradient([{ r: 255, g: 169, b: 0 }, { r: 255, g: 169, b: 0 }]))('\'ccc,      .:cc;..;cc:\'.   ..,::c\'..\':::,......      .;::;.    ..;::;. '));
  console.log((gradient([{ r: 255, g: 182, b: 0 }, { r: 255, g: 182, b: 0 }]))('.;,;\'      .,,,\'...\',,,,...\',,,\'\'. ..,,,,\'\'..\'..     .\',,\'.   .\'\'\'.... '));
  console.log((gradient([{ r: 255, g: 195, b: 0 }, { r: 255, g: 195, b: 0 }]))('.\'\'\'.      .\'\'\'.    ..\'\'\'\'\'\'\'...    .\'\'\'.            ..\'\'\'...\'\'\'.. '));
  console.log((gradient([{ r: 255, g: 208, b: 0 }, { r: 255, g: 208, b: 0 }]))('.\'\'\'.      .\'\'\'.      .\'\'\'\'\'..      .\'\'\'..           ..\'\'.. ..\'\'\'\'.. '));
  console.log((gradient([{ r: 255, g: 221, b: 0 }, { r: 255, g: 221, b: 0 }]))(' ..\'.......\'..         ....        .\'\'\'\'........... ..\'\'..  ...\'\'\'.. '));
  console.log((gradient([{ r: 255, g: 234, b: 0 }, { r: 255, g: 234, b: 0 }]))('    ........                         ..         ..    ..       ..'));
};
module.exports = {
  minesweeper,
  win,
  lose
};
