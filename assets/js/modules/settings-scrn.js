import { changeScreen, changeName } from './common.js';

export function settingsInit() {
  const settingsScrn = document.getElementById('settings');
  const settingsBtn = document.getElementById('settings-btn');
  const changeNameBtn = document.getElementById('change-name-btn');
  const changeNameInput = document.getElementById('change-name');

  settingsBtn.addEventListener('click', () => {
    const GAME = JSON.parse(localStorage.getItem('game1349'));
    if (!GAME || !settingsScrn.classList.contains('hidden')) {
      return;
    }

    changeScreen(settingsScrn);
  });

  changeNameBtn.addEventListener('click', () => {
    const newName = changeNameInput.value;
    const homeScrn = document.getElementById('home');

    if (newName && newName.length > 1 && newName.length < 16) {
      changeName(newName);
      changeScreen(homeScrn);
    }
  });
}
