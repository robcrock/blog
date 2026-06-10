const btn = document.querySelector('.pop-btn');

btn.addEventListener('click', () => {
  const isFirstClick = !btn.classList.contains('popped');

  if (isFirstClick) {
    btn.classList.add('popped');
  } else {
    // On subsequent clicks, the button will already have
    // the “popped” class, so we need to remove it before
    // re-adding it.
    // I set it up this way so that it’d be easier to work
    // on, so you didn’t have to click twice to retrigger
    // the animation. ❤️
    btn.classList.remove('popped');
    window.requestAnimationFrame(() => {
      btn.classList.add('popped');
    });
  }
});
