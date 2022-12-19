import { getCastle } from "../castle/getCastle";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../game/const";
import { Position } from "../game/interface";

enum PathDirection {
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
}

type PathPoints = Position[];

export class Path {
  private direction: PathDirection;
  private countCurvesLimit = 3;
  private endPoint = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
  private startPoint: Position;
  private step = 100;
  private limitCurveLine = 3;
  private spaceBetweenCurves = 100;
  private ctx: any;

  private path: PathPoints = [];

  constructor(ctx: any) {
    this.ctx = ctx;
  }

  build(): void {
    this.getRandomDirection();
    this.getStartPoint();
    this.renderPathWithCurves();
    this.drawPath();
  }

  private getRandomDirection(): void {
    const directions = [
      PathDirection.top,
      PathDirection.left,
      PathDirection.right,
      PathDirection.bottom,
    ];

    this.direction = directions[this.getRandomDigit(directions.length)];
  }

  private getStartPoint(): void {
    const topCenterPath = { x: CANVAS_WIDTH / 2, y: 0 };
    const leftCenterPath = { x: 0, y: CANVAS_HEIGHT / 2 };
    const rightCenterPath = { x: CANVAS_WIDTH, y: CANVAS_HEIGHT / 2 };
    const bottomCenterPath = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT };

    const startPoints = {
      [PathDirection.top]: topCenterPath,
      [PathDirection.left]: leftCenterPath,
      [PathDirection.right]: rightCenterPath,
      [PathDirection.bottom]: bottomCenterPath,
    };

    this.startPoint = startPoints[this.direction];
  }

  private getCurvePoints(fromPosition: Position): Position[] {
    const curveDirection =
      this.direction === "top" || this.direction === "bottom"
        ? ["left", "right"]
        : ["top", "bottom"];
    const selectedDirectionIndex = this.getRandomDigit(1);
    const selectedDirection = curveDirection[selectedDirectionIndex];

    console.log({ selectedDirection });

    const getNextPointForCurve = (
      fromPosition: Position,
      direction: string
    ): Position => {
      switch (direction) {
        case "top":
          return {
            x: fromPosition.x,
            y: fromPosition.y - this.step,
          };
        case "left":
          return {
            x: fromPosition.x - this.step,
            y: fromPosition.y,
          };
        case "right":
          return {
            x: fromPosition.x + this.step,
            y: fromPosition.y,
          };
        case "bottom":
          return {
            x: fromPosition.x,
            y: fromPosition.y + this.step,
          };
      }
    };

    return this.getBlankArray(3).reduce(
      (accPoints, index) => {
        const direction = (() => {
          if (index === 0) {
            return selectedDirection;
          }

          if (index === 1) {
            if (selectedDirection === "top" || selectedDirection === "bottom") {
              return ["left", "right"][this.getRandomDigit(1)];
            } else {
              return ["top", "bottom"][this.getRandomDigit(1)];
            }
          }

          if (index === 2) {
            if (selectedDirectionIndex === 0) {
              if (
                selectedDirection === "top" ||
                selectedDirection === "bottom"
              ) {
                return "right";
              } else {
                return "bottom";
              }
            } else {
              if (
                selectedDirection === "top" ||
                selectedDirection === "bottom"
              ) {
                return "left";
              } else {
                return "top";
              }
            }
          }
        })();
        return [
          ...accPoints,
          getNextPointForCurve(accPoints[index], direction),
        ];
      },
      [fromPosition]
    );
  }

  private renderPathWithCurves(): void {
    // Есть начальная точка
    // Нужно получить точку до первого колена - это spaceBetweenCurves
    // Далее рисуем колено
    // Далее рисуем прямую до следующей кривой
    // И так по кругу

    const getNextPoint = (fromPosition: Position): Position => {
      switch (this.direction) {
        case "top":
          return {
            x: fromPosition.x,
            y: fromPosition.y + this.spaceBetweenCurves,
          };
        case "right":
          return {
            x: fromPosition.x - this.spaceBetweenCurves,
            y: fromPosition.y,
          };
        case "bottom":
          return {
            x: fromPosition.x,
            y: fromPosition.y - this.spaceBetweenCurves,
          };
        case "left":
          return {
            x: fromPosition.x + this.spaceBetweenCurves,
            y: fromPosition.y,
          };
      }
    };

    const curvesCount = this.getRandomDigit(this.countCurvesLimit - 1) + 2;
    const pathPointsList = [
      this.startPoint,
      ...this.getBlankArray(curvesCount * 2),
    ];

    console.log({ pathPointsList });

    const path = pathPointsList.reduce(
      (pathPoints, _, currentPointIndex) => {
        console.log({ length: pathPoints.length });
        if (currentPointIndex % 2 === 0) {
          console.log("четное", pathPoints);
          return [...pathPoints, getNextPoint(pathPoints[currentPointIndex])];
        }

        if (currentPointIndex % 2 !== 0) {
          console.log("не четное", { pathPoints, currentPointIndex });
          return [
            ...pathPoints,
            ...this.getCurvePoints(pathPoints[currentPointIndex]),
          ];
        }

        console.log("не должно сюда попасть");
      },
      [this.startPoint]
    );

    console.log(path);

    this.path = [...path, this.endPoint];
  }

  private drawPath(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.path.map((path) => {
      this.ctx.lineTo(path.x, path.y);
    });

    this.ctx.stroke();
  }

  getRandomDigit(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getBlankArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
