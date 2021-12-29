//https://www.youtube.com/watch?v=nrJh8-Ixnu8
import Stars from "../animation/stars";

class Drop {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string; // color in hsl
  size: number;
  weight: number;
  directionX: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 10;
    this.weight = this.randomBetween(-3,2);
    if(this.weight < 0)
      this.directionX = this.randomBetween(-4,4);
    else
      this.directionX = this.randomBetween(-2,2);
  }

  update() {
    this.weight += 0.1;
    this.y += this.weight;
    this.x += this.directionX;
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

class Rain {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  drops: Drop[] = [];
  stars: Stars[] = [];

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    const count = 10

    for(let i = 0; i<count; i++) {
      const color = `hsl(${360 / count * i},100%, 50%)`
      this.drops.push(new Drop(
        this.ctx,
        this.width/2,
        100,
        color));
      const star = new Stars(
        this.ctx,
        this.width,
        this.height,
        color,
      );

      star.animate();
      this.stars.push(star);
    }

    console.log(this.stars);
  }

  animate() {
    let done = false;

    this.ctx.fillStyle = "rgba(255,255,255,1)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for(let i = 0; i<this.drops.length; i++) {
      const current = this.drops[i];
      current.update();

      this.stars[i].addParticles(current.x, current.y, 1);
      this.stars[i].animate();
      done = done || current.y > this.height
    }

    if(!done)
      requestAnimationFrame(this.animate.bind(this));

    if(done) {
      for(let i = 0; i<this.stars.length; i++) {
        this.stars[i].stop();
      }
    }
  }
}

export default Rain;
