"use strict";

const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board');

let time = 0,
    score = 0,
    id;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

createButton();

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        id = startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    const timer = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
    return timer;
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
        clearInterval(id);
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    const restart = document.createElement('button');
    restart.classList.add('restart-btn');
    restart.innerHTML = "Main Menu";
    board.append(restart);
    board.addEventListener('click', (event) => {
        if (event.target.classList.contains('restart-btn')) {
            screens.forEach(element => {
                element.classList.remove('up');
            });
            score = 0;
            timeEl.parentNode.classList.remove('hide');
            board.innerHTML = "";
        }
    }, {once: true});
}

function createRandomCircle() {
    const circle = document.createElement('div'),
          size = getRandomNumber(10, 60),
          {width, height} = board.getBoundingClientRect(),
          x = getRandomNumber(0, width - size),
          y = getRandomNumber(0, height - size); 

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor();

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createButton() {
    const list = document.createElement('li');
    list.innerHTML = '<button class="time-btn" data-time="40"> 40 sec</button>';
    timeList.append(list);
}

// Create button step by step
// function createButton() {
//     const btn = document.createElement('button'),
//           list = document.createElement('li');

//     btn.classList.add('time-btn');
//     btn.setAttribute('data-time', 40);
//     btn.innerHTML = '40 sec';
//     timeList.append(list);
//     list.append(btn);
// }

function getRandomColor() {
    const colors = ['#DC143C', '#00FFFF', '#FFD700', '#7CFC00', '#FF1493'],
          index = Math.floor(Math.random() * colors.length);

    return colors[index];
}

// Little gamehack
// function winTheGame() {
//     function kill() {
//         const circle = document.querySelector('.circle');
        
//         if (circle) {
//             circle.click();
//         }
//     }

//     setInterval(kill, 0);
// }

// winTheGame();