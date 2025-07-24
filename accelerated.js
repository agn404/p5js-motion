let canvas;
let y = 50;
let v = 0;
let a = 0.5;
let aDefault = 0.5;
let paused = false;
let e = 0.8;

let resetButton, fpsSlider, pauseButton, gravityButton, fpsLabel;
let inputA, inputV, labelA, labelV;

function setup() {
  canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.75);
  canvas.position(windowWidth * 0.05, 10);
  canvas.style('border-radius', '8px');
  // UI Elements
  resetButton = createButton('Reset');
  resetButton.mousePressed(reset);

  pauseButton = createButton('Pause');
  pauseButton.mousePressed(togglePause);

  gravityButton = createButton('Gravity: On');
  gravityButton.mousePressed(toggleGravity);

  fpsSlider = createSlider(1, 60, 60, 1);
  fpsLabel = createSpan('Change FPS');

  labelA = createSpan('Acceleration:');
  inputA = createInput(a.toString(), 'number');
  inputA.size(60);

  labelV = createSpan('Initial V:');
  inputV = createInput(v.toString(), 'number');
  inputV.size(60);

  // Style all controls
  [resetButton, pauseButton, gravityButton, inputA, inputV, fpsSlider].forEach(styleUI);

  layoutUI();

  document.body.style.backgroundColor = '#151222';
  
  textFont('Lexend');
}

function draw() {
  
  background('#21263F');
  frameRate(fpsSlider.value());

  // Ball
  fill(255, 100, 100);
  noStroke();
  ellipse(width / 2, y, 40, 40);

  // Velocity Arrow
  stroke(255);
  strokeWeight(2);
  let arrowLen = constrain(abs(v) * 5, 0, 80);
  let arrowDir = v >= 0 ? 1 : -1;

  line(width / 2, y, width / 2, y + arrowDir * arrowLen);
  line(width / 2, y + arrowDir * arrowLen, width / 2 - 5, y + arrowDir * arrowLen - 10 * arrowDir);
  line(width / 2, y + arrowDir * arrowLen, width / 2 + 5, y + arrowDir * arrowLen - 10 * arrowDir);

  // Motion logic
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
  textSize(18);
  textAlign(LEFT, TOP);
  text("Velocity: " + v.toFixed(2) + " px/frame", 10, 10);
  text("Acceleration: " + a.toFixed(2) + " px/frame²", 10, 35);
  if (v === 0 && a === 0) {
    text("Object has come to rest.", 10, 60);
  }

  // Enable/disable input fields
  if (paused || (v === 0 && a === 0)) {
    inputA.removeAttribute('disabled');
    inputV.removeAttribute('disabled');
  } else {
    inputA.attribute('disabled', '');
    inputV.attribute('disabled', '');
  }
}

function layoutUI() {
  const y1 = height + 20;
  const y2 = y1 + 40;
  const y3 = y2 + 40;
  const centerX = windowWidth / 2;

  // First row buttons
  const buttonSpacing = 100;
  layoutRow([resetButton, pauseButton, gravityButton], centerX- 25, y1, buttonSpacing);

  // Second row inputs
  labelA.position(centerX - 180, y2 + 2);
  inputA.position(centerX - 75, y2);
  labelV.position(centerX + 25, y2 + 2);
  inputV.position(centerX + 95, y2);

  // Third row FPS
  fpsSlider.position(centerX - 90, y3);
  fpsSlider.style('width', '150px');
  fpsLabel.position(centerX + 90, y3 + 5);

  [labelA, labelV, fpsLabel].forEach(label => {
    label.style('color', 'white');
    label.style('font-size', '16px');
    label.style('font-family', 'Lexend, sans-serif');
  });
}

function layoutRow(elements, centerX, y, spacing) {
  const totalWidth = (elements.length - 1) * spacing;
  let startX = centerX - totalWidth / 2;
  for (let i = 0; i < elements.length; i++) {
    elements[i].position(startX + i * spacing, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowHeight * 0.75);
  canvas.position(windowWidth * 0.05, 10);
  layoutUI();
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

function styleUI(el) {
  el.style('border-radius', '8px');
  el.style('padding', '5px 10px');
  el.style('border', 'none');
  el.style('background', '#272736');
  el.style('color', 'white');
  el.style('font-family', 'Lexend, sans-serif');
}
