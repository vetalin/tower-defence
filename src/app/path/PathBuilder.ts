import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../game/const";
import {
  getBlankArray,
  getRandomDigit,
  getRandomDigitMinMax,
} from "../helper/help";
import { CurvePath } from "./CurvePath";
import { PathDirection, PathPoint, PathPoints } from "./interface";
import { PathDrawer } from "./PathDrawer";

export class PathBuilder {
  direction: PathDirection;
  countCurvesLimit = 3;
  endPoint = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
  startPoint: PathPoint;
  step = 35;
  maxStep = 45;
  minStep = 20;
  spaceBetweenCurves = 55;
  ctx: any;

  path: PathPoints = [];

  constructor(ctx: any) {
    this.ctx = ctx;
  }

  build(): void {
    this.getRandomDirection();
    this.getStartPoint();
    this.renderAllPointForPath();
    const pathDrawer = new PathDrawer(this.ctx, this.path);
    pathDrawer.draw();
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

    this.startPoint = {
      ...startPoints[this.direction],
      direction: this.direction,
    };
  }

  getNextPoint(fromPosition: PathPoint): PathPoint {
    switch (this.direction) {
      case "toTop":
        return {
          ...fromPosition,
          x: fromPosition.x,
          y: fromPosition.y - this.spaceBetweenCurves,
        };
      case "toRight":
        return {
          ...fromPosition,
          x: fromPosition.x + this.spaceBetweenCurves,
          y: fromPosition.y,
        };
      case "toBottom":
        return {
          ...fromPosition,
          x: fromPosition.x,
          y: fromPosition.y + this.spaceBetweenCurves,
        };
      case "toLeft":
        return {
          ...fromPosition,
          x: fromPosition.x - this.spaceBetweenCurves,
          y: fromPosition.y,
        };
    }
  }

  renderAllPointForPath(): void {
    const curvesCount = getRandomDigit(this.countCurvesLimit);
    const pathPointsList = [this.startPoint, ...getBlankArray(curvesCount)];

    const path = pathPointsList.reduce((pathPoints, _, currentPointIndex) => {
      if (currentPointIndex === 0) {
        return [this.getNextPoint(this.startPoint)];
      }

      const curvePath = new CurvePath(
        this.direction,
        getRandomDigitMinMax(this.minStep, this.maxStep)
      );
      const curvePoints = curvePath.getCurvePoints(
        pathPoints[pathPoints.length - 1]
      );

      const lastCurvePointIndex = curvePoints.length - 1;
      const lastCurvePoint = curvePoints[lastCurvePointIndex];

      return [...pathPoints, ...curvePoints, this.getNextPoint(lastCurvePoint)];
    }, []);

    this.path = [this.startPoint, ...path, this.endPoint];
  }
}
