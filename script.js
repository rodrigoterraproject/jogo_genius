let order = [];
let clickedOrder = [];
let score = 0;
let isRunning = false;

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const gameStatus = document.querySelector(".status");
const playButton = document.querySelector(".btn");
const audio0 = new Audio("./sounds/1.mp3");
const audio1 = new Audio("./sounds/2.mp3");
const audio2 = new Audio("./sounds/3.mp3");
const audio3 = new Audio("./sounds/4.mp3");

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];
  isRunning = false;
  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1, order[i]);
  }
  isRunning = true;
};

let lightColor = (element, number, audioOrder) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
    if (audioOrder == 0) {
      audio0.play();
    } else if (audioOrder == 1) {
      audio1.play();
    } else if (audioOrder == 2) {
      audio2.play();
    } else if (audioOrder == 3) {
      audio3.play();
    }
  }, number - 150);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number - 20);
};

let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (isRunning && clickedOrder.length == order.length) {
    nextLevel();
    gameStatus.innerHTML =
      "Pontuação: " + score + "<br>Você acertou! Iniciando próximo nível!";
  }
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu o jogo!\n
    Clique em OK para iniciar um novo jogo`
  );
  playButton.innerHTML = "PLAY";
  gameStatus.innerHTML = "Click em PLAY para começar!";
  order = [];
  clickedOrder = [];
  isRunning = false;
  score = 0;
};

let playGame = () => {
  if (playButton.innerHTML == "RESET") {
    gameStatus.innerHTML = "Click em PLAY para recomeçar!";
    order = [];
    clickedOrder = [];
    playButton.innerHTML = "PLAY";
    score = 0;
  } else {
    isRunning = true;
    shuffleOrder();
    playButton.innerHTML = "RESET";
  }
};

green.onclick = () => (isRunning ? (click(0), audio0.play()) : null);
red.onclick = () => (isRunning ? (click(1), audio1.play()) : null);
yellow.onclick = () => (isRunning ? (click(2), audio2.play()) : null);
blue.onclick = () => (isRunning ? (click(3), audio3.play()) : null);
