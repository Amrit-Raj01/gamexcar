// script.js
const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const coin = document.getElementById('coin');
const speedDisplay = document.getElementById('speed');
const coinsDisplay = document.getElementById('coins');

let carLeft = 50; // Car's initial position
let speed = 0;
let coinsCollected = 0;
let gameInterval;

// Move car left and right
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && carLeft > 0) {
    carLeft -= 10;
  } else if (e.key === 'ArrowRight' && carLeft < 90) {
    carLeft += 10;
  }
  car.style.left = `${carLeft}%`;
});

// Accelerate and brake
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    speed += 1;
  } else if (e.key === 'ArrowDown' && speed > 0) {
    speed -= 1;
  }
  speedDisplay.textContent = speed;
});

// Check for collisions and collect coins
function checkCollisions() {
  const carRect = car.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  // Collision with obstacle
  if (
    carRect.left < obstacleRect.right &&
    carRect.right > obstacleRect.left &&
    carRect.bottom > obstacleRect.top
  ) {
    alert('Game Over!');
    clearInterval(gameInterval);
  }

  // Collect coin
  if (
    carRect.left < coinRect.right &&
    carRect.right > coinRect.left &&
    carRect.bottom > coinRect.top
  ) {
    coinsCollected += 1;
    coinsDisplay.textContent = coinsCollected;
    coin.style.top = '-50px';
    coin.style.left = `${Math.random() * 90}%`;
  }
}

// Move obstacles and coins
function moveObjects() {
  const obstacleTop = parseFloat(obstacle.style.top) || -100;
  const coinTop = parseFloat(coin.style.top) || -50;

  obstacle.style.top = `${obstacleTop + speed}px`;
  coin.style.top = `${coinTop + speed}px`;

  if (obstacleTop > window.innerHeight) {
    obstacle.style.top = '-100px';
    obstacle.style.left = `${Math.random() * 90}%`;
  }

  if (coinTop > window.innerHeight) {
    coin.style.top = '-50px';
    coin.style.left = `${Math.random() * 90}%`;
  }

  checkCollisions();
}

// Start game
function startGame() {
  gameInterval = setInterval(moveObjects, 20);
}

startGame();
