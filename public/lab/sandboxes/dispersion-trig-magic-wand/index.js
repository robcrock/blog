import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


// We want to clean up the particles once they’ve finished
// fading out, which requires us to know the total duration
// *and* the start delay.
const FADE_DURATION = 1000;
const FADE_DELAY = 300;

window.addEventListener('click', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const particles = [];

  range(5).forEach(() => {
    const particle = document.createElement('img');
    particle.setAttribute('alt', '');
    particle.setAttribute('src', 'https://sandpack-bundler.vercel.app/img/wand-sparkle.svg');
    particle.setAttribute('aria-hidden', 'true');
    particle.classList.add('star');

    particle.style.top = y + 'px';
    particle.style.left = x + 'px';

    const angle = random(225 - 32, 225 + 32);
    const distance = random(45, 90);
    const rotation = random(-90, -360);

    const [offsetX, offsetY] = convertPolarToCartesian(angle, distance)

    particle.style.setProperty('--offsetX', offsetX + 'px');
    particle.style.setProperty('--offsetY', offsetY + 'px');
    particle.style.setProperty('--rotation', rotation + 'deg');

    particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');
    particle.style.setProperty('--fade-delay', FADE_DELAY + 'ms');

    document.body.appendChild(particle);
    particles.push(particle);
  });

  // Cleanup function:
  window.setTimeout(
    () => {
      particles.forEach((particle) => {
        particle.remove();
      });
    },
    // As usual, a small superstitious buffer of 200ms:
    FADE_DURATION + FADE_DELAY + 200
  );
});



// These utility functions are unused in my solution, since
// I do the conversion in CSS, but I’m keeping them here in
// case you wish to use them:
const convertPolarToCartesian = (angle, distance) => {
  const angleInRadians = convertDegreesToRadians(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;
