import { getCastle } from "../castle/getCastle";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const";

const drawGame = (ctx: any): void => {
  const castle = getCastle();

  castle.actions.drawCastle(ctx);

  ctx.strokeStyle = "green";
  ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 800 x 600

  ctx.beginPath();
  ctx.lineWidth = "10";
  ctx.strokeStyle = "brown";
  ctx.moveTo(0, 0);
  ctx.lineTo(50, 0);
  ctx.lineTo(50, 300);
  ctx.lineTo(400, 300);
  ctx.stroke();
};

export const startGame = () => {
  const canvas = document.getElementById("canvas");

  if (canvas === null) {
    throw new Error("Canvas не существует");
  }

  canvas.setAttribute("width", `${CANVAS_WIDTH}px`);
  canvas.setAttribute("height", `${CANVAS_HEIGHT}px`);

  const ctx = (canvas as any).getContext("2d");

  drawGame(ctx);
};
