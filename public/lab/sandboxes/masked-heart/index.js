import { exponentialNormalize } from "./utils.js";


const btn = document.querySelector('.like-btn');
const heartFill = document.querySelector('.fill')

const MAX_NUM_OF_LIKES = 10;
let numOfLikes = 0;

heartFill.style.y = 22

btn.addEventListener('click', () => {
  numOfLikes += 1;

  // When the button is fully liked and the user clicks,
  // reset back to zero. This is done purely to make
  // development easier, this isn’t really a feature
  if (numOfLikes > MAX_NUM_OF_LIKES) {
    numOfLikes = 0;
  }

  const fillRatio = numOfLikes / MAX_NUM_OF_LIKES;
  
  // TODO: use `fillRatio` to control the perceived
  // fill amount.
  // (0 = empty, 1 = full)
  heartFill.style.y = exponentialNormalize(fillRatio, 0, 1, 22, 4, 0.5)
});
