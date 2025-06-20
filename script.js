let x = 0;
let y = 0;
const speed = 0.5; 
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

// Listen for key presses
window.addEventListener("keydown", (event) => {
  if (event.code in keys) {
    keys[event.code] = true;
  }
});

// Listen for key releases
window.addEventListener("keyup", (event) => {
  if (event.code in keys) {
    keys[event.code] = false;
  }
});

let grav = 0.2
let velocity = 0
let strength = -5
let isJumping = true
const ground = 80

function update() {

  player.style.height = "10vw";
  if (keys.ArrowUp && !isJumping){
    velocity = strength
    isJumping = true
  }

  velocity += grav;
  y += velocity;

  if (y >= ground) {
    y = ground;
    velocity = 0;
    isJumping = false;
  }
  
  if (keys.ArrowLeft) x -= speed;
  if (keys.ArrowRight) x += speed;
  if (keys.ArrowDown) player.style.height = "5vw";
  player.style.left = x + "vw";
  player.style.top = y + "vh";

  requestAnimationFrame(update);
}

update();
