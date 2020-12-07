var PLAY = 1
var END = 0
var gameState = PLAY;
var monkey , monkey_running, monkey_end;
var bananaImage, obstacleImage;
var foodGroup, obstaclesGroup;
var survivalTime = 0;
var ground;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_end = loadAnimation("sprite_2.png")
}

function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(100,480,10,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("monkeyEnd",monkey_end);
  monkey.scale = 0.2;
  
  ground = createSprite(300,550,1200,20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background("lightGreen");
  
  //displaying score
  stroke("black");
  textSize(20);
  fill("black")
  text("Survival Time: "+ survivalTime, 225,50);
  
  if (gameState === PLAY){
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 400) {
      monkey.velocityY = -12;
      }
    
    
    if(ground.x < 0){
      ground.x = ground.width/2;
      }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
       
      
    }
    
    spawnBananas();
    spawnObstacles();
    
    
    survivalTime = Math.ceil(frameCount/frameRate())
    
    
  } else if (gameState === END){
      textSize(30);
      text("Game Over",225,300);
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.x = 100;
      monkey.y = 480;
      
      obstaclesGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
   
      obstaclesGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);  
      
      monkey.changeAnimation("monkeyEnd",monkey_end);
  }
  
  //stop monkey from falling down  
  monkey.collide(ground);
  
  
  drawSprites();
}

function spawnBananas(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,100,50,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(320,400));
    banana.velocityX = -4;
    
    //assign scale and lifetime to the banana
    banana.scale = 0.1;
    banana.lifetime = 150;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,500,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
