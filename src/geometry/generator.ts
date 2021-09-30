import Hexagon from "./hexagon";
import { Circle, Point } from "../types/globl";

export default class Generator {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  circles: Circle[] = [];

  constructor(ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  generate(): void {
    var protector = 0;
    while(this.circles.length < 250) {
      var r = this.randomBetween(10, 50);
      var x = this.randomBetween(0, this.width -r);
      var y = this.randomBetween(0, this.height -r);


      if(!this.outOfBoundary({x, y, r}) && !this.intersects({x, y, r})){
        this.circles.push({x, y, r})
      } else {
        protector ++;
      }

      if(protector === 10000) break;
    }

    this.circles.forEach(c => {
      const hexagon = new Hexagon({x: c.x, y: c.y}, c.r).toArray();
      this.drawPointArray(hexagon);
    })
  }

  drawPointArray(points: Point[]) {
    if(points && points.length>0) {
      this.ctx.fillStyle = '#000';
      this.ctx.lineWidth = this.randomBetween(1,10);
      this.ctx.beginPath();
      points.forEach((p, i) =>  {
        if(i === 0)  this.ctx.moveTo(p.x, p.y);
        else this.ctx.lineTo(p.x, p.y);
      });
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  // returns true if circle is out of boundary
  outOfBoundary(circle: Circle): boolean {
    if(circle.x - circle.r < 0)
      return true;

    if(circle.x + circle.r > this.width)
      return true;

    if(circle.y - circle.r < 0)
      return true;

    if(circle.y + circle.r > this.height)
      return true;

    return false;
  }

  // returns true if circle intersects any circle in circles
  intersects(circle: Circle): boolean {
    var overlapping = false;

    for(var i = 0; i < this.circles.length; i++) {
      var old = this.circles[i];
      var distance = this.distance(
        {x: circle.x, y: circle.y},
        {x: old.x, y: old.y}
      );

      if(distance < circle.r + old.r){
        // overlapping
        overlapping = true;
        break;
      }
    }

    return overlapping;
  }

  // get the distance between two points
  distance(p1: Point, p2: Point): number {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;

    return Math.sqrt( a*a + b*b );
  }

  randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
