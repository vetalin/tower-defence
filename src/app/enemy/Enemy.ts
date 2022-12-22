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

  constructor(speed: number, path: PathPoints) {
    super();
    this.speed = speed;
    this.path = path;
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
    // Засемаем дату старта в таймстемпе
    // После каждого интервала считаем сколько времени прошло diff
    // Мы должны получить точку из набора, в зависимости от времени, которое прошло diff
    // Надо получить расстояние, которое прошел объект
    // diff * speed = distance
    // создаем массив точек, содержащих их дистанцию от начала
    // Получив точку - мы меняем position до следующей точки
    // Мы берем разницу координат и делим на скорость
    // Каждую итерацию мы добавляем к position разницу координат деленную на скорость
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

  drawUnit(ctx: any): void {
    const image = document.createElement("img");
    image.width = 20;
    image.height = 20;
    image.src = this.image;

    image.onload = () => {
      ctx.drawImage(image, this.position.x, this.position.y, 20, 20);
    };
  }
}
