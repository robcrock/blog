import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const btn = document.querySelector('.particleButton');

const FADE_DURATION = 1000;
const NUM_OF_PARTICLES = 5;
// `JITTER` is the amount of variance allowed for each angle.
// Tweak this value to control how orderly/chaotic the animation appears.
const JITTER = 40;

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  if (!isLiked) {
    return;
  }

  const particles = [];
  range(NUM_OF_PARTICLES).forEach((index) => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    // Divide the 360° field into equally-sliced wedges,
    // and grab N wedges, where N is the particle’s index.
    // Then, adjust the angle by a random amount specified
    // by JITTER.
    const angle =
      (360 / NUM_OF_PARTICLES) * index +
      random(-JITTER, JITTER);
    const distance = random(32, 64);


    // Everything else is unchanged below this point.
    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');

    particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');

    btn.appendChild(particle);
    particles.push(particle);
  });
  
  window.setTimeout(() => {
    particles.forEach((particle) => {
      particle.remove();
    });
  }, FADE_DURATION + 200);
});
