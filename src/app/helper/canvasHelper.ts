import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../game/const";

export const createNewLayer = (zIndex = 0): CanvasRenderingContext2D => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;

  if (canvas === null) {
    throw new Error("Canvas не существует");
  }

  canvas.style.position = "absolute";
  canvas.style.top = "20px";
  canvas.style.left = "20px";
  canvas.style.zIndex = zIndex.toString();

  canvas.setAttribute("width", `${CANVAS_WIDTH}px`);
  canvas.setAttribute("height", `${CANVAS_HEIGHT}px`);

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  return ctx;
};

export const clearLayer = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
