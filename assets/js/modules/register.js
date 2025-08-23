import { changeScreen } from './common.js';

export function register() {
  const GAME = JSON.parse(localStorage.getItem('game1349')) || {};
  const registerScrn = document.getElementById('register');
  const homeScrn = document.getElementById('home');

  const inputName = document.getElementById('name');
  const registerBtn = document.getElementById('register-btn');
  const homeScrnCharacterName = document.getElementById('character-name');

  if (
    !GAME ||
    Object.keys(GAME).length === 0 ||
    !GAME.hasOwnProperty('characterName') ||
    GAME.characterName.length < 3
  ) {
    changeScreen(registerScrn);
  } else {
    homeScrnCharacterName.textContent = GAME.characterName;
    changeScreen(homeScrn);
  }

  registerBtn.addEventListener('click', () => {
    const characterName = inputName.value;
    if (characterName && characterName.length > 2) {
      console.log('Registering player:', characterName);

      homeScrnCharacterName.textContent = characterName;

      changeScreen(homeScrn);

      GAME.characterName = characterName;
      localStorage.setItem('game1349', JSON.stringify(GAME));
    }
  });
}
