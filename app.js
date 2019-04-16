// Variables
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// function listeners() {
//   window.addEventListener("load", grid);
// }

// listeners();

// function grid() {
//   let gridSize = 20;
//   let distanceX = 5;
//   let distanceY = 5;
//   let numRows = Math.floor(canvas.height / gridSize);
//   let numColumns = Math.floor(canvas.width / gridSize);

//   for (let i = 0; i <= numRows; i++) {
//     ctx.beginPath();
//     ctx.lineWidth = 1;

//     if (i == distanceX) {
//       ctx.strokeStyle = "#666";
//     } else {
//       ctx.strokeStyle = "#666";
//     }
//     if (i == numRows) {
//       ctx.moveTo(0, gridSize * i);
//       ctx.lineTo(canvas.width, gridSize * i);
//     } else {
//       ctx.moveTo(0, gridSize * i + 0.5);
//       ctx.lineTo(canvas.width, gridSize * i + 0.5);
//     }
//     ctx.stroke();
//   }

//   for (let i = 0; i <= numColumns; i++) {
//     ctx.beginPath();
//     ctx.lineWidth = 1;

//     if (i == distanceY) {
//       ctx.strokeStyle = "#666";
//     } else {
//       ctx.strokeStyle = "#666";
//     }
//     if (i == numColumns) {
//       ctx.moveTo(gridSize * i, 0);
//       ctx.lineTo(gridSize * i, canvas.height);
//     } else {
//       ctx.moveTo(gridSize * i + 0.5, 0);
//       ctx.lineTo(gridSize * i + 0.5, canvas.height);
//     }
//     ctx.stroke();
//   }
// }

let arr = localStorage.getItem("scores")
  ? JSON.parse(localStorage.getItem("scores"))
  : [];
let scores = document.querySelector("h3");
// Audio
let right = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let dead = new Audio();
let left = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// Scores
let Scores = null;

// Snake setup
let snake = [
  {
    x: 200,
    y: 200
  }
];

// Apple
xArr = [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
yArr = [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];

let apple = {
  x: xArr[Math.floor(Math.random() * xArr.length)],
  y: yArr[Math.floor(Math.random() * yArr.length)]
};

let d;
document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

// Collapse detecting
function collapse(head, tail) {
  for (let i = 0; i < tail.length; i++) {
    if (head.x == tail[i].x && head.y == tail[i].y) {
      return true;
    }
  }
  return false;
}

function setup() {
  ctx.clearRect(0, 0, 400, 400);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    if (snake[i].x == 400) {
      ctx.fillRect((snake[i].x = 0), snake[i].y, 10, 10);
    } else if (snake[i].x == 0) {
      ctx.fillRect((snake[i].x = 400), snake[i].y, 10, 10);
    } else if (snake[i].y == 400) {
      ctx.fillRect(snake[i].x, (snake[i].y = 0), 10, 10);
    } else if (snake[i].y == 0) {
      ctx.fillRect(snake[i].x, (snake[i].y = 400), 10, 10);
    }
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
  }

  // apple
  ctx.fillStyle = "yellow";
  ctx.fillRect(apple.x, apple.y, 10, 10);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= 10;
  if (d == "RIGHT") snakeX += 10;
  if (d == "UP") snakeY -= 10;
  if (d == "DOWN") snakeY += 10;

  // Feed the snake
  if (snakeX == apple.x && snakeY == apple.y) {
    let print = (Scores += 10);

    scores.innerHTML = `Scores: ${print}`;
    eat.play();
    apple = {
      x: xArr[Math.floor(Math.random() * xArr.length)],
      y: yArr[Math.floor(Math.random() * yArr.length)]
    };
    ctx.fillRect(apple.x, apple.y, 10, 10);
  } else {
    snake.pop();
  }

  let head = {
    x: snakeX,
    y: snakeY
  };

  // game over
  if (collapse(head, snake)) {
    clearInterval(game);
    dead.play();
    const text = document.querySelector(".text");
    text.innerHTML = "<p>You lost</p>";
    const scores = document.querySelector(".scores");
    const button = document.createElement("div");
    button.className = "button";
    scores.appendChild(button);
    const btn = document.querySelector(".button");
    const btnText = document.createElement("p");
    btnText.className = "btnText";
    btnText.textContent = "Play Again";
    const btnTwo = document.createElement("div");
    btnTwo.className = "btnTwo";
    const btnText2 = document.createElement("p");
    btnText2.className = "btnText2";
    btnTwo.appendChild(btnText2);
    btnText2.textContent = "Go";

    button.appendChild(btnText);
    button.appendChild(btnTwo);

    document.querySelector(".button").addEventListener("mousedown", startAgain);
    // Set localStorage
    arr.push(Scores);
    localStorage.setItem("scores", JSON.stringify(arr));
  }

  snake.unshift(head);
}

let game = setInterval(setup, 100);

function startAgain() {
  window.location.reload();
}

function openNav() {
  if (window.innerWidth > 690) {
    document.querySelector(".sidenav").style.width = "250px";

    document.querySelector("body").style.overflow = "hidden";
    document.body.style.backgroundColor = "rgba(0,0,0, 0.4)";
    document.querySelector(".text").style.display = "block";
  } else {
    document.querySelector(".sidenav").style.width = "200px";
    document.querySelector("body").style.marginLeft = "200px";
    document.querySelector("body").style.overflow = "hidden";
    document.body.style.backgroundColor = "rgba(0,0,0, 0.4)";
    document.querySelector(".text").style.display = "none";
  }
}

document.querySelector("main").addEventListener("click", closeNav);
function closeNav() {
  document.querySelector(".sidenav").style.width = "0";
  document.querySelector("body").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
  document.querySelector(".text").style.display = "block";
}
