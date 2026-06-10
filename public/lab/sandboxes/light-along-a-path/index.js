const button = document.getElementById('play');
const circle = document.querySelector('.circle');

button.addEventListener('click', () => {
  circle.classList.add('active');
});

circle.addEventListener('animationend', () => {
  circle.classList.remove('active');
});
