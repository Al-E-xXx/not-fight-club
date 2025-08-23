import { changeScreen } from './common.js';

export function homeInit() {
  const homeBtn = document.getElementById('home-btn');
  const homeScrn = document.getElementById('home');

  homeBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    if (!GAME || !homeScrn.classList.contains('hidden')) return;

    changeScreen(homeScrn);
  });
}
