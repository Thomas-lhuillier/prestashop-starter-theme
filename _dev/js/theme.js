/**
 * @license
 * @author: Thomas L'huillier
 *
 * This comment should be preserved in production mode.
 */

import '../css/theme.scss';

/**
 * This one will we removed.
 */

class Droid {
  constructor(name = undefined) {
    this.name = name;
    this.say(`Hi, I'm ${this.name}.\nWhat can I do for you?`);
  }

  say(str) {
    console.log(str);
  }
}

if (true && false) {
  // webpack will drop this unreachable code
  console.log('useless code here');
  let d1 = new Droid('R2-D2');
}

console.log('This console log will be dropped in production mode.');

let d2 = new Droid('E-3PO');
