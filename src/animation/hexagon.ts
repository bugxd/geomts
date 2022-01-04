import { ContextOptions } from "../types/globl";


//https://eperezcosano.github.io/hex-grid/
class Hexagon {
  a = 2 * Math.PI / 6;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  color: string;

  // visible lines
  visible = [
    true, // top left
    true, // top
    true, // top right
    true, // bottom left
    true, // bottom
    true // bottom right
  ];

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number, // center point x
    y: number, // center point y
    r: number, // radius
    color: string,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  /**
  *    2 ________ 1
  *    /         \
  * 3 /     ___r__\ 0
  *   \           /
  *    \         /
  *    4 ________ 5
  */
  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const x = this.x + this.r * Math.cos(this.a * i);
      const y = this.y + this.r * Math.sin(this.a * i);
      if(this.visible[i])
        this.ctx.lineTo(x, y);
      else
        this.ctx.moveTo(x, y);
    }
    //this.ctx.closePath();
    this.ctx.stroke();
  }

  removeTopRight() {this.visible[0] = false;}
  removeTop() {this.visible[1] = false;}
  removeTopLeft() {this.visible[2] = false;}
  removeBottomLeft() {this.visible[3] = false;}
  removeBottom() {this.visible[4] = false;}
  removeBottomRight() {this.visible[5] = false;}
}

class HexagonGrid {
  ctx: CanvasRenderingContext2D;
  filterCtx: CanvasRenderingContext2D;
  width: number;
  height: number;
  grid: Hexagon[][];

  a = 2 * Math.PI / 6;
  r: number;

  constructor(
    options: ContextOptions,
    r: number,
  ) {
    this.ctx = options.ctx;
    this.filterCtx = options.filterCtx;
    this.width = options.width;
    this.height = options.height;

    this.r = r;

    this.grid = [];
    // init grid
    let i = 0;
    for (let y = this.r;
      y + 2*this.r * Math.sin(this.a) < this.height;
      y += 2*this.r * Math.sin(this.a)) {
      for (let x = this.r, j = 0;
        x + this.r * (1 + Math.cos(this.a)) < this.width;
        x += this.r * (1 + Math.cos(this.a)), y += (-1) ** j++ * this.r * Math.sin(this.a)) {
        const hex = new Hexagon(this.ctx, x, y, this.r, "balck");
        if(!this.grid[i]) this.grid[i] = [];
        this.grid[i].push(hex);
      }
      i++;

    }
  }

  draw() {
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        if(Math.random() < .05){
          const neighbor = Math.floor(Math.random() * 6); // 0,1,2,3,4,5
          if(j % 2 === 0) {
            // even -> neighbors 3 top 1 bottom
            switch(neighbor) {
              case 0:
                this.grid[i][j].removeTopRight();
                this.grid[i-1] && this.grid[i-1][j+1] && this.grid[i-1][j+1].removeBottomLeft();
                break;
              case 1:
                this.grid[i][j].removeTop();
                this.grid[i-1] && this.grid[i-1][j] && this.grid[i-1][j].removeBottom();
                break;
              case 2:
                this.grid[i][j].removeTopLeft();
                this.grid[i-1] && this.grid[i-1][j-1] && this.grid[i-1][j-1].removeBottomRight();
                break;
              case 3:
                this.grid[i][j].removeBottomLeft();
                this.grid[i] && this.grid[i][j-1] && this.grid[i][j-1].removeTopRight();
                break;
              case 4:
                this.grid[i][j].removeBottom();
                this.grid[i+1] && this.grid[i+1][j] && this.grid[i+1][j].removeTop();
                break;
              case 5:
                this.grid[i][j].removeBottomRight();
                this.grid[i] && this.grid[i][j+1] && this.grid[i][j+1].removeTopLeft();
                break;
            }
          } else {
            // odd -> neighbors 1 top 3 bottom
            switch(neighbor) {
              case 0:
                this.grid[i][j].removeTopRight();
                this.grid[i] && this.grid[i][j+1] && this.grid[i][j+1].removeTopLeft();
                break;
              case 1:
                this.grid[i][j].removeTop();
                this.grid[i-1] && this.grid[i-1][j] && this.grid[i-1][j].removeBottom();
                break;
              case 2:
                this.grid[i][j].removeTopLeft();
                this.grid[i] && this.grid[i][j-1] && this.grid[i][j-1].removeBottomRight();
                break;
              case 3:
                this.grid[i][j].removeBottomLeft();
                  this.grid[i+1] && this.grid[i+1][j-1] && this.grid[i+1][j-1].removeTopRight();
                break;
              case 4:
                this.grid[i][j].removeBottom();
                this.grid[i+1] && this.grid[i+1][j] && this.grid[i+1][j].removeTop();
                break;
              case 5:
                this.grid[i][j].removeBottomRight();
                this.grid[i+1] && this.grid[i+1][j+1] && this.grid[i+1][j+1].removeTopLeft();
                break;
            }
          }
        }
        this.grid[i][j].draw();
      }
    }
  }
}

export default HexagonGrid;
