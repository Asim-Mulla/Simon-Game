let gameSequence = [];
let userSequence = [];
let randomBtns = [".red", ".green", ".orange", ".blue"];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let btns = document.querySelectorAll(".btn");
let background = document.querySelector("body");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSequence = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randomIndx = Math.floor(Math.random() * 4);
  let randomColor = randomBtns[randomIndx];
  let randonBtn = document.querySelector(randomColor);

  gameSequence.push(randomColor);
  console.log(gameSequence);

  btnFlash(randonBtn);
}

function compareAnswers(indx) {
  if (gameSequence[indx] == userSequence[indx]) {
    if (gameSequence.length == userSequence.length) {
      h3.innerText = "Clear";
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerText = "Game Over";
    background.classList.add("gameOverFlash");
    setTimeout(function () {
      background.classList.remove("gameOverFlash");
    }, 400);
    h3.innerText = `!!! Game Over !!!\nYour Score was ${level}\nPress "R" to restart`;
    reset();
  }
}

for (btn of btns) {
  btn.addEventListener("click", btnPress);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 400);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);
  console.log(userSequence);

  compareAnswers(userSequence.length - 1);
}

let highest = 0;
function reset() {
  if (level > highest) {
    highest = level;
    let high = document.querySelector(".high");
    high.innerHTML = `Highest Score : ${highest}`;
  }
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
