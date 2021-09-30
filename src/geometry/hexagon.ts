import { Point } from "../types/globl";

/**
*   c ________ b
*   /         \
* d/     ___r__\a
*  \           /
*   \         /
*   e ________ f
*/
export class Hexagon {
  a: Point;
  b: Point;
  c: Point;
  d: Point;
  e: Point;
  f: Point;

  // determine points by radius
  constructor(center: Point, radius: number) {
    this.a = {
      x: center.x + radius,
      y: center.y
    };
    this.b = {
      x: center.x + (radius / 2),
      y: center.y + this.sqrtThreeDivide2(radius)
    };
    this.c = {
      x: center.x - (radius / 2),
      y: center.y + this.sqrtThreeDivide2(radius)
    };
    this.d = {
      x: center.x - radius,
      y: center.y
    };
    this.e = {
      x: center.x - (radius / 2),
      y: center.y - this.sqrtThreeDivide2(radius)
    };
    this.f = {
      x: center.x + (radius / 2),
      y: center.y - this.sqrtThreeDivide2(radius)
    };
  }

  toObject(): object {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  toArray(): Point[] {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }

  /**
  * Sqrt of 3 times a divide by two
  */
  sqrtThreeDivide2(a: number): number { return ((Math.sqrt(3)*a)/2); }
}

export default Hexagon;
