import { random } from "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm";


const path1 = document.querySelector('.line.one');
const path2 = document.querySelector('.line.two');
const path3 = document.querySelector('.line.three');

const paths = [path1, path2, path3];

// TODO
paths.forEach((path, index) => {
  const totalLength = path.getTotalLength();
  
  path.style.setProperty('--total-length', totalLength + 'px');
  path.style.setProperty('--curcuit-duration', totalLength * 15 + 'ms')
  path.style.setProperty('--circuit-delay', random(0, 500) + index * 200 + 'ms');

  path.style.setProperty('--grow-shrink-duration', random(1500, 5000) + 'ms');
})

/*
  PATH CHEATSHEET
  
  Getting the length of a path:
    path.getTotalLength();
  
  Setting stroke attributes in JavaScript:
    path.style.strokeDasharray = '10px, 1000px';
    path.style.strokeDashoffset = '20px';
*/
