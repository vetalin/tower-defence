import { Position } from "../game/interface";
import { PathPoints } from "../path/interface";
import { AbstractEnemyUnit } from "./interface";

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

  constructor(speed: number, path: PathPoints) {
    super();
    this.speed = speed;
    this.path = path;
  }

  move(): void {
    const interval = 0.1;
    const startTimeMove = Date.now();
    setInterval(() => {
      // Засемаем дату старта в таймстемпе
      // После каждого интервала считаем сколько времени прошло diff
      // Мы должны получить точку из набора, в зависимости от времени, которое прошло diff
      // Надо получить расстояние, которое прошел объект
      // diff * speed = distance
      // создаем массив точек, содержащих их дистанцию от начала
      // Получив точку - мы меняем position до следующей точки
      // Мы берем разницу координат и делим на скорость
      // Каждую итерацию мы добавляем к position разницу координат деленную на скорость
      const startTimeItteration = Date.now();
      const diffTimes = (startTimeItteration - startTimeMove) * 1000; // in seconds
      const distance = diffTimes * this.speed;
      const pointsWithDistance = this.path.reduce(
        (accPoints, currentPoint, currentPointIndex) => {
          if (currentPointIndex === 0) {
            return [{ ...currentPoint, distance: 0 }];
          }

          return [
            ...accPoints,
            {
              ...currentPoint,
              // distance: currentPoint + this.speed,
            },
          ];
        },
        []
      );
      const currentPointIndex = this.path.map((pathPoint) => {
        this.position = pathPoint;
      });
    }, interval * 1000);
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
}
