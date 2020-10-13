var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,bg,bg1;

function preload(){  
  monkey_running=            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  bg=loadImage("jungle.jpg");
  
 
}



function setup() {
   createCanvas(400, 400); 
  
  
   monkey=createSprite(60,350,20,20);
   monkey.addAnimation("run", monkey_running);  
   monkey.scale=0.1;
  
  ground = createSprite(100,350,600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bg1=createSprite(100,100);
  bg1.addImage(bg);
  bg1.velocityX=-2;
  //bg1.scale=1.4;
 

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  var survivalTime=0;
}


function draw() {
  
  background("black");
  
    
  if(bg1.x<0) {
    bg1.x=bg1.width/2;
  }
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(monkey.isTouching(FoodGroup))
    {
      FoodGroup.destroyEach();
    }
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
      bg1.velocityX=0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,350,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
   
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}