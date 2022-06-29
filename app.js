const players = [
];
let turn = 0;
startNewGame();

// what happens when a player chooses a block
function blockClicked() {
  const player = getCurrentPlayer();
  this.classList.remove("free-block");
  this.classList.add(`${player.id}-block`);
  updateProgress(this.id);
  checkForWin();
  turn += 1;
}

// checks to see whether or not current player won
function checkForWin() {
  const player = getCurrentPlayer();
  const progress = player.progress;
  if (
    progress.rows.includes(3) ||
    progress.cols.includes(3) ||
    progress.diag.includes(3)
  ) {
    const freeBlocks = document.querySelectorAll(".free-block");
    for (const freeBlock of freeBlocks) {
      freeBlock.removeEventListener("click", blockClicked);
      freeBlock.classList.remove("free-block");
    }
    displayWinner();
  }
}

function displayWinner() {
  const winnerMessage = document.querySelector("#winner-msg");
  winnerMessage.textContent = `${getCurrentPlayer().name} wins!`;
  enableNewGame();
}

function enableNewGame() {
  const newGame = document.querySelector("#new-game");
  newGame.disabled = false;
  startNewGame();
}

function startNewGame() {
  turn = 0;
  players.length = 0;
  players.push({name: 'player', id: 'p1', progress: newProgress()});
  players.push({name: 'computer', id: 'p2', progress: newProgress()});
  // make tic tac toe play blocks
  const gameBoard = document.querySelector("#game-board");
  gameBoard.innerHTML = "";
  for (let i = 1; i <= 9; i += 1) {
    const playBlock = document.createElement("div");
    playBlock.classList.add("play-block", "free-block");
    playBlock.id = `b${i}`;
    playBlock.addEventListener("click", blockClicked, { once: true });
    gameBoard.appendChild(playBlock);
  }
}

function newProgress() {
  return {
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diag: [0, 0],
  };
}

// updates current player's progress towards winning
// player wins whenever any of the values in any slow reaches 3
// as in 3 blocks in a row, 3 blocks in a column or 3 blocks diagonally
function updateProgress(blockId) {
  const progress = getCurrentPlayer().progress;
  switch (blockId) {
    case "b1":
      progress.rows[0] += 1;
      progress.cols[0] += 1;
      progress.diag[0] += 1;
      break;
    case "b2":
      progress.rows[0] += 1;
      progress.cols[1] += 1;
      break;
    case "b3":
      progress.rows[0] += 1;
      progress.cols[2] += 1;
      progress.diag[1] += 1;
      break;
    case "b4":
      progress.rows[1] += 1;
      progress.cols[0] += 1;
      break;
    case "b5":
      progress.rows[1] += 1;
      progress.cols[1] += 1;
      progress.diag[0] += 1;
      progress.diag[1] += 1;
      break;
    case "b6":
      progress.rows[1] += 1;
      progress.cols[2] += 1;
      break;
    case "b7":
      progress.rows[2] += 1;
      progress.cols[0] += 1;
      progress.diag[1] += 1;
      break;
    case "b8":
      progress.rows[2] += 1;
      progress.cols[1] += 1;
      break;
    case "b9":
      progress.rows[2] += 1;
      progress.cols[2] += 1;
      progress.diag[0] += 1;
  }
}

function getCurrentPlayer() {
  return players[turn % 2];
}
