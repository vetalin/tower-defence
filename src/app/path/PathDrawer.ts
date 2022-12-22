import { Position } from "../game/interface";

export class PathDrawer {
  private ctx: any;
  private path: Position[];

  constructor(ctx: any, path: Position[]) {
    this.ctx = ctx;
    this.path = path;
  }

  draw(): void {
    this.ctx.beginPath();
    const startPoint = this.path[0];
    this.ctx.moveTo(startPoint.x, startPoint.y);
    this.path.map((path) => {
      this.ctx.lineTo(path.x, path.y);
    });

    this.ctx.stroke();
  }
}
