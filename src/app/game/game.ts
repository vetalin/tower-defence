import { getCastle } from "../castle/getCastle";
import { Enemy } from "../enemy/Enemy";
import { EnemyDrawer } from "../enemy/EnemyDrawer";
import { createNewLayer } from "../helper/canvasHelper";
import { wait } from "../helper/help";
import { PathBuilder } from "../path/PathBuilder";
import { PathDrawer } from "../path/PathDrawer";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const";

const drawGame = (ctx: any): void => {
  const castle = getCastle();

  castle.actions.drawCastle(ctx);

  ctx.strokeStyle = "green";
  ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 800 x 600
};

export const startGame = async () => {
  const ctx = createNewLayer();

  const path = new PathBuilder();
  path.build();
  const pathDrawer = new PathDrawer(ctx, path.path);
  const enemy = new Enemy(10, path.path, path.pathDirections);
  enemy.spawn();
  const enemyDrawer = new EnemyDrawer();

  drawGame(ctx);
  pathDrawer.draw();

  const { stopLoop } = enemy.startLoop(enemyDrawer.drawUnit.bind(enemyDrawer));

  // .bind, .call, .apply
  // await wait(1000);
  // stopLoop();
};
