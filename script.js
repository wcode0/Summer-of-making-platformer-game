const player = document.getElementById("player");
const ground = document.getElementById("ground");
const gravity = 1;
const speed = 6;
const groundY = 620;
const playerHeight = 50;
const playerWidth = 50;
const jumpStrength = -20;

let velocity = 0;
let playerX = 0;
let playerY = 620;
let isJumping = false;

const blocks = [];
let sides = {
  left : false,
  right : false,
  top : false,
}
let keys = {
  KeyW: false,
  KeyD: false,
  KeyA: false,
};

player.style.height = playerHeight + "px";
player.style.width = playerWidth + "px";
ground.style.top = groundY + "px";

window.addEventListener("keydown", (event) => {
  if (event.code in keys) keys[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  if (event.code in keys) keys[event.code] = false;
});

class Block {
  constructor(width, height, x, y, color, containerId = "game") {
    this.width = width;
    this.height = height;
    this.x = x;  
    this.y = y;
    this.element = document.createElement("div");
    this.element.classList.add("Block");
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    this.element.style.width = width + "px";
    this.element.style.height = height + "px";
    this.element.style.backgroundColor = color;

    const container = document.getElementById(containerId);
    container.appendChild(this.element);
    blocks.push(this);
  }
}

const redBlock = new Block(100, 100, 200, 520, "red");
const blueBlock = new Block(100, 100, 500, 420, "blue");
function checkCollision() {
  // Reset sides every frame
  sides.left = false;
  sides.right = false;
  sides.top = false;

  for (const block of blocks) {
    const playerRight = playerX + playerWidth;
    const playerBottom = playerY + playerHeight;
    const blockRight = block.x + block.width;
    const blockBottom = block.y + block.height;

    const isColliding = playerX < blockRight &&
                        playerRight > block.x &&
                        playerY < blockBottom &&
                        playerBottom > block.y;

    if (isColliding) {
      // Top collision (landing on block)
      if (velocity > 0 &&
          playerBottom > block.y &&
          playerY < block.y &&
          playerRight > block.x &&
          playerX < blockRight) {
        playerY = block.y - playerHeight;
        velocity = 0;
        isJumping = false;
        sides.top = true;
      } else {
        // Only check side collisions if not landing on top
        // Right collision
        if (playerRight > block.x && playerX < block.x &&
            playerBottom > block.y && playerY < blockBottom) {
          sides.right = true;
        }

        // Left collision
        if (playerX < blockRight && playerRight > blockRight &&
            playerBottom > block.y && playerY < blockBottom) {
          sides.left = true;
        }
        if(playerY <= blockBottom && playerRight > block.x && playerX < blockRight){
          velocity = 0;
        }
      }
    }
  }
}
function update() {
  checkCollision()
  if (keys.KeyA && sides.left === false) playerX -= speed;
  if (keys.KeyD && sides.right === false) playerX += speed;
  if (keys.KeyW && isJumping === false) {
    velocity += jumpStrength;
    isJumping = true;
  }
  velocity += gravity;
  playerY += velocity;

  if (playerY + playerHeight >= groundY) {
    playerY = groundY - playerHeight;
    velocity = 0;
    isJumping = false;
  }

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  requestAnimationFrame(update);
}

update();
