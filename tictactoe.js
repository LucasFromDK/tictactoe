let isLive = true;
let moves = 0;
let isTie = false;

const boardWidth = 3;
const boardHeight = 3;
let board = newEmptyBoard(boardWidth, boardHeight);

const players = ["X", "O"];
let currentPlayer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawBoard();
  if (!isLive) {
    drawWinner();
  }
}

function newEmptyBoard(w, h) {
  let board = [];
  for (let i = 0; i < w; i++) {
    board[i] = [];

    for (let j = 0; j < h; j++) {
      board[i][j] = "";
    }
  }
  console.log(board);
  return board;
}

function drawWinner() {
  textSize(100);
  fill(0, 0, 255);
  if (isTie == false) {
    text("Winner is " + players[currentPlayer] + "!", width / 2, height / 2);
  } else text("Draw!", width / 2, height / 2);
}

function drawBoard() {
  //Places Empty Tiles
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * 200;
      let y = j * 200;
      drawTile(x, y, 200, 200, board[i][j]);
    }
  }
}

function drawTile(x, y, w, h, sign) {
  stroke(0);
  strokeWeight(4);
  rectMode(CORNER);
  fill(255);
  rect(x + 10, y + 10, w);

  textSize(100);
  textAlign(CENTER, CENTER);
  fill(0);
  text(sign, x + 10, y + 10, w, h);
}

function mouseClicked() {
  if (isLive) {
    let ij = indexesOfTileAtCoord(mouseX, mouseY);
    let i = ij[0];
    let j = ij[1];

    if (isTileEmpty(i, j)) {
      setSign(i, j, players[currentPlayer]);
      resolveGamestate();
    }
  } else {
    newGame();
  }
}

function indexesOfTileAtCoord(x, y) {
  i = floor(x / 200);
  j = floor(y / 200);
  output = [i, j];
  return output;
}

function isTileEmpty(i, j) {
  if (board[i][j] == "") {
    return true;
  } else {
    return false;
  }
}

function setSign(i, j, sign) {
  board[i][j] = sign;
}

function resolveGamestate() {
  moves++;
  let gameOver = isGameOver();
  if (gameOver) {
    isLive = false;
  } else {
    setNextPlayer();
  }
}

//Skifter værdi til 1 eller 0 som styrer om det er X eller O
function setNextPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 0;
  } else {
    currentPlayer = 1;
  }
}

function isGameOver() {
  //Vertical X
  if (board[i][0] == "X" && board[i][1] == "X" && board[i][2] == "X") {
    console.log("X wins Vertically!");
    gameOver = true;
    return gameOver;
  }
  //Horizontal X
  else if (board[0][j] == "X" && board[1][j] == "X" && board[2][j] == "X") {
    console.log("X wins Horizontally!");
    gameOver = true;
    return gameOver;
  }
  //Diagonal 1, L -> R
  else if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") {
    console.log("X wins Diagonally L -> R!");
    gameOver = true;
    return gameOver;
  }
  //Diagonal 2, R -> L
  else if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
    console.log("X wind Diagonally R -> Left");
    gameOver = true;
    return gameOver;
  }

  //Vertical O
  if (board[i][0] == "O" && board[i][1] == "O" && board[i][2] == "O") {
    console.log("O wins Vertically!");
    gameOver = true;
    return gameOver;
  }
  //Horizontal O
  else if (board[0][j] == "O" && board[1][j] == "O" && board[2][j] == "O") {
    console.log("O wins Horizontally!");
    gameOver = true;
    return gameOver;
  }
  //Diagonal 1, L -> R
  else if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
    console.log("O wins Diagonally L -> R!");
    gameOver = true;
    return gameOver;
  }
  //Diagonal 2, R -> L
  else if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
    console.log("O wins Diagonally R -> L!");
    gameOver = true;
    return gameOver;
  }
  //Detect om spillet er uafgjort.
  else if (moves == 9 && isLive == true) {
    console.log("Draw Nobody Wins!");
    isTie = true;
    gameOver = true;
    return gameOver;
  }
}

function newGame() {
  board = newEmptyBoard(boardWidth, boardHeight);
  moves = 0
  isTie = false
  isLive = true;
  currentPlayer = 0;
}