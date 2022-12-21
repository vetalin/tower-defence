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
    const speed = 10;
    const pathBuilder = new PathBuilder(null);
    pathBuilder.getRandomDirection();
    pathBuilder.getStartPoint();
    pathBuilder.renderAllPointForPath();
    const { path } = pathBuilder;
    let enemy = new Enemy(speed, path);
    enemy.spawn();
    enemy.move();
    expect(enemy.position).toBe(path[path.length - 1]);
  });

  it("Enemy must move on the path", async () => {
    const speed = 10;
    const pathBuilder = new PathBuilder(null);
    pathBuilder.direction = "toTop";
    pathBuilder.getStartPoint();
    pathBuilder.renderAllPointForPath();
    const { path } = pathBuilder;
    let enemy = new Enemy(speed, path);
    enemy.spawn();
    enemy.move();
    await wait(1 * 1000);
    expect(enemy.position.x).toBe(path[0].x);
    expect(enemy.position.y).toBe(path[0].y - speed);
  });
  it("Enemy unit is appear", () => {});
  it("Enemy unit have healthpoints", () => {});
  it("Enemy unit have armor", () => {});
  it("Enemy unit have level", () => {});
  it("Enemy unit may attack", () => {});
});
