const button = document.querySelector("button");

button.addEventListener("click", () => {
  const isPressed = button.getAttribute("aria-pressed") === "true";
  button.setAttribute("aria-pressed", String(!isPressed));
});
