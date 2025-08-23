import { changeScreen } from './common.js';
import { playSound } from './common.js';

export function charactersInit() {
  const GAME = JSON.parse(localStorage.getItem('game1349'));

  if (!GAME) return;

  if (GAME.characters) {
    const characterImg = document.querySelector('.character-img');
    const anotherCharacters = document.querySelectorAll('.another-character');
    const charWin = document.getElementById('wins');
    const charLose = document.getElementById('loses');

    // Restore From LocalStorage
    characterImg.src = GAME.characters[GAME.activeChar].src;
    delActiveClass();

    if (GAME.wins) {
      charWin.textContent = GAME.wins;
    } else {
      charWin.textContent = '0';
    }

    if (GAME.loses) {
      charLose.textContent = GAME.loses;
    } else {
      charLose.textContent = '0';
    }

    anotherCharacters.forEach((character) => {
      // Restore From LocalStorage
      if (character.dataset.char == GAME.activeChar) {
        character.classList.add('active');
      }

      character.addEventListener('click', () => {
        if (character.classList.contains('active')) {
          return;
        } else {
          playSound('clickSound');
          delActiveClass();
          character.classList.add('active');

          const charName = character.getAttribute('data-char');
          GAME.activeChar = charName;

          characterImg.src = GAME.characters[charName].src;

          localStorage.setItem('game1349', JSON.stringify(GAME));

          console.log(charName);
        }
      });
    });
  }
}

export function charBtnListener() {
  const charBtn = document.getElementById('user-btn');
  const charScreen = document.getElementById('character');

  charBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    if (!GAME || !charScreen.classList.contains('hidden')) return;

    charactersInit();
    changeScreen(charScreen);
  });
}

function delActiveClass() {
  const activeClass = document.querySelector('.active');
  if (activeClass) {
    activeClass.classList.remove('active');
  }
}
