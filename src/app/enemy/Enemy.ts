import { Position } from "../game/interface";
import { PathPoints } from "../path/interface";
import { AbstractEnemyUnit, GetDiffTime, LoopOutput } from "./interface";

export class Enemy extends AbstractEnemyUnit {
  speed: number;
  path: PathPoints;
  damageValue: number;
  isAttackAvailable: boolean;
  healValue: number;
  isHealingAvailable: boolean;
  targetOfHealing: string;
  health: number;
  armor: number;
  position: Position;
  image =
    "https://w7.pngwing.com/pngs/964/244/png-transparent-pac-man-computer-icons-enemy-ghost-icon-angle-white-text-thumbnail.png";
  ctx: any;

  constructor(speed: number, path: PathPoints, ctx: any = null) {
    super();
    this.speed = speed;
    this.path = path;
    this.ctx = ctx;
  }

  startLoop(): LoopOutput {
    let loopRunnig = true;
    const startTime = Date.now();
    let iterationTime: number;
    const loop = () => {
      window.requestAnimationFrame(() => {
        iterationTime = Date.now();
        this.move((iterationTime - startTime) / 1000);
        if (loopRunnig) {
          loop();
        }
      });
    };

    loop();

    return {
      getDiffTime: () => {
        return (iterationTime - startTime) / 1000;
      },
      stopLoop: () => {
        loopRunnig = false;
      },
    };
  }

  move(time: number): void {
    // Надо найти точку, в которую целимся (если находится на второй точке - должен возвращать третью)
    const targetPoint = this.getTargetPoint(this.path, this.position); // {x, y}
    //console.log({ targetPoint, position: this.position, time });
    // Надо плавно перемещаться к этой точке
    this.moveToPointSmoothly(targetPoint, time);

    this.drawUnit();
  }

  getTargetPoint(path: PathPoints, position: Position): Position {
    const nextPoint = path.map((currentPoint, index) => {
      console.log({
        currentPoint,
        x: Math.round(position.x),
        y: Math.round(position.y),
      });
      if (
        Math.round(currentPoint.x) === Math.round(position.x) &&
        Math.round(currentPoint.y) === Math.round(position.y)
      ) {
        return path[index + 1];
      }
    });

    const foundPoint = nextPoint.find((point) => {
      return point !== undefined;
    });

    if (foundPoint === undefined) {
      throw new Error("Target point is undefined");
    }

    return foundPoint;
  }

  moveToPointSmoothly(targetPoint: Position, time: number): void {
    if (this.position.x >= targetPoint.x && this.position.y >= targetPoint.y) {
      return;
    }
    const axis = this.position.x !== targetPoint.x ? "x" : "y";
    this.position[axis] = time * this.speed;
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

    this.position = this.path[0];
  }

  drawUnit(): void {
    const image = document.createElement("img");
    image.width = 20;
    image.height = 20;
    image.src = this.image;

    image.onload = () => {
      this.ctx.drawImage(image, this.position.x, this.position.y, 20, 20);
    };
  }
}
