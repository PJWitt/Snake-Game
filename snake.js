// create grid for game board
// create initialziation game with "ticks"
// create snake head
//create snake body
//create food
//add movement (using arrays?)
// rules that you cannot backtrack
//snake adds 1 length every food eat
// add collison rules

//stretch goals:
//add wrapping on the walls
//increase speed with certain score levels
//display high score
//multiple foods on board

const board = document.querySelector(".board");
let gameSpeed = 7;
let score = document.getElementById("score");
let currentScore = 0;
let isGameStarted = false;
let start = document.getElementById("startButton");
let resetBtn = document.getElementById("resetButton");
let xDirection = 0;
let yDirection = 0;
let snake = {
  body: [
    [11, 13],
    [11, 14],
    [11, 15],
    [11, 16],
  ],
  nextDirection: [1, 0],
};
let lastDirectionCoords = [0, 0];
let snakeHeadX = 11;
let snakeHeadY = 13;
let foodCoordX = 0;
let foodCoordY = 0;
let grid = [];
let gameover = false;
let snakeInterval;
let lost = document.getElementById("lost");
lost.style.display = "none";

function makeGrid(x, y) {
  grid = [];
  for (let i = 0; i < 25; i++) {
    // grid.push([]);
    let array = [];
    for (let j = 0; j < 25; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.dataset.y = i;
      gridItem.dataset.x = j;
      array.push(gridItem);
      board.appendChild(gridItem);
      //debugger
    }
    grid.push(array);
  }
  setTimeout(makeGame, 50);
}
start.addEventListener("click", makeGrid);
function resetGame() {
  // clear the board
  location.reload();
}
resetBtn.addEventListener("click", resetGame);
//makeGrid();

function makeGame() {
  spawnFood();
  eatFoodCollision();
  renderSnake();
  snakeInterval = setInterval(renderSnake, 1000 / gameSpeed);

  //   keyDown();
}

function renderSnake() {
  for (let arr of snake.body) {
    // grid[11][13]
    let snakeBod = grid[arr[0]][arr[1]];
    snakeBod.style.backgroundColor = "blue";
    if ([arr[0]] == snakeHeadX && [arr[1]] == snakeHeadY) {
      snakeBod.style.backgroundColor = "green";
    }
  }

  if (isGameStarted) snakeMovingDirection();
  gameOver();
}

function spawnFood() {
  foodCoordX = Math.floor(Math.random() * grid.length);
  foodCoordY = Math.floor(Math.random() * grid.length);
  let foodCoordinates = grid[foodCoordX][foodCoordY];
  foodCoordinates.style.backgroundColor = "red";
}

function snakeMovingDirection() {
  snakeHeadX = snakeHeadX + xDirection;
  snakeHeadY = snakeHeadY + yDirection;
  snake.body.unshift([snakeHeadX, snakeHeadY]);
  const deadSkin = snake.body.pop();
  grid[deadSkin[0]][deadSkin[1]].style.backgroundColor = "rgba(0, 0, 0, 0.884)";
  bodyCollision();
  eatFoodCollision();
}

function gameOver() {
  if (
    snakeHeadX < 0 ||
    snakeHeadX >= 25 ||
    snakeHeadY < 0 ||
    snakeHeadY >= 25
  ) {
    gameover = true;
    clearInterval(snakeInterval);
  }
  if (gameover) {
    lost.style.display = "block";
  }
}

function bodyCollision() {
  for (i = 1; i < snake.body.length; i++) {
    if (snakeHeadX === snake.body[i][0] && snakeHeadY === snake.body[i][1]) {
      gameover = true;
      clearInterval(snakeInterval);
    }
    if (gameover) {
      lost.style.display = "block";
    }
  }
}

function eatFoodCollision() {
  if (foodCoordX === snakeHeadX && foodCoordY === snakeHeadY) {
    foodCoordX = Math.floor(Math.random() * grid.length);
    foodCoordY = Math.floor(Math.random() * grid.length);
    let foodCoordinates = grid[foodCoordX][foodCoordY];
    foodCoordinates.style.backgroundColor = "red";
    snake.body.push([snakeHeadX, snakeHeadY]);
    currentScore += 1;
    score.innerHTML = "Score: " + currentScore;
    console.log("Chomp chomp!");
  }
}

document.addEventListener("keydown", keyDown);

function keyDown(event) {
  //go up
  if (event.keyCode == 38) {
    if (xDirection == 1) {
      return;
    }
    yDirection = 0;
    xDirection = -1;
  }

  //go down
  if (event.keyCode == 40) {
    if (xDirection == -1) {
      return;
    }
    yDirection = 0;
    xDirection = 1;
  }
  //go right
  if (event.keyCode == 39) {
    if (yDirection == -1) {
      return;
    }
    yDirection = 1;
    xDirection = 0;
  }
  //go left
  if (event.keyCode == 37) {
    if (yDirection == 1) {
      return;
    }
    yDirection = -1;
    xDirection = 0;
  }

  if (!isGameStarted) {
    isGameStarted = true;
  }
  //   snakeMovingDirection();
}

// makeGame();
