const boardSize = 10;
let seed = (Math.random() * 2 ** 32) >>> 0;
let prng = splitmix32(seed);
let moveCounter = 0;

function generateBoard(n) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", n * 50);
  svg.setAttribute("height", n * 50);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", j * 50);
      rect.setAttribute("y", i * 50);
      rect.setAttribute("width", 50);
      rect.setAttribute("height", 50);
      rect.setAttribute("fill", (i + j) % 2 === 0 ? "#FFFFFF" : "#CCCCCC");
      svg.appendChild(rect);
    }
  }

  return svg;
}

function splitmix32(a) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

function generateRandomOverlay() {
  const numberOfOverlays = Math.floor(prng() * boardSize * boardSize);
  for (let i = 0; i < numberOfOverlays; i++) {
    const x = Math.floor(prng() * boardSize);
    const y = Math.floor(prng() * boardSize);
    addOverlaySquare(x, y);
  }
}

function addOverlaySquare(x, y) {
  const board = document.querySelector("svg");

  const newSquare = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  newSquare.setAttribute("x", x * 50);
  newSquare.setAttribute("y", y * 50);
  newSquare.setAttribute("width", 50);
  newSquare.setAttribute("height", 50);
  newSquare.setAttribute("fill", "red");
  newSquare.setAttribute("fill-opacity", "0.5");
  newSquare.classList.add("overlay");
  board.appendChild(newSquare);
}

const player = new Player(0, 0);

document.addEventListener("DOMContentLoaded", function () {
  const board = generateBoard(boardSize);
  document.body.appendChild(board);
  generateRandomOverlay();
  player.addToBoard(board);
  newGame();
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      player.move(0, -1);
      moveCounter++;
      break;
    case "ArrowDown":
      player.move(0, 1);
      moveCounter++;
      break;
    case "ArrowLeft":
      player.move(-1, 0);
      moveCounter++;
      break;
    case "ArrowRight":
      player.move(1, 0);
      moveCounter++;
      break;
  }
  document.getElementById("move-counter").textContent = `Moves: ${moveCounter}`;

  const overlaySquares = document.querySelectorAll(".overlay");
  if (overlaySquares.length === 0) {
    alert(`You win! in ${moveCounter} moves!`);
  }
});

function newGame(useSeed = false) {
    moveCounter = 0;
  const overlaySquares = document.querySelectorAll(".overlay");
  overlaySquares.forEach((square) => square.remove());
  if (useSeed) {
    seed = document.querySelector("#seed").value;
  } else {
    seed = (Math.random() * 2 ** 32) >>> 0;
  }
  document.querySelector("#seed").value = seed;
  prng = splitmix32(seed);
  generateRandomOverlay();

  const initX = Math.floor(prng() * boardSize);
  const initY = Math.floor(prng() * boardSize);
  player.teleport(initX, initY);
}
