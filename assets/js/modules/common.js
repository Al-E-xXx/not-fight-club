export function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.volume = 0.3;
  sound.currentTime = 0;
  sound.play().catch((e) => {
    console.log('Sound playback error: ', e);
  });
}

export function changeScreen(showElement) {
  const currentScreen = document.querySelector('.screen:not(.hidden)');
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
