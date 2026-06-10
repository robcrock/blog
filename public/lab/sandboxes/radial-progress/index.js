import { normalize } from './utils.js';

const slider = document.querySelector('#progressSlider');
const bigNumber = document.querySelector('.bigNumber');
const progressIndicator = document.querySelector('.progressIndicator');

function handleChange(ev) {
  const progress = Number(ev.target.value);
  
  bigNumber.innerText = progress + '%';
  progressIndicator.style.strokeDashoffset = normalize(progress, 0, 100, 100, 0)
}

slider.addEventListener('input', handleChange);
