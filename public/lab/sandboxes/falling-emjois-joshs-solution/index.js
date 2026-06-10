import { random, range, sample } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const emojis = ["🎉", "☕", "🎊", "👍", "💸"];

const wrapper = document.querySelector(".emojiWrapper");

window.setInterval(() => {
  const particle = document.createElement("div");
  particle.classList.add("emoji");
  particle.setAttribute("aria-hidden", "true");
  particle.innerText = sample(emojis);

  const animationDuration = random(1000, 2000);

  particle.style.left = random(0, 100) + "%";
  particle.style.animationDuration = animationDuration + "ms";

  wrapper.appendChild(particle);

  window.setTimeout(() => {
    particle.remove();
  }, animationDuration + 200);
}, 200);
