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
register();
homeInit();
charBtnListener();
settingsInit();

/*--- Before reload page ---*/
window.addEventListener('beforeunload', function (e) {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  GAME.isSetBattleListeners = false;

  localStorage.setItem('game1349', JSON.stringify(GAME));
});
