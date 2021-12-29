// import { Particle } from "../types/globl";
import Rain from "../animation/rain";

// https://www.oreilly.com/library/view/html5-canvas/9781449308032/ch05.html
class Drawer {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  rain: Rain;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.rain = new Rain(this.ctx, this.width, this.height);
  }

  start() {

    this.rain.animate();
  }

  // start(): void {
  //   // generate particles
  //   this.particle = {
  //     x: 250,
  //     y: 250,
  //     speed: 5,
  //     angle: 45 /*degree*/,
  //   }
  // }
  //
  // update(): void {
  //   // clear screen
  //   this.ctx.fillStyle = '#EEEEEE';
  //   this.ctx.fillRect(0, 0, this.width, this.height);
  //
  //   // calculate
  //   const newX = this.particle.x + Math.cos(this.angleToRadiant(this.particle.angle)) * this.particle.speed;
  //   const newY = this.particle.y + Math.sin(this.angleToRadiant(this.particle.angle)) * this.particle.speed;
  //
  //   // move particles
  //   this.particle = {
  //     x: newX,
  //     y: newY,
  //     speed: 5,
  //     angle: 45 /*degree*/,
  //   }
  //
  //   // draw at new position
  //   this.ctx.beginPath();
  //   this.ctx.arc(newX, newY, 5, 0, 2 * Math.PI, false);
  //   this.ctx.fillStyle = 'green';
  //   this.ctx.fill();
  //   this.ctx.lineWidth = 5;
  //   this.ctx.strokeStyle = '#003300';
  //   this.ctx.stroke();
  // }

  /**
  * angle from 0 to 360
  */
  angleToRadiant(angle: number): number {
    return angle * Math.PI/ 180;
  }
}

export default Drawer;
