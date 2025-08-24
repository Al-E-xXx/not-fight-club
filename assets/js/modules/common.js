export function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.volume = 0.3;
  sound.currentTime = 0;
  sound.play().catch((e) => {
    console.log('Sound playback error: ', e);
  });
}

export function changeScreen(showElement) {
  const headerInfo = document.getElementById('header-info');
  const title = showElement.dataset.title;
  const currentScreen = document.querySelector('.screen:not(.hidden)');

  headerInfo.textContent = title;

  if (!currentScreen) {
    showElement.classList.remove('hidden');
  } else {
    currentScreen.classList.add('hidden');
    currentScreen.addEventListener(
      'transitionend',
      () => {
        showElement.classList.remove('hidden');
      },
      { once: true }
    );
  }
}

export function changeName(name) {
  const GAME = JSON.parse(localStorage.getItem('game1349'));
  const nameElements = document.querySelectorAll('.character-name');
  const changeNameInput = document.getElementById('change-name');

  nameElements.forEach((element) => {
    element.textContent = name;
  });

  changeNameInput.value = name;

  GAME.characterName = name;
  localStorage.setItem('game1349', JSON.stringify(GAME));
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
