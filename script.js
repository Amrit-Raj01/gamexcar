// script.js
const car = document.getElementById('car');
const demon = document.getElementById('demon');
const coin = document.getElementById('coin');
const speedDisplay = document.getElementById('speed');
const coinsDisplay = document.getElementById('coins');

let speed = 5;
let coinsCollected = 0;

// Move car left and right
document.addEventListener('keydown', (e) => {
  let carLeft = parseInt(window.getComputedStyle(car).left);
  if (e.key === 'ArrowLeft' && carLeft > 0) {
    car.style.left = `${carLeft - 10}px`;
  } else if (e.key === 'ArrowRight' && carLeft < window.innerWidth - 80) {
    car.style.left = `${carLeft + 10}px`;
  }
});

// Check for collisions and collect coins
function checkCollisions() {
  const carRect = car.getBoundingClientRect();
  const demonRect = demon.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  // Collision with demon
  if (
    carRect.left < demonRect.right &&
    carRect.right > demonRect.left &&
    carRect.bottom > demonRect.top
  ) {
    alert('Game Over!');
    window.location.reload();
  }

  // Collect coin
  if (
    carRect.left < coinRect.right &&
    carRect.right > coinRect.left &&
    carRect.bottom > coinRect.top
  ) {
    coinsCollected += 1;
    coinsDisplay.textContent = coinsCollected;
    coin.style.right = '-50px';
    coin.style.top = `${Math.random() * window.innerHeight}px`;
  }
}

// Game loop
function gameLoop() {
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

gameLoop();
