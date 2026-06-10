import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.23.26/+esm";


const button = document.querySelector('button');
const path = button.querySelector('path');

let isPlaying = false;

function handleClick() {
  isPlaying = !isPlaying;

  const preferReducedMotion = checkPrefersReducedMotion()
  
  const pathElement = document.querySelector("path");

  const pathInstructions = isPlaying ?
    `M 19,12
     L 19,12
     L 5,21
     L 5,3
     Z` :
    `M 21,3
     L 21,21
     L 3,21
     L 3,3
     Z` 

  animate(
    pathElement, 
    { d: pathInstructions }, 
    preferReducedMotion
    ? { duration: 0 }
    : {
        type: 'spring',
        stiffness: 300,
        damping: isPlaying ? 30 : 15,
      }
    )
}

button.addEventListener('click', handleClick);



function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}
