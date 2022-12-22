import { getCastle } from "../castle/getCastle";
import { Enemy } from "../enemy/Enemy";
import { wait } from "../helper/help";
import { PathBuilder } from "../path/PathBuilder";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const";

const drawGame = (ctx: any): void => {
  const castle = getCastle();

  castle.actions.drawCastle(ctx);

  ctx.strokeStyle = "green";
  ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 800 x 600
};

export const startGame = async () => {
  const canvas = document.getElementById("canvas");

  if (canvas === null) {
    throw new Error("Canvas не существует");
  }

  canvas.setAttribute("width", `${CANVAS_WIDTH}px`);
  canvas.setAttribute("height", `${CANVAS_HEIGHT}px`);

  const ctx = (canvas as any).getContext("2d");

  drawGame(ctx);

  const path = new PathBuilder(ctx);
  path.build();

  const enemy = new Enemy(10, path.path);
  enemy.spawn();
  enemy.drawUnit(ctx);

  const { stopLoop } = enemy.startLoop();
  await wait(1000);
  stopLoop();
};
