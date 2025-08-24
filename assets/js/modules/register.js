import { changeScreen, changeName } from './common.js';
import { characters } from './settings.js';

export function register() {
  const GAME = JSON.parse(localStorage.getItem('game1349')) || {};
  const registerScrn = document.getElementById('register');
  const homeScrn = document.getElementById('home');

  const inputName = document.getElementById('name');
  const registerBtn = document.getElementById('register-btn');

  if (
    !GAME ||
    Object.keys(GAME).length === 0 ||
    !GAME.hasOwnProperty('characterName') ||
    GAME.characterName.length < 3
  ) {
    changeScreen(registerScrn);
  } else {
    changeName(GAME.characterName);
    changeScreen(homeScrn);
  }

  registerBtn.addEventListener('click', () => {
    const characterName = inputName.value;
    if (
      characterName &&
      characterName.length > 1 &&
      characterName.length < 16
    ) {
      GAME.characterName = characterName;
      GAME.activeChar = 'angel';
      GAME.wins = 0;
      GAME.loses = 0;
      GAME.characters = characters;

      localStorage.setItem('game1349', JSON.stringify(GAME));

      changeName(characterName);
      changeScreen(homeScrn);
    }
  });
}
