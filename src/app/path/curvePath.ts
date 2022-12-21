import { getBlankArray, getRandomDigit } from "../helper/help";
import { PathDirection, PathPoint, PathPoints } from "./interface";

export class CurvePath {
  mainDirection: PathDirection;
  step: number;

  constructor(direction: PathDirection, step: number) {
    this.mainDirection = direction;
    this.step = step;
  }

  getCurvePoints(fromPosition: PathPoint): PathPoints {
    const curveDirection: PathDirection[] =
      this.mainDirection === "toTop" || this.mainDirection === "toBottom"
        ? ["toLeft", "toRight"]
        : ["toTop", "toBottom"];
    const selectedDirectionIndex = getRandomDigit(1);
    const selectedDirection = curveDirection[selectedDirectionIndex];

    return getBlankArray(3).reduce((accPoints, index) => {
      const direction = this.getDirectionForCurve(selectedDirection, index);

      const fromCurveNextPosition =
        index > 0 ? accPoints[index - 1] : fromPosition;
      return [
        ...accPoints,
        this.getNextPointForCurve(fromCurveNextPosition, direction),
      ];
    }, []);
  }

  getNextPointForCurve(
    fromPosition: PathPoint,
    directionForCurve: string
  ): PathPoint {
    switch (directionForCurve) {
      case "toTop":
        return {
          ...fromPosition,
          x: fromPosition.x,
          y: fromPosition.y - this.step,
        };
      case "toLeft":
        return {
          ...fromPosition,
          x: fromPosition.x - this.step,
          y: fromPosition.y,
        };
      case "toRight":
        return {
          ...fromPosition,
          x: fromPosition.x + this.step,
          y: fromPosition.y,
        };
      case "toBottom":
        return {
          ...fromPosition,
          x: fromPosition.x,
          y: fromPosition.y + this.step,
        };
    }
  }

  getDirectionForCurve(
    selectedCurveDirection: PathDirection,
    curvePointIndex: number
  ): PathDirection {
    if (curvePointIndex === 0) {
      return selectedCurveDirection;
    }

    if (curvePointIndex === 1) {
      return this.mainDirection;
    }

    if (curvePointIndex === 2) {
      if (selectedCurveDirection === "toLeft") {
        return "toRight";
      }
      if (selectedCurveDirection === "toRight") {
        return "toLeft";
      }
      if (selectedCurveDirection === "toTop") {
        return "toBottom";
      }
      if (selectedCurveDirection === "toBottom") {
        return "toTop";
      }
    }
  }
}
