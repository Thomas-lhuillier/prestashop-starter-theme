/**
 * @license
 * @author: Thomas L'huillier
 *
 * This comment should be preserved in production mode.
 */

/**
 * This one will we removed.
 */

if (true && false) {
  // webpack will drop this unreachable code
  console.log('useless code here');
  new Human('R2-D2');
}

console.log('This console log will be dropped in production mode.');

new Human('E-3PO');

class Droid {
  constructor(name = undefined) {
    this.name = name;
    this.say('Hi');
  }

  say(str) {
    console.log(str);
  }
}
