let x = 50;
let v = 0;
let aSlider;
let dir = 1; // 1 = right, -1 = left

function setup() {
  createCanvas(windowWidth, windowHeight * 0.4);
  aSlider = createSlider(0, 1, 0.1, 0.01);
  aSlider.position(10, height + 10);
}

function draw() {
  background(240);
  let a = aSlider.value() * dir;

  // Draw object
  fill(255, 100, 100);
  ellipse(x, height / 2, 40, 40);

  // Velocity arrow
  stroke(0);
  strokeWeight(2);
  let arrowLen = constrain(abs(v) * 10, 0, 100) * dir;
  line(x, height / 2, x + arrowLen, height / 2);
  line(x + arrowLen, height / 2, x + arrowLen - 10 * dir, height / 2 - 5);
  line(x + arrowLen, height / 2, x + arrowLen - 10 * dir, height / 2 + 5);

  v += a;
  x += v;

  // Bounce logic
  if (x > width - 20 || x < 20) {
    dir *= -1;     // flip direction
    v = 0;         // reset velocity
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.4);
  aSlider.position(10, height + 10);
}
