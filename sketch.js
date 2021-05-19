var paddle, ball;
var bricks,brickimg, paddleimg,bg,ballimg;
var topedge, bottomedge, leftedge, rightedge;
var ballspeed = 5;
var WALL_THICKNESS = 30;
var BRICK_W = 40;
var BRICK_H = 20;
var BRICK_MARGIN = 4;
var ROWS = 5;
var COLUMNS = 13;
var gamestat=true;
var score =0;

function preload(){
  bg=loadImage("assets/background.jpg");
  brickimg =loadImage("assets/brick.png");
  paddleimg = loadImage("assets/paddle.png");
  ballimg = loadImage("assets/ball.png");
}

function setup() {
  createCanvas(650, 500);

  paddle = createSprite(width/2, height-50);
  paddle.immovable = true;
  paddleimg.resize(100,10);
  paddle.addImage(paddleimg);
  ball = createSprite(width/2, height-200);
  ballimg.resize(10,10);
  ball.addImage(ballimg);
  
  topedge = createSprite(0,0,2*width,1);
  leftedge = createSprite(0,0,1,2*height);
  rightedge = createSprite(width,0,1,2*height);
  bottomedge = createSprite(0,height,2*width,1);
  topedge.immovable = true;
  leftedge.immovable = true;
  rightedge.immovable = true;
  bottomedge.immovable = true;
  
  ball.maxSpeed = ballspeed;
  paddle.shapeColor = color(255, 255, 255);
  
  
  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;
brickimg.resize(BRICK_W,BRICK_H);
  for(var i = 0; i<ROWS; i++)
    for(var j = 0; j<COLUMNS; j++) {
      var brick = createSprite(offsetX+j*(BRICK_W+BRICK_MARGIN), offsetY+i*(BRICK_H+BRICK_MARGIN));

      brick.addImage(brickimg);
      bricks.add(brick);
      brick.immovable = true;
    } 
}

function draw() {
  if(gamestat == true){
    background(bg);
  paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);

  ball.bounce(topedge);
  ball.bounce(bottomedge,ballhit);
  ball.bounce(leftedge);
  ball.bounce(rightedge);

if(ball.bounce(paddle))
  {
    var swing = (ball.position.x-paddle.position.x)/3;
    ball.setSpeed(ballspeed, ball.getDirection()+swing);
  }

  ball.bounce(bricks, brickHit);
    }
  drawSprites();
  textSize(25);
  text("Score "+score+"",10,30);
  if(gamestat == false){
    paddle.immovable = true;
    ballhit();
  }
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0)
    ball.setSpeed(ballspeed, random(90-10, 90+10));
}

function brickHit(ball, brick) {
  brick.remove();
  score++;
}

function ballhit (){
  ball.remove();
  gamestat = false;
  fill(100,104,222);
  textSize(45);
  textStyle(BOLD);
  text("Game Over",175,250);
}