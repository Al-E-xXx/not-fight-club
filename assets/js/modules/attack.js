import { playSound, getRandomInt } from './common.js';

export function attack() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  GAME.isInBattle = true;

  console.log('Attack!!!');

  const enemyAttacsCount = GAME.enemies[GAME.currentEnemyId].attackCount;
  const enemyDefencesCount = GAME.enemies[GAME.currentEnemyId].defenseCount;

  // Clear Zones
  for (const key in GAME.enemyAttackZones) {
    GAME.enemyAttackZones[key] = 0;
  }

  for (const key in GAME.enemyDefenceZones) {
    GAME.enemyDefenceZones[key] = 0;
  }

  let zones = Array.from(GAME.zones);
  for (let i = 0; i < enemyAttacsCount; i++) {
    const zonesCount = zones.length;
    const randomIndex = getRandomInt(0, zonesCount - 1);
    const attackZone = zones[randomIndex];

    console.log('randomIndex:', randomIndex);
    console.log('attackZone:', attackZone);

    GAME.enemyAttackZones[attackZone] = 10;
    zones.splice(randomIndex, 1);

    console.log('GAME.enemyAttackZones: ', GAME.enemyAttackZones);
  }

  zones = Array.from(GAME.zones);
  for (let i = 0; i < enemyDefencesCount; i++) {
    const zonesCount = zones.length;
    const randomIndex = getRandomInt(0, zonesCount - 1);
    const defenceZone = zones[randomIndex];

    console.log('randomIndex:', randomIndex);
    console.log('defenceZone:', defenceZone);

    GAME.enemyDefenceZones[defenceZone] = 10;
    zones.splice(randomIndex, 1);

    console.log('GAME.enemyDefenceZones: ', GAME.enemyDefenceZones);
  }

  // Hero Attack!
  const enemyHealthCrrentEl = document.getElementById(
    'enemy-health-current-value'
  );
  const healthBarFillEl = document.getElementById('enemy-health-fill');
  const logEl = document.getElementById('log');
  const winEl = document.getElementById('wins');
  for (const key in GAME.attackZones) {
    let log = '';
    let damage = 0;

    console.log('GAME.attackZones[key]: ', GAME.attackZones[key]);

    if (
      GAME.attackZones[key] > 0 &&
      GAME.attackZones[key] === GAME.enemyDefenceZones[key]
    ) {
      log = `<p><b>${GAME.characterName}</b> attacked <b>${
        GAME.enemies[GAME.currentEnemyId].name
      }</b> to ${key} but <b>${
        GAME.enemies[GAME.currentEnemyId].name
      }</b> was able to protect his <b>${key}</b>!`;
    }

    if (
      GAME.attackZones[key] > 0 &&
      GAME.attackZones[key] > GAME.enemyDefenceZones[key]
    ) {
      damage = GAME.attackZones[key] - GAME.enemyDefenceZones[key];

      log = `<p><b>${GAME.characterName}</b> attacked <b>${
        GAME.enemies[GAME.currentEnemyId].name
      }</b> to <b>${key}</b> and deal ${damage} damage!</p>`;
    }

    // Log
    logEl.insertAdjacentHTML('beforeend', log);
    logEl.scrollTop = logEl.scrollHeight;
    GAME.log += log;

    // User Win!
    if (damage > 0) {
      GAME.enemyCurrentHealth -= damage;
      if (GAME.enemyCurrentHealth <= 0) {
        GAME.enemyCurrentHealth = 0;
      }
      enemyHealthCrrentEl.textContent = GAME.enemyCurrentHealth;

      const enemyHealth = GAME.enemies[GAME.currentEnemyId].health;
      const percentage = (GAME.enemyCurrentHealth / enemyHealth) * 100;
      healthBarFillEl.style.width = `${percentage}%`;

      const winPopup = document.getElementById('popup-win');
      const popupWinTextEl = document.getElementById('popup-win-text');
      const attackBtn = document.getElementById('attack');

      if (GAME.enemyCurrentHealth === 0) {
        GAME.isInBattle = false;

        log = `<b>${
          GAME.enemies[GAME.currentEnemyId].name
        }</b> bleeds and crawls away to Hell!`;

        GAME.wins++;
        GAME.log = '';
        logEl.innerHTML = '';
        winEl.textContent = GAME.wins;
        playSound('win');
        winPopup.classList.remove('hidden');
        popupWinTextEl.innerHTML = log;
        attackBtn.classList.add('disabled');
      }
    }

    console.log('log: ', log);
    console.log('damage: ', damage);
  }

  localStorage.setItem('game1349', JSON.stringify(GAME));
}
