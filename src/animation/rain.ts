//https://www.youtube.com/watch?v=nrJh8-Ixnu8
import Stars from "../animation/stars";
import IParticle from "./particle";
import { ContextOptions } from "../types/globl";

//https://codepen.io/franksLaboratory/pen/zYvGWMY?editors=0010

class Particle implements IParticle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
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
    // negative weight make particle go upwards
    this.weight = this.randomBetween(-7,5);
    if(this.weight < 0)
      this.directionX = this.randomBetween(-2,2);
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
    this.ctx.fill();
    this.ctx.closePath();
  }

  randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

class Rain {
  ctx: CanvasRenderingContext2D;
  filterCtx: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[] = [];
  stars: Stars[] = [];

  constructor(
    options: ContextOptions
  ) {
    this.ctx = options.ctx;
    this.filterCtx = options.filterCtx;
    this.width = options.width;
    this.height = options.height;

    const count = 10

    for(let i = 0; i<count; i++) {
      const color = `hsl(${360 / count * i},100%, 50%)`
      this.particles.push(new Particle(
        this.ctx,
        this.width/2,
        200,
        color));
      const star = new Stars({
          ctx: this.ctx,
          filterCtx: this.filterCtx,
          width: this.width,
          height: this.height
        },
        color,
      );

      star.animate();
      this.stars.push(star);
    }
  }

  x = 150;

  animate() {
    let done = false;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.filterCtx.clearRect(0, 0, this.width, this.height);

    this.filterCtx.fillStyle ="black";
    this.filterCtx.beginPath();
    this.filterCtx.arc(50, 100, 50, 0, Math.PI * 2);
    this.filterCtx.fill();
    this.filterCtx.closePath();
    this.filterCtx.fillStyle ="black";
    this.filterCtx.beginPath();
    this.filterCtx.arc(this.x, 100, 50, 0, Math.PI * 2);
    this.filterCtx.fill();
    this.filterCtx.closePath();
    this.x++;
    if(this.x > 200) this.x = 100;

    for(let i = 0; i<this.particles.length; i++) {
      const current = this.particles[i];
      current.update();

      this.stars[i].addParticles(current.x, current.y, 1);
      this.stars[i].animate();
      done = done && current.y > this.height;
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
