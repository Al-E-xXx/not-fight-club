import { playSound } from './modules/common.js';
import { register } from './modules/register.js';
import { charBtnListener } from './modules/characters.js';
import { homeInit } from './modules/home.js';
import { settingsInit } from './modules/settings-scrn.js';

/*--- Buttons Sound ---*/
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('mousedown', () => {
    playSound('clickSound');
  });
});

/*--- Init ---*/
// register();
// homeInit();
// charBtnListener();
// settingsInit();
