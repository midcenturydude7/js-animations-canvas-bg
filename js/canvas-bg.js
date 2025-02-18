// Take control of the canvas element in the DOM
const cvs = document.querySelector("canvas");
const c = cvs.getContext("2d");

// Have the canvas element fill the entire window
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

// Ensure the canvas adapts to fit the entire window size whenever the browser is resized
window.addEventListener("resize", () => {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});

// Track mouse movements by creating a global object along with an event listener
let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Diamond {
  constructor(x, y, dx, dy, width) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.minWidth = width;
    this.maxWidth = width * 3;

    let colorArray = ["#DE3D3D", "#090C0B", "#0D2527", "#267368", "#00B1A0"];

    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw = () => {
    // This is where we will control the shape's appearance
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x - this.width / 2, this.y);
    c.lineTo(this.x, this.y + this.width / 2);
    c.lineTo(this.x + this.width / 2, this.y);
    c.lineTo(this.x, this.y - this.width / 2);
    c.lineTo(this.x - this.width / 2, this.y);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
    this.update();
  };

  update = () => {
    // This is where we control movement and interactivity
    if (
      this.x + this.width / 2 >= window.innerWidth ||
      this.x - this.width / 2 <= 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.width / 2 >= window.innerHeight ||
      this.y - this.width / 2 <= 0
    ) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 80 &&
      mouse.x - this.x > -80 &&
      mouse.y - this.y < 80 &&
      mouse.y - this.y > -80 &&
      this.width < this.maxWidth
    ) {
      this.width += 1;
      this.x -= 1;
      this.y -= 1;
    } else if (this.width > this.minWidth) {
      this.width -= 1;
      this.x += 1;
      this.y += 1;
    }
  };
}

let diamondArray = [];

for (let i = 0; i < 400; i++) {
  let width = Math.random() * 20 + 4;
  let x = Math.random() * window.innerWidth;
  let dx = (Math.random() - 0.5) * 1;
  let y = Math.random() * window.innerHeight;
  let dy = (Math.random() - 0.5) * 1;

  diamondArray.push(new Diamond(x, y, dx, dy, width));
}

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // This is where we will call out animation methods such as Shape.draw()
  diamondArray.forEach((diamond) => {
    diamond.draw();
  });
};

animate();
