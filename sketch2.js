let num = 40;
let stars = [];
let starImg, bgImg, overlayImg;
let myFont;
let textX, textY;
let overlayGraphics;
let tWidth, tHeight; 

function preload() {
  myFont = loadFont('fonts/Sunshine.ttf');
  starImg = loadImage("img/star.png");
  bgImg = loadImage("img/bluesketch2.jpg"); 
  overlayImg = loadImage("img/starrynight.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlayGraphics = createGraphics(windowWidth, windowHeight);
  
  textX = random(200, width - 300); 
  textY = random(100, height - 100);

  for (let i = 0; i < num; i++) {
    stars.push({ 
      x: random(0.1, 0.9), 
      y: random(0.1, 0.9),
      angle: random(TWO_PI),
      size: random(0.3, 1.5)
    });
  }

  textFont(myFont);
  textSize(55);
  tWidth = textWidth("...Even on the"); 
  tHeight = 55 * 2.5; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  overlayGraphics.resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  imageMode(CENTER);
  image(bgImg, width/2, height/2, width, height); 

  let isHovering = mouseX > textX && mouseX < textX + tWidth && mouseY > textY && mouseY < textY + tHeight;

  if (isHovering) {
    cursor(HAND);
    fill(255);
  } else {
    cursor(ARROW);
    fill(56, 65, 182);
  }

  textFont(myFont);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(55);
  text("...Even on the \n darkest night...", textX, textY);

  updateSpotlight(mouseX, mouseY, 200);
  image(overlayGraphics, width/2, height/2);
}

function updateSpotlight(x, y, radius) {
  overlayGraphics.clear();
  overlayGraphics.imageMode(CENTER);
  
  overlayGraphics.image(overlayImg, width/2, height/2, width, height);
  
  for (let i = 0; i < stars.length; i++ ) {
    let s = stars[i];
    overlayGraphics.push(); 
    overlayGraphics.translate(s.x * width, s.y * height);
    overlayGraphics.rotate(s.angle);
    overlayGraphics.scale(s.size);
    overlayGraphics.imageMode(CENTER);
    overlayGraphics.image(starImg, 0, 0, 40, 40);
    overlayGraphics.pop(); 
  }

  overlayGraphics.erase(); 
  overlayGraphics.ellipse(x, y, radius * 2); 
  overlayGraphics.noErase();
}

function mousePressed() {
  if (mouseX > textX && mouseX < textX + tWidth && mouseY > textY && mouseY < textY + tHeight) {
    window.location.href = "page3.html";
  }
}