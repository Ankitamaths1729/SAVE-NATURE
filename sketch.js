//Declare global variables
var backimage, scene;
var Rarrow;
var mainB;
var mbadge;
var RarrowSprite, mbadgeSprite;
var gameState;
var seed, cloud, can, can1, cloud1;
var seedSprite, cloudSprite, canSprite, can1Sprite, bubbleSprite, cloud1Sprite;
var sun, sunSprite;
var bubble, o2;
var block1, block2;
var sac, f;
var sacSprite, fSprite;
var signboard,signboardS;
var count;

var gasGroup;
var pressCount;
var canreplace;
var sacreplace;
var timer = 20;
var water = false;
var fertiliser = false;
var sunlight = false;
var destroyCount = 0;
var music;

function preload() {
  //Load images
  backimage = loadImage("images/back.jpg");
  happytree = loadImage("images/happy tree.jpg");
  sadtree=loadImage("images/crying apple tree.jpg");
  signboard=loadImage("images/signboard.png");
  Rarrow = loadImage("images/next.png");
  mbadge = loadAnimation("images/badge.png");
  mainB = loadImage("images/landsky.jpg");
  seed = loadImage("images/plant.png");
  co2 = loadImage("images/factory.png");
  o2 = loadImage("images/carbon-monoxide.png");
  cloud = loadAnimation("images/clouds(1).png");
  cloudreplace = loadAnimation("images/clouds - Copy.png");
  sun = loadImage("images/sun.png");
  can = loadAnimation("images/watering-can.png");
  can1 = loadImage("images/watering-can1.png");
  bubble = loadImage("images/CH4 gas.png");
  sac = loadImage("images/fertiliser sac.png");
  f = loadImage("images/f.png");
  canreplace = loadAnimation("images/F3.jpg");
  sacreplace = loadAnimation("images/F4.jpg");
  music = loadSound("sounds/music.mp3");
}

function setup() {
  //create canvas to fit screen size
  createCanvas(displayWidth, displayHeight);

  //create all sprites and add animation to them
  scene = createSprite(
    displayWidth / 2,
    displayHeight / 2,
    displayWidth - 20,
    displayHeight - 30
  );
  scene.addAnimation("start", backimage);
  scene.addAnimation("main", mainB);
  scene.addAnimation("happy", happytree);
  scene.addAnimation("sad",sadtree);
  scene.scale = 2.5;

  signboardS = createSprite(200,400,20,20);
  signboardS.addImage("board",signboard);
  signboardS.scale=1.5;

  sunSprite = createSprite(500, 200, 20, 20);
  sunSprite.addImage("sun", sun);
  sunSprite.scale = 0.3;
  sunSprite.visible = false;

  RarrowSprite = createSprite(1200, 600, 20, 20);
  RarrowSprite.addImage("arrow", Rarrow);
  RarrowSprite.scale = 0.1;

  mbadgeSprite = createSprite(830,175, 20, 20);
  mbadgeSprite.addAnimation("badge", mbadge);
  mbadgeSprite.scale = 0.1;

  seedSprite = createSprite(600, 580, 20, 20);
  seedSprite.addImage("badge", seed);
  seedSprite.scale = 0.3;
  seedSprite.visible = false;

  cloudSprite = createSprite(550, 200, 20, 20);
  cloudSprite.addAnimation("cloudreplace", cloudreplace);
  cloudSprite.scale = 0.4;
  cloudSprite.visible = false;

  cloud1Sprite = createSprite(450, 200, 20, 20);
  cloud1Sprite.addAnimation("cloud", cloud);
  cloud1Sprite.scale = 0.3;
  cloud1Sprite.visible = false;

  canSprite = createSprite(1000, 600, 20, 20);
  canSprite.addAnimation("can", can);
  canSprite.addAnimation("canreplace", canreplace);
  canSprite.scale = 0.2;
  canSprite.visible = false;

  can1Sprite = createSprite(650, 460, 20, 20);
  can1Sprite.addImage("can", can1);
  can1Sprite.scale = 0.2;
  can1Sprite.visible = false;

  bubbleSprite = createSprite(1000, 310, 20, 20);
  bubbleSprite.addImage("bubble", bubble);
  bubbleSprite.scale = 0.2;
  bubbleSprite.visible = false;

  co2Sprite = createSprite(1000, 310, 20, 20);
  co2Sprite.addImage("co2", co2);
  co2Sprite.scale = 0.2;
  co2Sprite.visible = false;

  sacSprite = createSprite(1000, 450, 20, 20);
  sacSprite.addAnimation("sac", sac);
  sacSprite.addAnimation("sacreplace", sacreplace);
  sacSprite.addAnimation("badge", mbadge);
  sacSprite.scale = 0.2;
  sacSprite.visible = false;

  fSprite = createSprite(700, 580, 20, 20);
  fSprite.addImage("fertiliser", f);
  fSprite.scale = 0.2;
  fSprite.visible = false;

  gameState = "start";
  count = 60;

  startT = millis();
  gasGroup = createGroup();

  music.loop();
  music.setVolume(0.5);
  pressCount = 0;
}

function draw() {
  //set background to white
  background(255, 255, 255);
  drawSprites();
  music.loop();
  
  //In the gamestate start display the first page
  if (gameState === "start") {
    textSize(25);
    fill("teal");
    textFont("times new roman");
    text("We have given you one seedling",500,120);
    text(
      "Nuture it and become an ENVIORNMENTAL CHAMPION",
      500,
      145
    );
    fill("black");
    textSize(15);
    textFont("arial black");
    text("TO MAKE A WINNING MOVE",100,60);
    text("YOU HAVE TO DO THE FOLLOWING THINGS:-",50,78);
    textFont("Verdana");
    text("GIVE WATER TO THE PLANT",100,165);
    text("ADD MANURE TO THE PLANT",100,240);
    text("ALLOW THE PLANT TO INTAKE SUNLIGHT",30,310);
    text("BY REMOVING THE CLOUDS",100,330);
    text("PREVENT THE FACTORY'S HARMFUL GAS",57,390);
    text("FROM REACHING YOUR PLANT",100,410);
    textFont("arial black");
    text("{NOTE:IF YOU FAILS TO DO ANY OF THESE TASKS}",800,530);
    text("THEN YOUR PLANT WILL DIE",879,555);
    //change the gamestate to play when player clicks on arrowsprite
    if (mousePressedOver(RarrowSprite)) {
      gameState = "play";
    }
  }
  //gameState start ends here

  //Things that should happen in gamestate play
  if (gameState === "play") {
    //Make all the sprites visible

    scene.changeAnimation("main", mainB);
    scene.scale = 1.5;
    mbadgeSprite.visible = false;
    RarrowSprite.visible = false;
    seedSprite.visible = true;
    signboardS.visible=false;
    cloudSprite.visible = true;
    canSprite.visible = true;
    cloud1Sprite.visible = true;
    sunSprite.visible = true;
    sacSprite.visible = true;
    co2Sprite.visible = true;

    //display the timer
    fill("red");
    textFont("arial black");
    textSize(40);
    text("TIME LEFT:" + timer, 800, 200);

    //Notify player to protect plant from harmful gases
    if (timer < 10 && timer > 6) {
      fill("blue");
      textSize(20);
      textFont("Verdana");
      textStyle(BOLD);
      stroke("white");
      text("'Remember to protect the ", 150, 400);
      text("plant from harmful gases'", 150, 420);
    }

    //Reduce timer for every 50 frames
    if (frameCount % 50 == 0 && timer > 0) {
      timer = timer - 1;
    }

    //Generate harmful gases
    if (World.frameCount % 50 === 0) {
      var co = createSprite(random(900, 1100), 300, 20, 20);
      co.addImage("bubble", bubble);
      co.scale = random(0.09, 0.1);
      co.velocityX = -4;
      co.velocityY =  2;

      gasGroup.add(co);
      var o = createSprite(random(900, 1100), 300, 20, 20);
      o.addImage("o", o2);
      o.scale = random(0.04, 0.1);
      o.velocityX = -4;
      o.velocityY =  2;

      gasGroup.add(o);
    }

    //Watering the plant
    if (mousePressedOver(canSprite)) {
      canSprite.scale = 0.14;
      canSprite.y = 610;
      canSprite.changeAnimation("canreplace", canreplace);
      can1Sprite.visible = true;
      pressCount = pressCount + 1;
      water = true;
    }

    //give fertisizer
    if (mousePressedOver(sacSprite)) {
      sacSprite.changeAnimation("sacreplace", sacreplace);
      sacSprite.scale = 0.14;
      fSprite.visible = true;
      pressCount = pressCount + 1;
      fertiliser = true;
    }

    //Give sunlight
    if (mousePressedOver(cloudSprite) || mousePressedOver(cloud1Sprite)) {
      pressCount = pressCount + 1;
      sunlight = true;

      if (
        cloudSprite.isTouching(sunSprite) ||
        cloud1Sprite.isTouching(sunSprite)
      ) {
        cloudSprite.velocityX = 1;
        cloud1Sprite.velocityX = -0.5;
        cloudSprite.changeAnimation("cloudreplace", cloudreplace);
      } else {
        cloudSprite.velocityX = 0;
        cloud1Sprite.velocityX = 0;
      }
    }

    //If all the tasks are complete within the time, player wins
    if (water && fertiliser && sunlight && destroyCount > 20 && timer !== 0) {
      gameState = "win";
    }

    //Destroy the gases when player clicks on it.
    for (var i = 0; i < gasGroup.length; i++) {
      if (mousePressedOver(gasGroup.get(i))) {
        console.log(gasGroup.get(i));
        gasGroup.get(i).destroy();
        destroyCount = destroyCount + 1;
      }
    }
    //End the game when the harmful gases reach plant
    for (var i = 0; i < gasGroup.length; i++) {
      if (gasGroup.get(i).isTouching(seedSprite)) {
        gameState = "end";
        timer = 0;
      }
    }
     //if(cloudSprite>)
    // if one of the tasks is pending and there is no time left, end the game
    if ((!water || !fertiliser || !sunlight) && timer === 0 ) {
      gameState = "end";
     
      }
  }
  //gamestate play ends here

  //Things that should happen in the end state
  if (gameState === "end") {
    music.stop();
    scene.changeAnimation("sad",sadtree);
    scene.x = displayWidth / 4;
    scene.scale = 0.8;
    seedSprite.visible = false;
    cloudSprite.visible = false;
    canSprite.visible = false;
    cloud1Sprite.visible = false;
    sunSprite.visible = false;
    sacSprite.visible = false;
    gasGroup.destroyEach();
    co2Sprite.visible = false;
    can1Sprite.visible = false;
    fSprite.visible = false;
    fill("teal");
    textSize(40);
    textStyle(BOLD);
    stroke("black");
    text("GAME OVER!!",690, 350);
    textFont("times new roman");
    textSize(30);
    text("WELL TRIED",735,430);
    text("BETTER LUCK NEXT TIME",640,470);
  }
  //Game's end state ends here

  //Things that should happen when player wins
  if (gameState === "win") {
    music.stop();
    scene.changeAnimation("happy", happytree);
    scene.x = displayWidth / 4;
    scene.scale = 0.8;
    mbadgeSprite.visible = false;
    RarrowSprite.visible = false;
    seedSprite.visible = false;

    cloudSprite.visible = false;
    canSprite.visible = false;
    cloud1Sprite.visible = false;
    sunSprite.visible = false;
    gasGroup.destroyEach();
    co2Sprite.visible = false;
    can1Sprite.visible = false;
    fSprite.visible = false;
    sacSprite.changeAnimation("badge", mbadge);
    sacSprite.scale = 0.2;
    sacSprite.y=400;
    fill("teal");
    textSize(40);
    textStyle(BOLD);
    stroke("black");
    text("Congrats!!You Win", 800, 300);
    textSize(20);
    textFont("times new roman");
    text("NOW GO AND APPLY THE RULE OF THIS GAME",750,500);
    text("IN YOUR REAL LIFE",900,550);
    //music.stop();
  }
  //GameState win ends here
}
