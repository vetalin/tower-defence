import { Position } from "../game/interface";
import {
  PathDirection,
  PathPointDirectoins,
  PathPoints,
} from "../path/interface";
import {
  AbstractEnemyUnit,
  GetDiffTime,
  LoopOutput,
  TargetPoint,
} from "./interface";

export class Enemy extends AbstractEnemyUnit {
  speed: number;
  pathDirections: PathPointDirectoins;
  path: PathPoints;
  damageValue: number;
  isAttackAvailable: boolean;
  healValue: number;
  isHealingAvailable: boolean;
  targetOfHealing: string;
  health: number;
  armor: number;
  position: Position;

  constructor(
    speed: number,
    path: PathPoints,
    pathDirections: PathPointDirectoins
  ) {
    super();
    this.speed = speed;
    this.path = path;
    this.pathDirections = pathDirections;
  }

  startLoop(draw: (positionUnit: Position) => void): LoopOutput {
    let loopRunnig = true;
    const startTime = Date.now();
    let diffTime: number;
    const loop = () => {
      window.requestAnimationFrame(() => {
        const iterationTime = Date.now();
        diffTime = (iterationTime - startTime) / 1000;
        this.move(diffTime);
        draw(this.position);
        if (loopRunnig) {
          loop();
        }
      });
    };

    loop();

    return {
      getDiffTime: () => diffTime,
      stopLoop: () => {
        loopRunnig = false;
      },
    };
  }

  move(time: number): void {
    const { point: targetPoint, direction } = this.getTargetPoint(
      this.path,
      this.position
    );
    this.moveToPointSmoothly(targetPoint, direction, time);
  }

  getTargetDirection(targetPointIndex: number): PathDirection {
    return this.pathDirections[targetPointIndex];
  }

  getTargetPoint(path: PathPoints, position: Position): TargetPoint {
    // todo: отрефачить
    const pathWithDirections = path.map((point, index) => {
      return {
        point,
        direction: this.pathDirections[index],
      };
    });

    const nextPoint = pathWithDirections.reduce(
      (prevPoint, { point, direction }, index) => {
        if (index === 0) {
          return { point, direction };
        }

        if (
          direction === "toLeft" &&
          prevPoint.point.x >= Math.round(position.x) &&
          Math.round(position.x) <= Math.round(point.x)
        ) {
          return {
            point: {
              x: Math.round(point.x),
              y: Math.round(point.y),
            },
            direction,
          };
        }

        if (
          direction === "toRight" &&
          prevPoint.point.x <= Math.round(position.x) &&
          Math.round(position.x) >= Math.round(point.x)
        ) {
          return {
            point: {
              x: Math.round(point.x),
              y: Math.round(point.y),
            },
            direction,
          };
        }

        if (
          direction === "toTop" &&
          prevPoint.point.y >= Math.round(position.y) &&
          Math.round(position.y) <= Math.round(point.y)
        ) {
          return {
            point: {
              x: Math.round(point.x),
              y: Math.round(point.y),
            },
            direction,
          };
        }

        if (
          direction === "toBottom" &&
          prevPoint.point.y <= Math.round(position.y) &&
          Math.round(position.y) >= Math.round(point.y)
        ) {
          return {
            point: {
              x: Math.round(point.x),
              y: Math.round(point.y),
            },
            direction,
          };
        }
      },
      null
    );

    if (nextPoint === null) {
      throw new Error("Target point is undefined");
    }

    return nextPoint;
  }

  moveToPointSmoothly(
    targetPoint: Position,
    targetDirection: PathDirection,
    time: number
  ): void {
    const pointIncrementMultiplier = ["toLeft", "toTop"].includes(
      targetDirection
    )
      ? -1
      : 1;

    if (
      pointIncrementMultiplier === 1 &&
      this.position.x >= targetPoint.x &&
      this.position.y >= targetPoint.y
    ) {
      return;
    }

    if (
      pointIncrementMultiplier === -1 &&
      this.position.x <= targetPoint.x &&
      this.position.y <= targetPoint.y
    ) {
      return;
    }

    const axis = this.position.x !== targetPoint.x ? "x" : "y";

    this.position[axis] += time * this.speed * pointIncrementMultiplier;
  }

  attack(): void {
    throw new Error("Method not implemented.");
  }
  healing(): void {
    throw new Error("Method not implemented.");
  }
  dying(): void {
    throw new Error("Method not implemented.");
  }

  spawn(): void {
    if (this.path.length === 0) {
      throw new Error("Path is not defined");
    }

    this.position = {
      ...this.path[0],
    };
  }
}
