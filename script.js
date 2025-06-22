const player = document.getElementById("player");
const ground = document.getElementById("ground");
const gun = document.getElementById("gun");
const shot = document.getElementById("gunshot");
const reload =document.getElementById("reload")
const counter =document.getElementById("counter")
const star = document.getElementById("star");
const gravity = 1;
const speed = 6;
const groundY = 620;
const playerHeight = 50;
const playerWidth = 50;
const jumpStrength = -20;
const leftbound = 0;
const rightbound = 1080 -playerWidth;
const gunWidth = 200;
const gunHeight = 100;
let shootCooldown = 100;
let canShoot = true;
let velocity = 0;
let playerX = 0;
let playerY = 620;
let isJumping = false;
let mag = 30;
let nonMag = 270;
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
  Space: false,
  KeyR: false,
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
function checkCollision() {
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
        if (playerRight > block.x && playerX < block.x &&
            playerBottom > block.y && playerY < blockBottom) {
          sides.right = true;
        }
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
new Block(100, 50, 300, 500, "red");
new Block(100, 50, 500, 300, "red");
function update() {
  counter.innerText = mag + ", " + nonMag;
  checkCollision()
  if (keys.Space && canShoot && mag >=1) {
  canShoot = false;
  mag-=1;
  shot.currentTime = 0.5;
  shot.play();
  star.style.opacity = 1;

  setTimeout(() => {
    star.style.opacity = 0;
  }, 1);

  setTimeout(() => {
    canShoot = true;
  }, shootCooldown);
}
  if(keys.KeyR && nonMag >=0){
    canShoot = false;
    setTimeout(function() {nonMag-=30-mag; mag = 30; canShoot = true}, 500)
    reload.currentTime = 0;
    reload.play();
  }
  if (keys.KeyA && sides.left === false && playerX > leftbound){
     playerX -= speed
    gun.style.transform = "scaleX(-1)"}
  if (keys.KeyD && sides.right === false && playerX < rightbound){
    gun.style.transform = "scaleX(1)";
   playerX += speed}
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
  if(playerY < groundY-playerHeight && !sides.top){
    isJumping = true;
  }
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  gun.style.left = (playerX + (playerWidth / 2) - (gunWidth / 2)) + "px";
  gun.style.top  = (playerY + (playerHeight / 2) - (gunHeight / 2)) + "px";
  star.style.top = (playerY + (playerHeight / 2) - (star.offsetHeight / 2)) + "px";
  star.style.left = playerX + "px";


  if (gun.style.transform === "scaleX(1)") {

    star.style.left = (playerX + (playerWidth / 2) + (gunWidth / 2)) -50 + "px";
  } else {
 
    star.style.left = (playerX + (playerWidth / 2) - (gunWidth / 2) - star.offsetWidth)  +50 + "px";
  }
  requestAnimationFrame(update)
}

update();