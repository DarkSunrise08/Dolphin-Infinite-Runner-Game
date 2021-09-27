var backgroundOcean, backGroundOcean2, backgroundOCean3, backgroundImg;
var dolphinSwim, dolphinCharge, dolphin;
var shark, sharkImg, sharkGroup;
var tuna, tunaImg;
var floor;
var tunaY = 0;
var tunaCounter = 0;
var velocity = 0;
var sharkSpeed = 0;
var score = 0;
var gameState = "play";

function preload(){
    backgroundImg = loadImage("background.png");
    dolphinSwim = loadImage("ds.png");
    sharkImg = loadImage("shark.png");
    tunaImg = loadImage("tuna.png");
}

function setup() {
    createCanvas(1200,600);

    sharkGroup = new Group();

    backgroundOcean = createSprite(200,450,1200,600);
    backgroundOcean.addImage(backgroundImg);
    backgroundOcean.scale = 0.25;
    backgroundOcean.velocityX = 3;

    backgroundOcean2 = createSprite(466,450,1200,600);
    backgroundOcean2.addImage(backgroundImg);
    backgroundOcean2.scale = 0.25;
    backgroundOcean2.velocityX = 3;

    backgroundOcean3 = createSprite(712,450,1200,600);
    backgroundOcean3.addImage(backgroundImg);
    backgroundOcean3.scale = 0.25;
    backgroundOcean3.velocityX = 3;

    dolphin = createSprite(100,500,50,50);
    dolphin.addImage(dolphinSwim);
    dolphin.scale = 0.1;
    dolphin.setCollider("rectangle",0,0,1400,450);

    floor = createSprite(600,625,1200,25);
    floor.visible = false;

    tuna = createSprite(2500,random(350,600),50,50);
    tuna.addImage(tunaImg);
    tuna.scale = 0.1;
    tuna.velocityX = -8;

    tunaY=tuna.y-0.01;
    tuna.setCollider("circle",0,0,200);

}

function draw() {

    dolphin.collide(floor);
    sharkGroup.collide(floor);
    tuna.collide(sharkGroup);
    if(dolphin.isTouching(tuna)){
        tuna.x = 1600;
        tuna.y = random(350,600);
        tuna.velocityY = 0;
        tuna.velocityX = 0;
        tunaCounter = 1000;
        score+=100;
    }

    if(tunaCounter>0){
        tunaCounter--;
    }

    if(tunaCounter === 1){
        tuna.velocityX = -8-sharkSpeed;
    }

    background(rgb(150,200,255));

    drawSprites();

    if(dolphin.isTouching(sharkGroup)){
        gameState = "end";
    }

    if(gameState === "end"){
        dolphin.visible = false;
        sharkGroup.setVelocityXEach(0);
        sharkGroup.setVelocityYEach(0);
        sharkGroup.setLifetimeEach(-1);
        tuna.velocityY = 0;
        tuna.velocityX = 0;
        backgroundOcean.velocityY = 0;
        backgroundOcean.velocityX = 0;
        backgroundOcean3.velocityY = 0;
        backgroundOcean3.velocityX = 0;
        backgroundOcean2.velocityY = 0;
        backgroundOcean2.velocityX = 0;
        text("Press SPACE to restart", 550,250);
    }

    textSize(25);
    text(score,50,50);

    sharkSpeed = score/25
  
    if(gameState === "play"){
        if(backgroundOcean.x>850){
            backgroundOcean.y+=2;
            backgroundOcean.depth = -1;
        }
        else if(backgroundOcean.x>300 && backgroundOcean.x<700){
            backgroundOcean.y-=0.5;   
        }
        else if(backgroundOcean.y<450){
            backgroundOcean.y+=2;
            backgroundOcean.depth = backgroundOcean2.depth+1
        }
        else if(backgroundOcean.y>450){
            backgroundOcean.y-=0.5;
        }


        if(backgroundOcean2.x>850){
            backgroundOcean2.y+=2;
            backgroundOcean.depth = 1;
        }
        else if(backgroundOcean2.x>300 && backgroundOcean2.x<700){
            backgroundOcean2.y-=0.5;   
        }
        else if(backgroundOcean2.y<450){
            backgroundOcean2.y+=2;
            backgroundOcean2.depth = backgroundOcean3.depth+1
        }
        else if(backgroundOcean2.y>450){
            backgroundOcean2.y-=0.5;
        }


        if(backgroundOcean3.x>850){
            backgroundOcean3.y+=2;
            backgroundOcean.depth = 0;
        }
        else if(backgroundOcean3.x>300 && backgroundOcean3.x<700){
            backgroundOcean3.y-=0.5;   
        }
        else if(backgroundOcean3.y<450){
            backgroundOcean3.y+=2;
            backgroundOcean3.depth = backgroundOcean.depth+1
        }
        else if(backgroundOcean2.y>450){
            backgroundOcean2.y-=0.5;
        }

        if(backgroundOcean.x>1000){
            backgroundOcean2.depth = backgroundOcean3.depth+1;
            backgroundOcean.x = 200;
        }

        if(backgroundOcean2.x>1000){
            backgroundOcean.depth = backgroundOcean+1;
            backgroundOcean2.x = 200;
        }

        if(backgroundOcean3.x>1000){
            backgroundOcean.depth = backgroundOcean2+1;
            backgroundOcean3.x = 200;
        }
    }

    if(dolphin.y<375){
        dolphin.velocityY+=0.25;
    }

    if(dolphin.y<250){
        dolphin.velocityY+=0.25;
    }

    if(dolphin.y>550){
        dolphin.velocityY-=0.25;
    }

    if(dolphin.y>350){
        if(keyDown("DOWN")){
            dolphin.velocityY+=0.1;
        }

        if(keyDown("UP")){
            dolphin.velocityY-=0.1+velocity;
        }
    }

    if(keyDown("RIGHT") && velocity<0.05){
        velocity+=0.01;
    }

    dolphin.depth = 100;

    if(frameCount%100 === 0 && gameState === "play"){
        sharks();
    }

    if(tunaCounter === 0 && gameState === "play"){
        if(tuna.y>tunaY){
            tuna.velocityY-=4;
        }

        if(tuna.y<tunaY){
            tuna.velocityY+=0.05;
        }

        if(tuna.x<-100){
            tuna.x = 2500;
            tunaY = tuna.y+0.01;
        }
    }

    if(gameState === "end" && keyDown("SPACE")){
        reset();
    }
}

function sharks(){
    shark = createSprite(1300,random(350,550),50,50);
    shark.addImage(sharkImg);
    shark.scale = random(0.25,0.4);
    shark.velocityX = random(-8-sharkSpeed,-12-sharkSpeed);
    shark.velocityY = random(-1,1);
    shark.lifetime = 300;
    shark.setCollider("rectangle",0,0,500,150);
    sharkGroup.add(shark);
    dolphin.depth = shark.depth+1;
    score+=5;
}

function reset(){
    sharkGroup.destroyEach();
    dolphin.visible = true;
    sharkSpeed = 0;
    score = 0;
    gameState = "play";
    backgroundOcean.velocityX = 3;
    backgroundOcean2.velocityX = 3;
    backgroundOcean3.velocityX = 3;
    tuna.velocityX = -8-sharkSpeed;
    tuna.x = 2500;
}