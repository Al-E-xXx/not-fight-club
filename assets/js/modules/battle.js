import { playSound, getRandomInt } from './common.js';

export function battleInit() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  // Data for Character
  const battleCharImg = document.getElementById('battle-char-img');
  const healthValue = document.getElementById('health-value');
  const healthCurrentValue = document.getElementById('health-current-value');

  battleCharImg.src = GAME.characters[GAME.activeChar].src;
  healthValue.textContent = GAME.characters[GAME.activeChar].health;
  healthCurrentValue.textContent = GAME.charCurrentHealth;

  // Data for enemy
  if (GAME.isInBattle === false) {
    const enemyCount = GAME.enemies.length - 1;
    GAME.currentEnemyId = getRandomInt(0, enemyCount);
    GAME.enemyCurrentHealth = GAME.enemies[GAME.currentEnemyId].health;
    localStorage.setItem('game1349', JSON.stringify(GAME));
  }

  const enemyNameEl = document.getElementById('enemy-name');
  const enemyImg = document.getElementById('enemy-img');
  const enemyHealthValueEl = document.getElementById('enemy-health-value');
  const enemyHealthCurrentValueEl = document.getElementById(
    'enemy-health-current-value'
  );

  enemyNameEl.textContent = GAME.enemies[GAME.currentEnemyId].name;
  enemyImg.src = GAME.enemies[GAME.currentEnemyId].src;
  enemyHealthValueEl.textContent = GAME.enemies[GAME.currentEnemyId].health;
  enemyHealthCurrentValueEl.textContent = GAME.enemyCurrentHealth;

  if (GAME.isSetBattleListeners === false) {
    battleListeners();
    GAME.isSetBattleListeners = true;
  }
}

function battleListeners() {
  const checkboxes = document.querySelectorAll(
    '.battle-screen input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      playSound('clickSound');
      console.log('Checkbox state changed!');
    });
  });
}
