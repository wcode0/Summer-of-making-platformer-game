const player = document.getElementById("player");
const ground = document.getElementById("ground");
const gun = document.getElementById("gun");
const shot = document.getElementById("gunshot");
const reload = document.getElementById("reload");
const counter = document.getElementById("counter");
const star = document.getElementById("star");
const health_bar = document.getElementById("health");
const tutorial = document.createElement("div");
const level_counter = document.getElementById("level_counter");
const coin_counter = document.getElementById("coin_counter");
const game = document.getElementById("game");
const food = document.getElementById("food");
const food_button = document.createElement("button");
const ammo_button = document.createElement("button");
const ka_ching = document.getElementById("ka-ching");

let food_count = 5;
tutorial.id = "tutorial";
tutorial.className = "tutorial";
tutorial.style.display = "none";
document.body.appendChild(tutorial);
const gravity = 0.8;
const speed = 8;
const groundY = 620;
const playerHeight = 50;
const playerWidth = 50;
const jumpStrength = -20;
const leftbound = 0;
const rightbound = 1080 - playerWidth;
const gunWidth = 200;
const gunHeight = 100;
let coins = 5;
let currentLevel = 1;
let health = 50;
let shootCooldown = 100;
let canShoot = true;
let velocity = 0;
let playerX = 0;
let playerY = 620;
let isJumping = false;
let mag = 30;
let nonMag = 270;
let isReloading = false;
let canEat = true;
const enemies = [];
const blocks = [];
let sides = {
  left: false,
  right: false,
  top: false,
};
let keys = {
  KeyW: false,
  KeyD: false,
  KeyA: false,
  Space: false,
  KeyR: false,
  KeyF: false,
};

player.style.height = playerHeight + "px";
player.style.width = playerWidth + "px";
ground.style.top = groundY + "px";
ammo_button.innerText = "Buy Ammo";
food_button.innerText = "Buy Food";

ammo_button.className = "button";
food_button.className = "button";
window.addEventListener("keydown", (event) => {
  if (event.code in keys) keys[event.code] = true;
});
window.addEventListener("keyup", (event) => {
  if (event.code in keys) keys[event.code] = false;
});
window.addEventListener("keydown", (event) => {
  if (event.code === "Backquote") {
    currentLevel = parseInt(prompt("What level do you want to set it to"));
    generateLevel(currentLevel);
  }
});
class Block {
  constructor(width, height, x, y, color, containerId = "game", speed = 0) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
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
class Enemy {
  constructor(health, x, y, speed, containerId = "game") {
    this.health = health;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.classList.add("Enemy");
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    this.element.style.width = "50px";
    this.element.style.height = "50px";
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "red";
    this.element.style.fontSize = "20px";
    this.element.style.color = "white";
    this.element.style.textAlign = "center";
    this.element.style.lineHeight = "50px";
    const container = document.getElementById(containerId);
    container.appendChild(this.element);
    enemies.push(this);
  }
}
function check_shot() {
  for (enemy of enemies) {
    if (
      (gun.style.transform === "scaleX(1)" &&
        enemy.x > playerX &&
        enemy.y === playerY) ||
      (gun.style.transform === "scaleX(-1)" &&
        enemy.x < playerX &&
        enemy.y === playerY)
    ) {
      enemy.health -= 1;
      if (enemy.health <= 0) {
        enemy.element.remove();
        enemies.splice(enemies.indexOf(enemy), 1);
        coins += 1;
      } else {
        enemy.element.innerText = enemy.health;
      }
    }
  }
}
function generateLevel(level) {
  playerX = 0;
  playerY = 620;
  for (const block of blocks) {
    block.element.remove();
  }
  blocks.length = 0;

  for (const enemy of enemies) {
    enemy.element.remove();
  }
  ammo_button.remove();
  food_button.remove();
  enemies.length = 0;
  game.style.backgroundImage = "";
  game.style.backgroundColor = "skyblue";
  tutorial.style.display = "none";
  if (level === 1) {
    tutorial.innerText =
      "Welcome to unnamed game, use A and D to move left and right, use W to jump";
    tutorial.style.display = "block";
  } else if (level === 2) {
    tutorial.innerText =
      "Oh no! There is an obstruction in your path, use W to jump and get over it";
    tutorial.style.display = "block";
    new Block(50, 200, 540, 420, "blue");
  } else if (level === 3) {
    tutorial.innerText =
      "There is an enemy coming towards you!!! Quickly press and hold space to shoot your gun and kill the enemy";
    tutorial.style.display = "block";
    new Enemy(10, 1020, 570, 2);
  } else if (level === 4) {
    tutorial.innerText =
      "This time the enemy has a lot more health, shoot it and when you run out of bullets press R to reload.";
    tutorial.style.display = "block";
    new Enemy(40, 1020, 570, 1);
  } else if (level % 5 === 0) {
    tutorial.innerText =
      "Congrats, you made it to the shop level, this level is safe from enemies and you can buy food and ammo for your journies";
    tutorial.style.display = "block";
    game.style.backgroundImage = "url(images.jpeg)";
    ammo_button.innerText = "Buy Ammo";
    food_button.innerText = "Buy Food";
    ammo_button.className = "button";
    food_button.className = "button";
    ammo_button.style.position = "absolute";
    ammo_button.style.top = "40vh";
    ammo_button.style.left = "50vw";
    food_button.style.position = "absolute";
    food_button.style.top = "50vh";
    food_button.style.left = "50vw";

    game.appendChild(ammo_button);
    game.appendChild(food_button);
  } else if (level === 6) {
    new Block(50, 570, 1030, 50, "blue");
    new Block(50, 50, 100, 570, "purple");
    new Block(50, 50, 500, 500, "saddleBrown");
    new Block(50, 50, 200, 250, "gray");
    new Block(100, 50, 200, 200, "pink", "game", 8);
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

    const isColliding =
      playerX < blockRight &&
      playerRight > block.x &&
      playerY < blockBottom &&
      playerBottom > block.y;

    if (isColliding) {
      if (
        velocity > 0 &&
        playerBottom > block.y &&
        playerY < block.y &&
        playerRight > block.x &&
        playerX < blockRight
      ) {
        playerY = block.y - playerHeight;
        velocity = 0;
        isJumping = false;
        sides.top = true;
      } else {
        if (
          playerRight > block.x &&
          playerX < block.x &&
          playerBottom > block.y &&
          playerY < blockBottom
        ) {
          sides.right = true;
        }
        if (
          playerX < blockRight &&
          playerRight > blockRight &&
          playerBottom > block.y &&
          playerY < blockBottom
        ) {
          sides.left = true;
        }
        if (
          playerY <= blockBottom &&
          playerRight > block.x &&
          playerX < blockRight
        ) {
          velocity = 0;
        }
      }
    }
  }
}
ammo_button.onclick = function () {
  if (coins >= 1) {
    nonMag += 50;
    coins -= 1;
    ka_ching.currentTime = 0.3;
    ka_ching.play();
  }
};

food_button.onclick = function () {
  if (coins >= 1) {
    food_count += 1;
    coins -= 1;
    ka_ching.currentTime = 0.3;
    ka_ching.play();
  }
};

function update() {
  if (food_count > 0 && keys.KeyF && canEat) {
    food_count -= 1;
    health += 10;
    canEat = false;
    setTimeout(function () {
      canEat = true;
    }, 200);
  }
  coin_counter.innerText = "🪙" + coins;
  if (health <= 0) {
    health = 50;
    generateLevel(currentLevel);
  }
  if (playerX > rightbound && enemies.length === 0) {
    currentLevel += 1;
    generateLevel(currentLevel);
  }
  for (const block of blocks) {
    block.x += block.speed;
    block.element.style.left = block.x + "px";
    if (block.x <= leftbound || block.x + block.width >= 1080) {
      block.speed *= -1;
    }
  }
  for (let enemy of enemies) {
    enemy.x += enemy.speed;
    enemy.element.style.left = enemy.x + "px";

    for (const block of blocks) {
      const enemyRight = enemy.x + 50;
      const enemyBottom = enemy.y + 50;
      const blockRight = block.x + block.width;
      const blockBottom = block.y + block.height;

      const isCollidingHorizontally =
        enemyBottom > block.y &&
        enemy.y < blockBottom &&
        ((enemyRight > block.x && enemy.x < block.x && enemy.speed > 0) ||
          (enemy.x < blockRight && enemyRight > blockRight && enemy.speed < 0));

      if (isCollidingHorizontally) {
        enemy.speed *= -1;
        break;
      }
    }

    if (enemy.x >= rightbound || enemy.x <= leftbound) {
      enemy.speed *= -1;
    }
    const playerRight = playerX + playerWidth;
    const playerBottom = playerY + playerHeight;
    const enemyRight = enemy.x + 50;
    const enemyBottom = enemy.y + 50;

    const isTouching =
      playerX < enemyRight &&
      playerRight > enemy.x &&
      playerY < enemyBottom &&
      playerBottom > enemy.y - 1;

    if (isTouching) {
      health -= 0.5;
      if (health < 0) health = 0;
    }
  }
  food.innerText = "🥩" + food_count;
  health_bar.innerText = health + "❤️";

  counter.innerText = "Bullet: " + mag + ", " + nonMag;
  checkCollision();
  level_counter.innerText = "Current Level: " + currentLevel;
  if (keys.Space && canShoot && mag >= 1) {
    canShoot = false;
    mag -= 1;
    shot.currentTime = 0.5;
    shot.play();
    star.style.opacity = 1;
    check_shot();

    setTimeout(() => {
      star.style.opacity = 0;
    }, 1);

    setTimeout(() => {
      canShoot = true;
    }, shootCooldown);
  }
  if (keys.KeyR && nonMag >= 0 && !isReloading) {
    isReloading = true;
    canShoot = false;
    reload.currentTime = 0;
    reload.play();
    setTimeout(function () {
      let usedBullets = 30 - mag;
      if (nonMag < usedBullets) usedBullets = nonMag;
      nonMag -= usedBullets;
      mag += usedBullets;
      canShoot = true;
      isReloading = false;
    }, 500);
  }
  if (keys.KeyA && sides.left === false && playerX > leftbound) {
    playerX -= speed;
    gun.style.transform = "scaleX(-1)";
  }
  if (keys.KeyD && sides.right === false && playerX < rightbound) {
    gun.style.transform = "scaleX(1)";
    playerX += speed;
  }
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
  if (playerY < groundY - playerHeight && !sides.top) {
    isJumping = true;
  }
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  gun.style.left = playerX + playerWidth / 2 - gunWidth / 2 + "px";
  gun.style.top = playerY + playerHeight / 2 - gunHeight / 2 + "px";
  star.style.top = playerY + playerHeight / 2 - star.offsetHeight / 2 + "px";
  star.style.left = playerX + "px";

  if (gun.style.transform === "scaleX(1)") {
    star.style.left = playerX + playerWidth / 2 + gunWidth / 2 - 50 + "px";
  } else {
    star.style.left =
      playerX + playerWidth / 2 - gunWidth / 2 - star.offsetWidth + 50 + "px";
  }
  requestAnimationFrame(update);
}
generateLevel(currentLevel);
update();
