// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');
const winningMessage = document.getElementById('winning-message');
const toggleDarkMode = document.getElementById('toggle-dark-mode');
let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

if (toggleDarkMode) {
  toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.add('hidden');
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.textContent = currentClass;
  cell.classList.add(currentClass.toLowerCase());

  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw, winner) {
  if (draw) {
    winningMessage.textContent = "Draw!";
  } else {
    winningMessage.textContent = `${winner} Wins!`;
  }
  winningMessage.classList.remove('hidden');
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}
