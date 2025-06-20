const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const sword = document.getElementById("sword");
const box = document.getElementById("box");

const speed = 0.5;
const gravity = 0.2;
const jumpStrength = -5;
const groundY = 80;


const playerWidth = 10;
const leftBound = 0;
const rightBound = 90;

let keys = {
  KeyW: false,
  KeyD: false,
  KeyA: false,
};

let x = 0;
let y = groundY;
let enemyx = 89;
let enemyspeed = 0.25;
let velocity = 0;
let isJumping = true;

const boxX = 50;
const boxY = 80;
const boxWidth = 10;
window.addEventListener("keydown", (event) => {
  if (event.code in keys) keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code in keys) keys[event.code] = false;
});
box.style.top = boxY + "vh";
box.style.left = boxX + "vw";
box.style.width = boxWidth + "vw"
box.style.height = boxWidth + "vw";
function update() {
  enemyx += enemyspeed;
  player.style.height = playerWidth + "vw";

  if (keys.KeyW && !isJumping) {
    velocity = jumpStrength;
    isJumping = true;
  }

  velocity += gravity;
  y += velocity;

  if (y >= groundY) {
    y = groundY;
    velocity = 0;
    isJumping = false;
  }

  if (keys.KeyA && x > leftBound ) x -= speed;
  if (keys.KeyD && x < rightBound && (x < boxX - boxWidth)) x += speed;

  if (enemyx <= leftBound || enemyx >= rightBound) enemyspeed *= -1;

  sword.style.left = x + 5 + "vw";
  sword.style.top = y - 5 + "vh";
  player.style.left = x + "vw";
  player.style.top = y + "vh";
  enemy.style.left = enemyx + "vw";

  requestAnimationFrame(update);
}

update();
