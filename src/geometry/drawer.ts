import Rain from "../animation/rain";
import { ContextOptions } from "../types/globl";

// https://www.oreilly.com/library/view/html5-canvas/9781449308032/ch05.html
class Drawer {
  // `hsl(${((i+j)*15)},100%, 50%)`
  ctx: CanvasRenderingContext2D;
  filterCtx: CanvasRenderingContext2D;
  width: number;
  height: number;

  rain: Rain;

  constructor(
    options: ContextOptions
  ) {
    this.ctx = options.ctx;
    this.filterCtx = options.filterCtx;
    this.width = options.width;
    this.height = options.height;
    this.rain = new Rain({
      ctx: this.ctx,
      filterCtx: this.filterCtx,
      width: this.width,
      height: this.height
    });
  }

  start() {
    this.rain.animate();
  }
}

export default Drawer;
