import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const btn = document.querySelector('.particleButton');

// Our “source of truth” for the animation’s fade duration.
// This ensures that the cleanup timeout will never fire
// before the animation has completed.
const FADE_DURATION = 1000;

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  if (!btn.classList.contains('liked')) {
    return;
  }

  // We’ll collect all freshly-created particles in this array:
  const particles = [];

  range(5).forEach(() => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    particle.style.top = random(0, 100) + '%';
    particle.style.left = random(0, 100) + '%';

    // Set the fade duration through an inline style,
    // so that we can use our “source of truth”:
    particle.style.animationDuration = FADE_DURATION + 'ms';

    btn.appendChild(particle);

    // Keep track of this particle, so that it can be cleaned up:
    particles.push(particle);
  });

  // Schedule a timeout that will destroy all freshly-created
  // particles after the animation has completed:
  window.setTimeout(() => {
    particles.forEach((particle) => {
      particle.remove();
    });

    // We add 200ms to really be 100% sure that the cleanup
    // function won’t interrupt the fade-out animation:
  }, FADE_DURATION + 200);
});
