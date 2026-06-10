import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const btn = document.querySelector('.particleButton');

const FADE_DURATION = 1000;
const MAGNITUDE = 50;

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  if (!isLiked) {
    return;
  }

  range(5).forEach(() => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    btn.appendChild(particle);

    const x = random(-MAGNITUDE, MAGNITUDE);
    const y = random(-MAGNITUDE, MAGNITUDE);

    particle.style.setProperty('--x', x + 'px');
    particle.style.setProperty('--y', y + 'px');
    particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');

    window.setTimeout(() => {
      particle.remove();
    }, FADE_DURATION + 200)
  });
});
