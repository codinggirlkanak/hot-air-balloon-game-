var PLAY = 1;
var END = 0;
var gameState = PLAY;
var dieSound, jumpSound
var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTopGroup,obsBottomGroup
var score = 0 
var barGroup 

function preload(){
bgImg = loadImage("assets/bg.png")
obsTopImg1 = loadImage("assets/obsTop1.png")
obsTopImg2 = loadImage("assets/obsTop2.png")
obsBottomImg1 = loadImage("assets/obsBottom1.png")
obsBottomImg2 = loadImage("assets/obsBottom2.png")
obsBottomImg3 = loadImage("assets/obsBottom3.png")
gameOverImg = loadImage("assets/gameOver.png")
heartImg = loadImage("assets/heart.png")
goldImg = loadImage("assets/gold.png")
restartImg = loadImage("assets/restart.png")

dieSound = loadSound("assets/die.mp3")
jumpSound = loadSound("assets/jump.mp3")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
createCanvas(1000,600)
//background image
bg = createSprite(900,500,1800,1000);
bg.addImage(bgImg);
bg.scale = 2

bg.x = bg.width /2;
  bg.velocityX = -4;

//creating top and bottom grounds
bottomGround = createSprite(200,600,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

restart = createSprite(450,280,100,100)
restart.addImage("restart",restartImg)

gameOver = createSprite(450,200,100,100)
gameOver.addImage("gameOver",gameOverImg)

obsBottomGroup = new Group()
obsTopGroup = new Group()
barGroup = new Group()



}

function draw() {
  
  background("black");
  bar()
  
  drawSprites();
  Score()
       if(gameState === PLAY) {
        gameOver.visible = false
        restart.visible = false
         //making the hot air balloon jump
         if(keyDown("space")) {
          balloon.velocityY = -6 ;
          
        }

        //adding gravity
         balloon.velocityY = balloon.velocityY + 2;

         balloon.collide(bottomGround)
         balloon.collide(topGround)
         
         if(bg.x<0){
          bg.x = bg.width /2;
         }
         
       spawnBottom()
        spawnTop()

       if(obsBottomGroup.isTouching(balloon)||obsTopGroup.isTouching(balloon)){
         gameState = END
       }



       }

       
       else if(gameState === END){
        gameOver.visible = true
        restart.visible = true
         balloon.velocityY = 0 
         //fill("red")
         //textSize(40)
         //text("GAME OVER",500,300)
         bg.velocityX = 0
         obsBottomGroup.setVelocityXEach(0)
         obsTopGroup.setVelocityXEach(0)
        
       if (mousePressedOver(restart)){
         reset()
       }
       }
          
       
        
}

function spawnBottom(){
  if(frameCount%120===0){
    obsBottom = createSprite(1060,450,50,50)
    obsBottom.velocityX = -4
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obsBottom.addImage(obsBottomImg1);
              break;
      case 2: obsBottom.addImage(obsBottomImg2);
              break;
      case 3: obsBottom.addImage(obsBottomImg3);
              break;
      
      default: break;
    }
    obsBottom.scale = 0.2
    obsBottom.lifeTime = 250
    obsBottomGroup.add(obsBottom)
  }
  
}

function spawnTop(){
  if(frameCount%150===0){
    obsTop = createSprite(1060,10,50,50)
    obsTop.y = Math.round(random(10,60));
    obsTop.velocityX = -6
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obsTop.addImage(obsTopImg1);
              break;
      case 2: obsTop.addImage(obsTopImg2);
              break;
      
      
      default: break;
    }
    obsTop.scale = 0.1
    obsTop.lifeTime = 300
    obsTopGroup.add(obsTop)
  }
}

function reset(){
  gameState = PLAY 
  gameOver.visible = false
  restart.visible = false
  score = 0 
  obsTopGroup.destroyEach()
  obsBottomGroup.destroyEach()
}

function bar(){
  if(World.frameCount%60===0){
    var bar = createSprite(1000,300,1,2000)
    bar.velocityX = -6
    bar.lifetime = 280
    barGroup.add(bar)
    bar.visible = false 
  }
}

function Score(){
  if(balloon.isTouching(barGroup)){
    score=score+1

  }
  textSize(30)
  text("Score: "+score,50,50)
}