const btn = document.querySelector('button');
const balls = [...document.querySelectorAll('.ball')];

let isPlaying = true;

btn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  
  balls.forEach((ball) => {
    ball.style.animationPlayState = isPlaying ? 'running' : 'paused';
  });
});
