let x = 0;
let y = 0;
let enemyx = 89;
const speed = 0.5; 
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const sword = document.getElementById("sword");
let keys = {
  KeyW: false,  // was ArrowUp
  KeyS: false,  // was ArrowDown
  KeyA: false,  // was ArrowLeft
  KeyD: false,   // was ArrowRight
  ArrowRight: false,
  ArrowLeft : false
};
window.addEventListener('click', () => {
  location.reload();
});

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
let enemyspeed =0.25
let grav = 0.2
let velocity = 0
let strength = -5
let isJumping = true
let swordAngle = 0
const ground = 80

function update() {
  enemyx+=enemyspeed;
  player.style.height = "10vw";
  if (keys.KeyW && !isJumping){
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
  
  if (keys.KeyA && x > 0) x -= speed;
  if (keys.KeyD && x < 90) x += speed;
  if (keys.KeyS) player.style.height = "5vw";
  //enemy movement
  if(enemyx <= 0 || enemyx >= 90){ 
    enemyspeed*=-1}
  //woah that was easier than I thought
  //sword moving time!!!!!!
  sword.style.left = x + 3 + "vw"
  sword.style.top = y - 25 + "vh"
  //sword rotation
  if(keys.ArrowLeft){
    swordAngle -=1
  }
  if(keys.ArrowRight){
    swordAngle+=1;
  }
  sword.style.rotate = swordAngle + "deg"
  player.style.left = x + "vw";
  player.style.top = y + "vh";
  enemy.style.left = enemyx + "vw";
  requestAnimationFrame(update);
}

update();
