import { random, range, sample } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const COLORS = [
  'hsl(35deg 100% 50%)',
  'hsl(40deg 100% 50%)',
  'hsl(45deg 100% 60%)',
  'hsl(50deg 100% 65%)',
];
const FADE_DURATION = 500;
const FADE_DELAY = 500;

const wrapper = document.querySelector('.rocketWrapper');

window.setInterval(() => {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.backgroundColor = sample(COLORS);

  const angle = random(90 - 30, 90 + 30);
  const distance = random(60, 100);

  const [x, y] = convertPolarToCartesian(angle, distance);
  particle.style.setProperty('--x', x + 'px');
  particle.style.setProperty('--y', y + 'px');
  particle.style.setProperty(
    '--fade-duration',
    FADE_DURATION + 'ms'
  );
  particle.style.setProperty(
    '--fade-delay',
    FADE_DELAY + 'ms'
  );

  wrapper.prepend(particle);

  window.setTimeout(
    () => {
      particle.remove();
    },
    FADE_DURATION + FADE_DELAY + 200
  );
}, 50);

const convertPolarToCartesian = (angle, distance) => {
  const angleInRadians = convertDegreesToRadians(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

const convertDegreesToRadians = (angle) =>
  (angle * Math.PI) / 180;
