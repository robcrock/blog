import bezierEasing from 'https://cdn.jsdelivr.net/npm/bezier-easing@2.1.0/+esm'
    
const buttonElement = document.querySelector('button');
const gElement = document.querySelector('g.items');

buttonElement.addEventListener('click', () => {
  animate({
    from: 0,
    to: -120,
    duration: 1000,
    onUpdate: (value) => {
      gElement.setAttribute('transform', `translate(${value} 0)`);
    },
  });
});

// ---

const ease = bezierEasing(0.25, 0.1, 0.25, 1);

const animate = ({ from, to, duration, onUpdate }) => {
  const startTime = document.timeline.currentTime;
  const animateFrame = (timestamp) => {
    const timeElapsed = timestamp - startTime;
    const progress = ease(Math.min(timeElapsed / duration, 1));
    const x = progress * (to - from) + from;
    onUpdate(x);
    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    }
  }
  requestAnimationFrame(animateFrame);
}
