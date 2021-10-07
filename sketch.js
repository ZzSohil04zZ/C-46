var bg;
var spacecraft, spaceCI, meteorI
var meteorG, enemyG;
var gameState = "PLAY"
var score = 0
var restart,restartI


function preload() {

  bg = loadImage("Images/Bg2.jpg")
  spaceCI = loadImage("Images/spacecraft.png")
  meteorI = loadImage("Images/MeteorI.png")
  enemyI = loadImage("Images/Espacecraft.png")
  bulletI = loadImage("Images/Bullett.png")
  explosion = loadImage("Images/Scexplotion.png")
  restartI = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(1000, 500);

  spacecraft = createSprite(500, 450)
  spacecraft.addImage(spaceCI)
  spacecraft.scale = 0.2

  restart = createSprite(500,250)
  restart.addImage(restartI)
  restart.scale = 0.1
  restart.visible = false


  meteorG = new Group()
  enemyG = new Group()
  bulletG = new Group()
}

function draw() {
  background(bg);
  textSize(25)
  fill("white")
  text("Ships : "+score, 100,50)
 
 if(mousePressedOver(restart)){
   reset()
 }
  
  if (gameState === "PLAY") {
  
    if (keyDown("A")) {
      spacecraft.x = spacecraft.x - 6
    }
    if(keyDown("D")){
      spacecraft.x = spacecraft.x + 6
    }

    if (keyWentDown("Space")) {
      lazerBullet()
    }

    if (bulletG.isTouching(enemyG)) {
      bulletG.destroyEach()
      enemyG.destroyEach()
      score = score + 1
    }

    if (enemyG.isTouching(spacecraft)) {
      gameState = "END"
    }

    if (meteorG.isTouching(spacecraft)) {
      
      gameState = "END"

    }

    
  
    spawnMeteor()
    spawnEnemy()
  }


  

  if(gameState === "END"){
    spacecraft.addImage(explosion)
    spacecraft.changeImage(explosion)
    enemyG.destroyEach()
    meteorG.destroyEach()
    restart.visible = true

  }


    drawSprites()
  }


function spawnMeteor() {
  if (World.frameCount % 30 === 0) {
    meteor = createSprite(random(50, 950), 0)
    meteor.velocityY = 8
    meteor.addImage(meteorI)
    meteor.scale = 0.2
    meteor.lifetime = 500 / 8
    meteorG.add(meteor)
  }

}

function spawnEnemy() {
  if (World.frameCount % 109 === 0) {
    enemy = createSprite(random(50, 950), 0)
    enemy.velocityY = 8
    enemy.addImage(enemyI)
    enemy.scale = 0.2
    enemy.lifetime = 500 / 8
    enemyG.add(enemy)
  }

}

function lazerBullet() {
  bullet = createSprite(spacecraft.x, spacecraft.y)
  bullet.addImage(bulletI)
  bullet.scale = 0.1
  bullet.velocityY = -9
  bulletG.add(bullet)

}

function reset(){
  gameState = "PLAY"
  restart.visible = false
  spacecraft.addImage(spaceCI)
  spacecraft.changeImage(spaceCI)
  score = 0 

}


