export function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.volume = 0.3;
  sound.currentTime = 0;
  sound.play().catch((e) => {
    console.log('Sound playback error: ', e);
  });
}

export function changeScreen(showElement, hideElement) {
  if (!hideElement) {
    showElement.classList.remove('hidden');
  } else {
    hideElement.classList.add('hidden');
    hideElement.addEventListener(
      'transitionend',
      () => {
        showElement.classList.remove('hidden');
      },
      { once: true }
    );
  }
}
