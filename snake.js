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
let gameSpeed = 5;
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
let snakeHeadX = 11;
let snakeHeadY = 13;

let grid = [];

function makeGrid(x, y) {
  for (let i = 0; i < 25; i++) {
    // grid.push([]);
    let array = [];
    for (let j = 0; j < 25; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.dataset.x = i;
      gridItem.dataset.y = j;
      array.push(gridItem);
      board.appendChild(gridItem);
      //debugger
    }
    grid.push(array);
  }
}
makeGrid();

function makeGame() {
  //   //   resetGame();
  snakeMovingDirection();
  renderSnake();
  setInterval(makeGame, 1000 / gameSpeed);
}
console.log(makeGame);

function renderSnake() {
  for (let arr of snake.body) {
    let snakeBod = grid[arr[0]][arr[1]];
    snakeBod.style.backgroundColor = "blue";
  }
}
function snakeMovingDirection() {
  snakeHeadX = snakeHeadX + xDirection;
  snakeHeadY = snakeHeadY + yDirection;
}

document.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (eventkeyCode == 38) {
    yDirection = -1;
    xDirection = 0;
  }
}
makeGame();
