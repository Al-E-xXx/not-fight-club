import { changeScreen, changeName } from './common.js';
import { characters, enemies, attackZones, defenceZones } from './settings.js';

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
      GAME.isInBattle = false;
      GAME.isSetBattleListeners = false;
      GAME.characterName = characterName;
      GAME.activeChar = 'angel';
      GAME.wins = 0;
      GAME.loses = 0;
      GAME.charCurrentHealth = characters[GAME.activeChar].health;
      GAME.attackZones = attackZones;
      GAME.defenceZones = defenceZones;
      GAME.currentEnemyId = 0;
      GAME.enemyCurrentHealth = enemies[GAME.currentEnemyId].health;
      GAME.characters = characters;
      GAME.enemies = enemies;

      localStorage.setItem('game1349', JSON.stringify(GAME));

      changeName(characterName);
      changeScreen(homeScrn);
    }
  });
}
