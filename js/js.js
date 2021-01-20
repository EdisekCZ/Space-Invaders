const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let xwing1 = document.getElementById("xwing");
let tie1 = document.getElementById("tie");
let laser1 = document.getElementById("laser");
let prohra = document.getElementById("prohra");
let score = document.getElementById("score");
let herniScore = 0;
let ties = [];
let lasers = []; 
let hra = true;


class tie{ 
  sizeX = 60;
  sizeY = 60;
  x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
  y = -50; 
  move(){
    this.y += 8; 
    
  }
  paint(){
      
    ctx.drawImage(tie1, this.x, this.y, this.sizeX, this.sizeY)
  }
}
class laser{ 
  sizeX = 60;
  sizeY = 60;
  x = xwing.x;
  y = canvas.height - 130; 
  move(){
    this.y -= 5; 
    
  }
  paint(){
      
    ctx.drawImage(laser1, this.x, this.y, this.sizeX, this.sizeY)
  }
}
let xwing = { 
  velX: 0,
  speed: 10,
  friction: 0.9,
  keys:[],
  sizeX: 60,
  sizeY: 60,
  y: canvas.height - 100,
  x: canvas.width / 2 - 40,
  shoot: 0,
  shootCas: null,

  move() {
    if (this.keys['ArrowRight']) {
            if (this.velX < this.speed) {
                this.velX++;
            }
        }
        if (this.keys['ArrowLeft']) {
            if (this.velX > -this.speed) {
                this.velX--;
            }
        }
    
        this.velX *= this.friction;
        this.x += this.velX; 

        if (this.x > canvas.width - this.sizeX) {
            this.x = canvas.width - this.sizeX;
            this.velX = -this.velX;
        } 
        
        if (this.x < 0) {
            this.x = 0;
            this.velX = -this.velX;
        }
    },
  paint: function () {
    if (this.keys['Space']) {
      if (this.shoot == 0) {
        this.shoot = 1;
      lasers.push(new laser());
      this.shootCas = setTimeout(function () {
      xwing.shoot = 0;
      },500)
      }
      }  
    ctx.drawImage(xwing1, this.x, this.y, this.sizeX, this.sizeY)
  }
}
let game = {
  draw: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    xwing.move();
    xwing.paint();  
    ties.forEach(function(obj, index) {
      obj.move();
      obj.paint();
      if (obj.y > canvas.height) {
        delete ties[index];
      }
    });
    lasers.forEach(function(obj, index) {
      obj.move();
      obj.paint();
    });
    lasers.forEach(function(obj, index) {
      ties.forEach(function(obj2, index2) {
        if (obj.x > obj2.x - 50 && obj.x < obj2.x + obj2.sizeX && obj.y > obj2.y && obj.y < obj2.y + 30) {
          delete ties[index2]
          delete lasers[index]
          herniScore ++;
          score.innerHTML = "Score: " + herniScore;
        }
      });
    });
    ties.forEach(function(obj, index) {
      if (xwing.x + 60 > obj.x && xwing.x < obj.x + obj.sizeX && obj.y + obj.sizeY > xwing.y && xwing.y + xwing.sizeY > obj.y) {
        hra = false;
        prohra.style.display = "block";
      }
    });
  }
}
setInterval(function () {
  ties.push(new tie());
},250)

function animate() {
  if (hra) {
    game.draw();
    requestAnimationFrame(animate);
  }
}
animate();

document.body.addEventListener('keydown', function(event) { 
  xwing.keys[event.code] = true;
});

document.body.addEventListener("keyup", function(event) { 
  xwing.keys[event.code] = false;
  if (event.keyCode===32) {
    xwing.shoot = 0;
    clearTimeout (xwing.shootCas);
  }
});
