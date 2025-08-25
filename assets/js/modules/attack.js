import { playSound, getRandomInt } from './common.js';

export function attack() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  GAME.isInBattle = true;

  // console.log('Attack!!!');

  const enemyAttacsCount = GAME.enemies[GAME.currentEnemyId].attackCount;
  const enemyDefencesCount = GAME.enemies[GAME.currentEnemyId].defenseCount;
  const enemyFortune = 100 / GAME.enemies[GAME.currentEnemyId].fortune;

  // Clear Zones
  for (const key in GAME.enemyAttackZones) {
    GAME.enemyAttackZones[key] = 0;
  }

  for (const key in GAME.enemyDefenceZones) {
    GAME.enemyDefenceZones[key] = 0;
  }

  // Generate Enemy Attacks
  let zones = Array.from(GAME.zones);
  for (let i = 0; i < enemyAttacsCount; i++) {
    const zonesCount = zones.length;
    const randomIndex = getRandomInt(0, zonesCount - 1);
    const attackZone = zones[randomIndex];
    const fortuneRandom = getRandomInt(1, enemyFortune);

    let multiplier = 1;
    if (fortuneRandom === 1) {
      multiplier = 1.5;
    }

    // console.log('randomIndex:', randomIndex);
    // console.log('attackZone:', attackZone);

    GAME.enemyAttackZones[attackZone] = 10 * multiplier;
    zones.splice(randomIndex, 1);

    // console.log('GAME.enemyAttackZones: ', GAME.enemyAttackZones);
  }

  // Generate Enemy Defences
  zones = Array.from(GAME.zones);
  for (let i = 0; i < enemyDefencesCount; i++) {
    const zonesCount = zones.length;
    const randomIndex = getRandomInt(0, zonesCount - 1);
    const defenceZone = zones[randomIndex];

    // console.log('randomIndex:', randomIndex);
    // console.log('defenceZone:', defenceZone);

    GAME.enemyDefenceZones[defenceZone] = 10;
    zones.splice(randomIndex, 1);

    // console.log('GAME.enemyDefenceZones: ', GAME.enemyDefenceZones);
  }

  // Hero Attack!
  const enemyHealthCrrentEl = document.getElementById(
    'enemy-health-current-value'
  );
  const healthBarFillEl = document.getElementById('enemy-health-fill');
  const logEl = document.getElementById('log');
  const winEl = document.getElementById('wins');

  const charCurrentHealthEl = document.getElementById('health-current-value');
  const charHealthBarFillEl = document.getElementById('char-health-fill');
  const loseEl = document.getElementById('loses');

  for (const key in GAME.attackZones) {
    let log = '';
    let damage = 0;

    // console.log('GAME.attackZones[key]: ', GAME.attackZones[key]);

    if (
      GAME.attackZones[key] > 0 &&
      GAME.attackZones[key] === GAME.enemyDefenceZones[key]
    ) {
      log = `<p><b>${GAME.characterName}</b> attacked <b>${
        GAME.enemies[GAME.currentEnemyId].name
      }</b> to <b>${key}</b> but <b>${
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
      }</b> to <b>${key}</b> and deal <b>${damage}</b> damage!</p>`;
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

        console.log('Before Incr W GAME.wins: ', window.win);
        console.log('Before Incr W GAME.loses: ', window.los);

        window.win = window.win + 1;

        console.log('After Incr W GAME.wins: ', window.win);
        console.log('After Incr W GAME.loses: ', window.los);
        GAME.log = '';
        logEl.innerHTML = '';
        winEl.textContent = GAME.wins;
        loseEl.textContent = GAME.loses;
        playSound('win');
        winPopup.classList.remove('hidden');
        popupWinTextEl.innerHTML = log;
        log = '';
        attackBtn.classList.add('disabled');
        GAME.charCurrentHealth = GAME.characters[GAME.activeChar].health;
        charHealthBarFillEl.style.width = '100%';
      }
    }

    // console.log('log: ', log);
    // console.log('damage: ', damage);
  }

  // Enemy Attack!
  for (const key in GAME.enemyAttackZones) {
    let log = '';
    let damage = 0;

    // console.log('GAME.attackZones[key]: ', GAME.enemyAttackZones[key]);

    if (
      GAME.enemyAttackZones[key] > 0 &&
      GAME.enemyAttackZones[key] === GAME.defenceZones[key]
    ) {
      log = `<p><b>${GAME.enemies[GAME.currentEnemyId].name}</b> attacked <b>${
        GAME.characterName
      }</b>  to <b>${key}</b> but <b>${
        GAME.characterName
      }</b> was able to protect his <b>${key}</b>!</p>`;
    } else if (GAME.enemyAttackZones[key] > 0 && GAME.defenceZones[key] === 0) {
      damage = GAME.enemyAttackZones[key] - GAME.defenceZones[key];

      if (damage === 10) {
        log = `<p><b>${
          GAME.enemies[GAME.currentEnemyId].name
        }</b> attacked <b>${
          GAME.characterName
        }</b> to <b>${key}</b> and deal <b>${damage}</b> damage!</p>`;
      }
      if (damage > 10) {
        log = `<p><b>${
          GAME.enemies[GAME.currentEnemyId].name
        }</b> attacked <b>${GAME.characterName}</b> to <b>${key}</b>. <b>${
          GAME.enemies[GAME.currentEnemyId].name
        }</b> is lucky and deal <b>${damage}</b> damage!</p>`;
      }
    } else if (
      GAME.enemyAttackZones[key] > 0 &&
      GAME.enemyAttackZones[key] > GAME.defenceZones[key]
    ) {
      damage = GAME.enemyAttackZones[key] - GAME.defenceZones[key];

      log = `<p><b>${GAME.enemies[GAME.currentEnemyId].name}</b> attacked <b>${
        GAME.characterName
      }</b> to <b>${key}</b>. <b>${
        GAME.characterName
      }</b> tried to block but <b>${
        GAME.enemies[GAME.currentEnemyId].name
      }</b> was very lucky and crit his oppenent for <b>${
        damage + 10
      }</b> damage!`;
    }

    // Log
    logEl.insertAdjacentHTML('beforeend', log);
    logEl.scrollTop = logEl.scrollHeight;
    GAME.log += log;

    // User Lose!
    if (damage > 0) {
      GAME.charCurrentHealth -= damage;
      if (GAME.charCurrentHealth <= 0) {
        GAME.charCurrentHealth = 0;
      }
      charCurrentHealthEl.textContent = GAME.charCurrentHealth;

      const charHealth = GAME.characters[GAME.activeChar].health;
      const percentage = (GAME.charCurrentHealth / charHealth) * 100;
      charHealthBarFillEl.style.width = `${percentage}%`;

      const losePopup = document.getElementById('popup-lose');
      const popupLoseTextEl = document.getElementById('popup-lose-text');
      const attackBtn = document.getElementById('attack');

      if (GAME.charCurrentHealth === 0) {
        GAME.isInBattle = false;

        log = `You writhe in pain and die while <b>${
          GAME.enemies[GAME.currentEnemyId].name
        }</b> mocks you!`;

        console.log('Before Incr L GAME.wins: ', GAME.wins);
        console.log('Before Incr L GAME.loses: ', window.los);

        window.los = window.los + 1;

        console.log('After Incr L GAME.wins: ', GAME.wins);
        console.log('After Incr L GAME.loses: ', window.los);
        GAME.log = '';
        logEl.innerHTML = '';
        winEl.textContent = GAME.wins;
        loseEl.textContent = GAME.loses;
        playSound('lose');
        losePopup.classList.remove('hidden');
        popupLoseTextEl.innerHTML = log;
        log = '';
        attackBtn.classList.add('disabled');
        GAME.charCurrentHealth = GAME.characters[GAME.activeChar].health;
        charHealthBarFillEl.style.width = '100%';
      }
    }
  }

  // Save in LS
  GAME.wins = window.win;
  GAME.loses = window.los;
  localStorage.setItem('game1349', JSON.stringify(GAME));

  console.log('End GAME.wins: ', GAME.wins);
  console.log('End GAME.loses: ', GAME.loses);
}
