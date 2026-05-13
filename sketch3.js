//asked Claude "im having difficulty finding a way to make this star move with the mouse"
//"how do i move this star following the mouse's x-axis and a curved y-axis angle very similar"
//to a shooting star effect. 

//not a request but i just wanna say claude lowkey sucked at this request so i resent the code over
//and over to see what the problem was but claude kept making the same mistake. i had to recode some things
//my self that claude did because it almost exploded the entire page

//also asked gemini: "this is my code with some adjustments added by claude. the star refuses to move. is there"
//any way to fix this?"

let starImg;
let bgImg;
let myFont;
let bgStars = [];
let numBgStars = 10;

let hasReachedEnd = false;
let hasMouseMoved = false;
let finalX, finalY;

function preload() {
  starImg = loadImage('img/star.png');
  bgImg = loadImage('img/gradient.jpg');
  myFont = loadFont('fonts/Sunshine.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numBgStars; i++) {
    bgStars.push({
      x: random(width),
      y: random(height),
      angle: random(TWO_PI),
      size: random(20, 45)
    });
  }
}

function mouseMoved() {
  hasMouseMoved = true;
}

function draw() {
  imageMode(CORNER);
  image(bgImg, 0, 0, width, height);

  let t = constrain(1 - (mouseX / width), 0, 1);

  let startX = width * 0.85;
  let startY = height * 0.2;
  let controlX = width * 0.5;
  let controlY = height * 0.1;
  let endX = width * 0.15;
  let endY = height * 0.7;

  if (hasMouseMoved && t >= 0.99 && !hasReachedEnd) {
    hasReachedEnd = true;
    finalX = bezierPoint(startX, controlX, controlX, endX, 1);
    finalY = bezierPoint(startY, controlY, controlY, endY, 1);
  }

  for (let s of bgStars) {
    push();
    translate(s.x, s.y);
    rotate(s.angle + t * TWO_PI);
    imageMode(CENTER);
    image(starImg, 0, 0, s.size, s.size);
    pop();
  }

  let x, y;

  if (hasReachedEnd) {
    x = finalX;
    y = finalY;
    if (dist(mouseX, mouseY, x, y) < 75) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  } else {
    x = bezierPoint(startX, controlX, controlX, endX, t);
    y = bezierPoint(startY, controlY, controlY, endY, t);
    cursor(ARROW);
  }

  fill(255);
  noStroke();
  textFont(myFont);
  textSize(75);
  textAlign(CENTER, CENTER);
  text("There is a little light", width * 0.65, height * 0.6);

  push();
  translate(x, y);
  rotate(hasReachedEnd ? PI : t * -PI);
  imageMode(CENTER);
  image(starImg, 0, 0, 150, 150);
  pop();
}

function mousePressed() {
  if (hasReachedEnd) {
    let d = dist(mouseX, mouseY, finalX, finalY);
    if (d < 75) {
      window.location.href = "about.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}