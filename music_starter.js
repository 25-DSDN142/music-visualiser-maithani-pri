let volumeData;
let song;
let currentRow = 0;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20)
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  
   let bar_spacing = height / 10;
   let bar_height = width / 12;
   let bar_pos_x = width / 2;
 
// changes 
   // vocal bar is red
   fill(200, 0, 0);
   rect(bar_pos_x, height / 2 + 1 * bar_spacing, 4 * vocal, bar_height);
   fill(0);
   text("vocals", bar_pos_x, height / 2 + 1 * bar_spacing + 8);
 
   // drum bar is green
   fill(0, 200, 0);
   rect(bar_pos_x, height / 2 + 2 * bar_spacing, 4 * drum, bar_height);
   fill(0);
   text("drums", bar_pos_x, height / 2 + 2 * bar_spacing + 8);
 
   // bass bar is blue
   fill(50, 50, 240);
   rect(bar_pos_x, height / 2 + 3 * bar_spacing, 4 * bass, bar_height);
   fill(0);
   text("bass", bar_pos_x, height / 2 + 3 * bar_spacing + 8);
 
   // other bar is white
   fill(200, 200, 200);
   rect(bar_pos_x, height / 2 + 4 * bar_spacing, 4 * other, bar_height);
   fill(0);
   text("other", bar_pos_x, height / 2 + 4 * bar_spacing + 8);
   fill(255, 255, 0);
 
   // display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3);
}// Visual elements
let particles = [];
let waveOffset = 0;

// Colors
let deepBlue, lightBlue, oceanBlue;

function preload() {
  volumeData = loadTable('volumes.csv', 'csv', 'header');
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(1200, 800);
  
  // Colors closer to poster style
  deepBlue = color(13, 71, 161);    // deep sky
  lightBlue = color(180, 220, 255); // top sky
  oceanBlue = color(20, 90, 160);   // ocean layers
  
  // Subtle particles (mist/bubbles)
  for (let i = 0; i < 20; i++) {
    particles.push(new OceanParticle(random(width), random(height)));
  }
}
function drawSkyGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(lightBlue, deepBlue, inter * 0.8);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawOceanWaves(waveHeight) {
  noStroke();
  let oceanTop = height * 0.65; // ocean only bottom 1/3
  
  for (let layer = 0; layer < 4; layer++) {
    let alpha = map(layer, 0, 3, 200, 80);
    fill(20, 60 + layer*20, 140 + layer*10, alpha);
    
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width + 10; x += 8) {
      let y = oceanTop + 
              sin(x * 0.01 + waveOffset + layer) * waveHeight * (0.4 + layer*0.2);
      vertex(x, y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}
