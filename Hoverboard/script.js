"use strict";

const board = document.querySelector('#board'),
      SQUARES_NUMBER = 500,
      colors = ['#DC143C', '#00FFFF', '#FFD700', '#7CFC00', '#FF1493'];

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', setColor);

    square.addEventListener('mouseleave', removeColor);

    board.append(square);
}   

function setColor(event) {
    const color = getRandomColor(),
          element = event.target;
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(event) {
    const element = event.target;
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`;    
}

function getRandomColor() {
   return colors[ Math.floor(Math.random() * colors.length)];
}