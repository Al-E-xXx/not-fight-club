import { playSound, getRandomInt, changeScreen } from './common.js';
import { attack } from './attack.js';
import { charactersInit } from './characters.js';

export function battleInit() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  // Reset CheckBoxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

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
  }

  const enemyNameEl = document.getElementById('enemy-name');
  const enemyImg = document.getElementById('enemy-img');
  const enemyHealthValueEl = document.getElementById('enemy-health-value');
  const enemyHealthCurrentValueEl = document.getElementById(
    'enemy-health-current-value'
  );
  const healthBarFillEl = document.getElementById('enemy-health-fill');
  const percentage =
    (GAME.enemyCurrentHealth / GAME.enemies[GAME.currentEnemyId].health) * 100;
  const logEl = document.getElementById('log');

  enemyNameEl.textContent = GAME.enemies[GAME.currentEnemyId].name;
  enemyImg.src = GAME.enemies[GAME.currentEnemyId].src;
  enemyHealthValueEl.textContent = GAME.enemies[GAME.currentEnemyId].health;
  enemyHealthCurrentValueEl.textContent = GAME.enemyCurrentHealth;
  healthBarFillEl.style.width = `${percentage}%`;
  logEl.innerHTML = GAME.log;

  if (GAME.isSetBattleListeners === false) {
    battleListeners();
    GAME.isSetBattleListeners = true;
  }

  localStorage.setItem('game1349', JSON.stringify(GAME));
}

/*--- Listeners ---*/
function battleListeners() {
  const checkboxes = document.querySelectorAll(
    '.battle-screen input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      console.log('Checkbox clicked');
      playSound('clickSound');
      checkConditions();
    });
  });

  const attackBtn = document.getElementById('attack');

  attackBtn.addEventListener('click', () => {
    attack();
  });

  // For winPopUp
  const winPopup = document.getElementById('popup-win');
  const winBtn = document.getElementById('win-btn');
  const characterScrn = document.getElementById('character');
  const charHealthBarFillEl = document.getElementById('char-health-fill');
  const healthCurrentValueEl = document.getElementById('health-current-value');
  winBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    GAME.charCurrentHealth = 150;
    winPopup.classList.add('hidden');

    charHealthBarFillEl.style.width = '100%';
    healthCurrentValueEl.textContent = 150;

    localStorage.setItem('game1349', JSON.stringify(GAME));

    charactersInit();
    changeScreen(characterScrn);
  });

  //For losePopUp
  const losePopup = document.getElementById('popup-lose');
  const loseBtn = document.getElementById('lose-btn');

  loseBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    GAME.charCurrentHealth = 150;
    losePopup.classList.add('hidden');

    charHealthBarFillEl.style.width = '100%';
    healthCurrentValueEl.textContent = 150;

    localStorage.setItem('game1349', JSON.stringify(GAME));

    charactersInit();
    changeScreen(characterScrn);
  });
}

function checkConditions() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  const attackCheckBoxes = document.querySelectorAll(
    '.battle-checkboxes-left input[type="checkbox"]:checked'
  );

  const defenseCheckBoxes = document.querySelectorAll(
    '.battle-checkboxes-right input[type="checkbox"]:checked'
  );

  const attackBtn = document.getElementById('attack');

  if (attackCheckBoxes.length === 1 && defenseCheckBoxes.length === 2) {
    // Clear Zones
    for (const key in GAME.attackZones) {
      GAME.attackZones[key] = 0;
    }

    for (const key in GAME.defenceZones) {
      GAME.defenceZones[key] = 0;
    }

    // Set Zones
    attackCheckBoxes.forEach((checkbox) => {
      const checkedVal = checkbox.value;
      GAME.attackZones[checkedVal] = 10;
    });

    defenseCheckBoxes.forEach((checkbox) => {
      const checkedVal = checkbox.value;
      GAME.defenceZones[checkedVal] = 10;
    });

    // Unblock Attack Button
    attackBtn.classList.remove('disabled');
  } else {
    attackBtn.classList.add('disabled');
  }

  localStorage.setItem('game1349', JSON.stringify(GAME));
}
