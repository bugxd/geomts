import IParticle from "./particle";
import { ContextOptions } from "../types/globl";

class Particle implements IParticle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  stuck: boolean = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 2 -1.5;
    this.speedY = Math.random() * 2 -1.5;
    this.color = color;
  }

  update() {
    if(!this.stuck) {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.size > 0.2) {
        this.size -= 0.1;
      }

      this.stuck = Math.random() < 0.01;
    }
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
		this.ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
		this.ctx.fill();
    this.ctx.closePath();
  }
}

class Stars {
  ctx: CanvasRenderingContext2D;
  filterCtx: CanvasRenderingContext2D;
  width: number;
  height: number;
  color: string;
  particles: Particle[] = [];
  // use to stop animation
  done = false;

  constructor(
    options: ContextOptions,
    color: string,
  ) {
    this.ctx = options.ctx;
    this.filterCtx = options.filterCtx;
    this.width = options.width;
    this.height = options.height;
    this.color = color;
  }

  addParticles(x: number, y: number, count: number) {
    for(let i = 0; i<count; i++) {
      this.particles.push(new Particle(this.filterCtx, x, y, this.color));
    }
  }

  animate() {
    for(let i = 0; i<this.particles.length; i++) {
      const current = this.particles[i];
      current.update();

      // connect particles
      for(let j = i; j<this.particles.length; j++) {
        // compare each particle with all oters
        const other = this.particles[j];
        // distance calculated with pythagorean thorem (tringle with 90 degrees)
        const dx = current.x - other.x;
        const dy = current.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < 50) {
          // distance smaller 100 px
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.color
          this.ctx.lineWidth = current.size / 2;
          this.ctx.moveTo(current.x, current.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      }
      if(current.size <= 0.3) {
        // delete if to small
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  stop() {
    this.done = true;
  }
}

export default Stars;
