let x = 0;
let speedSlider;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.4);
  speedSlider = createSlider(0, 10, 2, 0.1);
  speedSlider.position(10, height + 10);
}

function draw() {
  background(240);
  let speed = speedSlider.value();

  // Draw object
  fill(0, 150, 255);
  ellipse(x, height / 2, 40, 40);

  // Draw velocity arrow
  stroke(0);
  strokeWeight(2);
  let arrowLen = map(speed, 0, 10, 0, 100);
  line(x, height / 2, x + arrowLen, height / 2);      // shaft
  line(x + arrowLen, height / 2, x + arrowLen - 10, height / 2 - 5); // arrowhead
  line(x + arrowLen, height / 2, x + arrowLen - 10, height / 2 + 5);

  x += speed;
  if (x > width) x = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.4);
  speedSlider.position(10, height + 10);
}
