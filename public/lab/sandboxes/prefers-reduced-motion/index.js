/*
  CHEATSHEET
  
  Check the value of the media query in JavaScript:
  
  const isMotionEnabled = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
*/

import { random, range } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const FADE_DURATION = 1000;
const FADE_DELAY = 300;

window.addEventListener('click', (event) => {
  const isMotionEnabled = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;

  if (!isMotionEnabled) return 
  
  const x = event.clientX;
  const y = event.clientY;

  const particles = [];

  range(5).forEach(() => {
    const particle = document.createElement('img');
    particle.setAttribute('src', 'https://sandpack-bundler.vercel.app/img/wand-sparkle.svg');
    particle.setAttribute('alt', '');
    particle.setAttribute('aria-hidden', 'true');
    particle.classList.add('star');

    particle.style.top = y + 'px';
    particle.style.left = x + 'px';

    const angle = random(225 - 20, 225 + 20);
    const distance = random(30, 60);
    const rotation = random(90, 360);

    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');
    particle.style.setProperty('--rotation', rotation + 'deg');

    particle.style.setProperty('--fade-duration', FADE_DURATION + 'ms');
    particle.style.setProperty('--fade-delay', FADE_DELAY + 'ms');

    document.body.appendChild(particle);
    particles.push(particle);
  });

  window.setTimeout(
    () => {
      particles.forEach((particle) => {
        particle.remove();
      });
    },
    FADE_DURATION + FADE_DELAY + 200
  );
});
