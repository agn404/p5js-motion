let y = 50;
let v = 0;
let a = 0.5;
let aDefault = 0.5;
let paused = false;
let e = 0.8;

let resetButton, fpsSlider, pauseButton, gravityButton, fpsLabel;
let inputA, inputV, labelA, labelV;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.8);

  // UI Elements
  resetButton = createButton('Reset');
  resetButton.mousePressed(reset);

  fpsSlider = createSlider(1, 60, 60, 1);

  pauseButton = createButton('Pause');
  pauseButton.mousePressed(togglePause);

  gravityButton = createButton('Gravity: On');
  gravityButton.mousePressed(toggleGravity);

  labelA = createSpan('Acceleration:');
  inputA = createInput(a.toString(), 'number');
  inputA.size(60);

  labelV = createSpan('Initial V:');
  inputV = createInput(v.toString(), 'number');
  inputV.size(60);

  fpsLabel = createSpan('Change FPS');

  layoutUI(); // Position all elements once
}

function draw() {
  background('#2d2e39');

  frameRate(fpsSlider.value());

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

  if (!paused) {
    v += a;
    y += v;

    if (y > height - 20) {
      y = height - 20;
      v = -e * v;

      if (abs(v) < 0.5) {
        v = 0;
        a = 0;
      }
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

  // Enable/disable inputs when paused or at rest
  if (paused || (v === 0 && a === 0)) {
    inputA.removeAttribute('disabled');
    inputV.removeAttribute('disabled');
  } else {
    inputA.attribute('disabled', '');
    inputV.attribute('disabled', '');
  }
}

function layoutUI() {
  let uiY = windowHeight * 0.8 + 10;

  resetButton.position(10, uiY);
  fpsSlider.position(100, uiY);
  fpsLabel.position(120, uiY + 30);

  labelA.position(270, uiY + 5);
  inputA.position(370, uiY);

  labelV.position(450, uiY + 5);
  inputV.position(520, uiY);

  gravityButton.position(610, uiY);
  pauseButton.position(700, uiY);
}

function reset() {
  let newA = parseFloat(inputA.value());
  let newV = parseFloat(inputV.value());

  if (!isNaN(newA)) {
    a = newA;
    aDefault = newA;
  }
  if (!isNaN(newV)) v = newV;

  y = 50;
  paused = false;

  pauseButton.html('Pause');
  gravityButton.html(a === 0 ? 'Gravity: Off' : 'Gravity: On');
}

function togglePause() {
  paused = !paused;
  pauseButton.html(paused ? 'Resume' : 'Pause');
}

function toggleGravity() {
  if (a === 0) {
    a = aDefault;
    gravityButton.html('Gravity: On');
  } else {
    a = 0;
    gravityButton.html('Gravity: Off');
  }
}
