let y = 50;
let v = 0;
let a = 0.5;
let paused = false;
let pauseStart = 0;
let pauseDuration = 30;
let resetButton, fpsSlider, pauseButton, fpsLabel;
let e = 0.8;

// Inputs for a and v
let inputA, inputV;
let labelA, labelV;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.8);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(10, windowHeight * 0.8 + 10);
  resetButton.mousePressed(reset);
  
  // Pause button
  pauseButton = createButton('Pause');
  pauseButton.position(650, windowHeight * 0.8 + 10);
  pauseButton.mousePressed(togglePause);

  // FPS slider
  fpsSlider = createSlider(1, 60, 60, 1);
  fpsSlider.position(100, windowHeight * 0.8 + 10);
  
  // FPS label
  fpsLabel = createSpan('Change FPS');
  fpsLabel.position(100, windowHeight * 0.8 + 30);


  // Acceleration input
  labelA = createSpan('Acceleration:');
  labelA.position(200, windowHeight * 0.8 + 10);
  inputA = createInput(a.toString(), 'number');
  inputA.position(300, windowHeight * 0.8 + 10);
  inputA.size(60);

  // Velocity input
  labelV = createSpan('Initial V:');
  labelV.position(380, windowHeight * 0.8 + 10);
  inputV = createInput(v.toString(), 'number');
  inputV.position(460, windowHeight * 0.8 + 10);
  inputV.size(60);
}

function draw() {
  background('#2d2e39');

  // Apply FPS control
  let fps = fpsSlider.value();
  frameRate(fps);

  // Ball
  fill(255, 100, 100);
  noStroke();
  ellipse(width / 2, y, 40, 40);

  // Velocity arrow
  stroke(255);
  strokeWeight(2);
  let arrowLen = constrain(abs(v) * 5, 0, 80);
  line(width / 2, y, width / 2, y + arrowLen);
  line(width / 2, y + arrowLen, width / 2 - 5, y + arrowLen - 10);
  line(width / 2, y + arrowLen, width / 2 + 5, y + arrowLen - 10);

  // Motion logic
  if (!paused) {
    v += a;
    y += v;

    // Bounce check (only when not paused)
    if (y > height - 20) {
      y = height - 20;
      v = -e * v;

      if (abs(v) < 0.5) {
        v = 0;
        a = 0;
      }
    }
  }

  // Bounce
  if (y > height - 20) {
    y = height - 20;
    v = -e * v;

    if (abs(v) < 0.5) {
      v = 0;
      a = 0;
    }
  }

  // Display text
  noStroke();
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Velocity: " + v.toFixed(2) + " px/frame", 10, 10);
  text("Acceleration: " + a.toFixed(2) + " px/frame²", 10, 35);

  if (v === 0 && a === 0) {
    text("Object has come to rest.", 10, 60);
  }

  // Enable/disable inputs based on pause/state
  if (paused || (v === 0 && a === 0)) {
    inputA.removeAttribute('disabled');
    inputV.removeAttribute('disabled');
  } else {
    inputA.attribute('disabled', '');
    inputV.attribute('disabled', '');
  }
}

function reset() {
  // Apply values from inputs
  let newA = parseFloat(inputA.value());
  let newV = parseFloat(inputV.value());

  if (!isNaN(newA)) a = newA;
  if (!isNaN(newV)) v = newV;

  y = 50;
  paused = false;
  
  pauseButton.html('Pause');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.8);
  let uiY = windowHeight * 0.8 + 10;

  resetButton.position(10, uiY);
  fpsSlider.position(100, uiY);
  labelA.position(280, uiY);
  inputA.position(390, uiY);
  labelV.position(470, uiY);
  inputV.position(550, uiY);
  pauseButton.position(650, uiY);
  fpsLabel.position(100, uiY+20);
}

 // pause
function togglePause() {
paused = !paused;
pauseButton.html(paused ? 'Resume' : 'Pause');
}
