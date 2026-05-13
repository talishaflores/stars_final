//multiple versions but asked claude for help adjusting distance occurance for the star stopping
//asked claude "this is what i have for code right now, can you please help me find a way to make it"
//stop at a certain point--lets say a random corner for now"

//Asked claude "yo this is my code, i need help adjusting the bluestar function to allow to be less"
//difficult to find the ending point. think of it as a quadrant system. i want it to be in the bottom right"

let bg, sunImg;
let starsImg, uniqueImg;
let myFont;
let starData = [];
let numStars = 25;
let uniqueStar;
let sunY = 0;
let hasReachedDestination = false;

function preload() {
  starsImg = loadImage('img/star.png');
  uniqueImg = loadImage('img/bluestar.png');
  bg = loadImage('img/longersun.jpg');
  sunImg = loadImage('img/Sun.png');
  myFont = loadFont('fonts/Sunshine.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numStars; i++) {
    let rx = random(width);
    let ry = random(height);
    starData.push({
      x: rx, y: ry,
      homeX: rx, homeY: ry,
      angle: random(TWO_PI),
      scale: random(0.5, 1.2)
    });
  }

  let ux = random(width * 0.2, width * 0.8);
  let uy = random(height * 0.2, height * 0.8);
  uniqueStar = {
    x: ux, y: uy,
    homeX: ux, homeY: uy,
    angle: random(TWO_PI),
    scale: 1.5
  };
}

function draw() {
  background(bg);

  sunY += 0.075;
  push();
  translate(width * 0.8, height * 0.85 + sunY);
  imageMode(CENTER);
  image(sunImg, 0, 0, 300, 300);
  pop();

  for (let i = 0; i < starData.length; i++) {
    let s = starData[i];
    let d = dist(mouseX, mouseY, s.x, s.y);

    if (d < 150) {
      let angle = atan2(s.y - mouseY, s.x - mouseX);
      s.x += cos(angle) * 5;
      s.y += sin(angle) * 5;
    } else {
      s.x = lerp(s.x, s.homeX, 0.05);
      s.y = lerp(s.y, s.homeY, 0.05);
    }

    push();
    translate(s.x + random(-1, 1), s.y + random(-1, 1));
    rotate(s.angle);
    scale(s.scale);
    imageMode(CENTER);
    image(starsImg, 0, 0, 50, 50);
    pop();
  }

  let ud = dist(mouseX, mouseY, uniqueStar.x, uniqueStar.y);

  if (!hasReachedDestination) {
    if (ud < 250) {
      let uAngle = atan2(uniqueStar.y - mouseY, uniqueStar.x - mouseX);
      uniqueStar.x += cos(uAngle) * 7;
      uniqueStar.y += sin(uAngle) * 7;
    } else {
      uniqueStar.x = lerp(uniqueStar.x, uniqueStar.homeX, 0.05);
      uniqueStar.y = lerp(uniqueStar.y, uniqueStar.homeY, 0.05);
    }

    if (uniqueStar.x > width * 0.6 && uniqueStar.y > height * 0.6) {
      hasReachedDestination = true;
    }
  }

  push();
  translate(uniqueStar.x + random(-1, 1), uniqueStar.y + random(-1, 1));
  rotate(uniqueStar.angle);
  scale(uniqueStar.scale);
  imageMode(CENTER);
  image(uniqueImg, 0, 0, 60, 60);
  pop();

  if (hasReachedDestination && dist(mouseX, mouseY, uniqueStar.x, uniqueStar.y) < 80) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  fill('rgb(233,229,229)');
  noStroke();
  textFont(myFont);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("The stars are \n proof that...", width / 2, height / 2);
}

function mousePressed() {
  if (hasReachedDestination) {
    let d = dist(mouseX, mouseY, uniqueStar.x, uniqueStar.y);
    if (d < 80) {
      window.location.href = "page2.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}