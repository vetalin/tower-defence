import { wait } from "../helper/help";
import { PathBuilder } from "../path/PathBuilder";
import { Enemy } from "./Enemy";

describe("Enemy unit is appear, have healthpoint, armor, level and may attack", () => {
  it("Enemy has a position", () => {
    const speed = 10;
    const path = new PathBuilder(null);
    path.getRandomDirection();
    path.getStartPoint();
    path.renderAllPointForPath();
    let enemy = new Enemy(speed, path.path);
    enemy.spawn();
    expect(enemy.position).toBe(path.path[0]);
  });

  it("Enemy must be appear on endPoint", () => {
    // const speed = 10;
    // const pathBuilder = new PathBuilder(null);
    // pathBuilder.getRandomDirection();
    // pathBuilder.getStartPoint();
    // pathBuilder.renderAllPointForPath();
    // const { path } = pathBuilder;
    // let enemy = new Enemy(speed, path);
    // enemy.spawn();
    // enemy.move();
    // expect(enemy.position).toBe(path[path.length - 1]);
  });
  it("Enemy unit is appear", () => {});
  it("Enemy unit have healthpoints", () => {});
  it("Enemy unit have armor", () => {});
  it("Enemy unit have level", () => {});
  it("Enemy unit may attack", () => {});
});

describe("Enemy can move", () => {
  it("Enemy has method, this method calls everytime and returns diffTime from first call", async () => {
    const speed = 10;
    const { path } = new PathBuilder(null);
    const enemy = new Enemy(speed, path);
    const { getDiffTime } = enemy.startLoop();
    await wait(1000);
    expect(getDiffTime()).toBeGreaterThan(0.98);
    expect(getDiffTime()).toBeLessThan(1.2);
  });

  it("Enemy have distance between every points", () => {
    const speed = 10;
    const { path: pathOfPathBuilder } = new PathBuilder(null);
    const enemy = new Enemy();
    const path = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 10,
        y: 0,
      },
    ];
    const distance = enemy.getPathWithDistance();
    expect(distance[0].distance).toBe(0);
    expect(distance[1].distance).toBe(10);
  });

  it("Enemy have direction between every points", () => {
    // const enemy = new Enemy();
    // const path = [
    //   {
    //     x: 0,
    //     y: 0
    //   },
    //   {
    //     x: 10,
    //     y: 0
    //   },
    //   {
    //     x: 10,
    //     y: 10
    //   }
    // ]
    // const directions = enemy.getPathWithDirection();
    // expect(directions[0].direction).toBe('toRight')
    // expect(directions[1].direction).toBe('toBottom')
    // expect(directions[2].direction).toBe(null)
  });

  it("Enemy know current point of path, from diffTime", () => {
    // const enemy = new Enemy();
    // const path = [
    //   {
    //     x: 0,
    //     y: 0
    //   },
    //   {
    //     x: 10,
    //     y: 0
    //   }
    // ]
    // const currentPoint = enemy.getCurrentPointFromTime(1000, path)
    // expect(currentPoint.x).toBe(10)
    // expect(currentPoint.y).toBe(0)
  });

  it("Enemy must move on the path", async () => {
    // const speed = 10;
    // const pathBuilder = new PathBuilder(null);
    // pathBuilder.direction = "toTop";
    // pathBuilder.getStartPoint();
    // pathBuilder.renderAllPointForPath();
    // const { path } = pathBuilder;
    // let enemy = new Enemy(speed, path);
    // enemy.spawn();
    // enemy.move();
    // await wait(1 * 1000);
    // expect(enemy.position.x).toBe(path[0].x);
    // expect(enemy.position.y).toBe(path[0].y - speed);
  });
});
