const buttonElement = document.querySelector("button");
const circleElement = document.querySelector("circle");

const linearFunction = (timeElapsed) => {
  return timeElapsed;
};

const animate = ({ to, duration, onUpdate }) => {
  let startTime = null;

  const animateFrame = (timestamp) => {
    if (!startTime) startTime = timestamp;

    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const x = progress * to;

    onUpdate(x);

    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    }
  };

  requestAnimationFrame(animateFrame);
};

buttonElement.addEventListener("click", () => {
  animate({
    to: 100,
    duration: 1000,
    onUpdate: (value) => {
      circleElement.setAttribute("cx", value);
    },
  });
});
