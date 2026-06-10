let isPlaying = true;

const lines = [...document.querySelectorAll('path')];
document.querySelector('button').addEventListener('click', () => {
  isPlaying = !isPlaying;
  
  lines.forEach((line) => {
    line.style.animationPlayState = isPlaying ? 'running' : 'paused';
  });
});
