import { changeScreen } from './common.js';
import { battleInit } from './battle.js';

export function homeInit() {
  const homeBtn = document.getElementById('home-btn');
  const homeScrn = document.getElementById('home');

  homeBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    if (!GAME || !homeScrn.classList.contains('hidden')) return;

    changeScreen(homeScrn);
  });

  const fightBtn = document.getElementById('fight-btn');
  const battleScrn = document.getElementById('battle');

  fightBtn.addEventListener('click', () => {
    battleInit();
    changeScreen(battleScrn);
  });
}
