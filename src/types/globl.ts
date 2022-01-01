export interface Point {
  x: number; y: number
};


export interface ContextOptions {
  ctx: CanvasRenderingContext2D,
  filterCtx: CanvasRenderingContext2D,
  width: number,
  height: number
}
