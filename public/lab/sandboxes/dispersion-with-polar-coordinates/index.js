import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const btn = document.querySelector('.particleButton');

const FADE_DURATION = 1000;

btn.addEventListener('click', () => {
  btn.classList.toggle('liked');

  const isLiked = btn.classList.contains('liked');
  if (!isLiked) {
    return;
  }

  const particles = [];
  range(5).forEach(() => {
    const particle = document.createElement('span');
    particle.classList.add('particle');

    const angle = random(0, 360);
    const distance = random(32, 64);

    // Convert polar to cartesian here, using the
    // provided utility functions
    const [x, y] = convertPolarToCartesian(angle, distance);

    // Everything else stays the same
    particle.style.setProperty('--x', x + 'px');
    particle.style.setProperty('--y', y + 'px');

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



const convertPolarToCartesian = (angle, distance) => {
  const angleInRadians = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;
