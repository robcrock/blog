import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const btn = document.querySelector('.particleButton');

const FADE_DURATION = 1000;
const NUM_OF_PARTICLES = 25;
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

    let angle = normalize(index, 0, NUM_OF_PARTICLES, 0, 360);
    angle += random(-JITTER, JITTER);
    
    const distance = random(32, 64);


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

const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
};
