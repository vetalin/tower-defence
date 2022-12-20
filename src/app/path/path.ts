import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../game/const";
import { Position } from "../game/interface";
import { getBlankArray, getRandomDigit } from "../helper/help";
import { CurvePath } from "./curvePath";

export type PathDirection = "toTop" | "toLeft" | "toRight" | "toBottom";

type PathPoints = Position[];

export class Path {
  direction: PathDirection;
  countCurvesLimit = 3;
  endPoint = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
  startPoint: Position;
  step = 100;
  spaceBetweenCurves = 100;
  ctx: any;

  path: PathPoints = [];

  constructor(ctx: any) {
    this.ctx = ctx;
  }

  build(): void {
    this.getRandomDirection();
    this.getStartPoint();
    this.renderPathWithCurves();
    this.drawPath();
  }

  getRandomDirection(): void {
    const directions = ["toTop", "toLeft", "toRight", "toBottom"];

    this.direction = directions[
      getRandomDigit(directions.length)
    ] as PathDirection;
  }

  getStartPoint(): void {
    const topCenterPath = { x: CANVAS_WIDTH / 2, y: 0 };
    const leftCenterPath = { x: 0, y: CANVAS_HEIGHT / 2 };
    const rightCenterPath = { x: CANVAS_WIDTH, y: CANVAS_HEIGHT / 2 };
    const bottomCenterPath = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT };

    const startPoints = {
      toTop: bottomCenterPath,
      toLeft: rightCenterPath,
      toRight: leftCenterPath,
      toBottom: topCenterPath,
    };

    this.startPoint = startPoints[this.direction];
  }

  drawPath(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.path.map((path) => {
      this.ctx.lineTo(path.x, path.y);
    });

    this.ctx.stroke();
  }

  getNextPoint(fromPosition: Position): Position {
    switch (this.direction) {
      case "toTop":
        return {
          x: fromPosition.x,
          y: fromPosition.y + this.spaceBetweenCurves,
        };
      case "toRight":
        return {
          x: fromPosition.x - this.spaceBetweenCurves,
          y: fromPosition.y,
        };
      case "toBottom":
        return {
          x: fromPosition.x,
          y: fromPosition.y - this.spaceBetweenCurves,
        };
      case "toLeft":
        return {
          x: fromPosition.x + this.spaceBetweenCurves,
          y: fromPosition.y,
        };
    }
  }

  renderPathWithCurves(): void {
    const curvesCount = getRandomDigit(this.countCurvesLimit);
    const pathPointsList = [this.startPoint, ...getBlankArray(curvesCount)];

    const path = pathPointsList.reduce((pathPoints, _, currentPointIndex) => {
      if (pathPoints.length === 0) {
        return [this.getNextPoint(this.startPoint)];
      }

      const curvePath = new CurvePath(this.direction);
      const curvePoints = curvePath.getCurvePoints(
        pathPoints[currentPointIndex - 1]
      );

      return [
        ...pathPoints,
        ...curvePoints,
        this.getNextPoint(curvePoints[curvePoints.length - 1]),
      ];
    }, [] as Position[]);

    this.path = [this.startPoint, ...path, this.endPoint];
  }
}
