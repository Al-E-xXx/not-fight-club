import { playSound } from './modules/common.js';
import { register } from './modules/register.js';

/*--- Buttons Sound ---*/
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('mousedown', () => {
    playSound('clickSound');
  });
});

/*--- Inits ---*/
register();
