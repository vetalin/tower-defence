import { Position, Size } from "../game/interface";
import { clearLayer, createNewLayer } from "../helper/canvasHelper";

export class EnemyDrawer {
  imageSize: Size = {
    width: 20,
    height: 20,
  };
  image = "https://static.thenounproject.com/png/327246-200.png";
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = createNewLayer(1);
  }

  drawUnit(position: Position): void {
    clearLayer(this.ctx);

    const image = document.createElement("img");
    image.width = this.imageSize.width;
    image.height = this.imageSize.height;
    image.src = this.image;

    this.ctx.drawImage(
      image,
      position.x,
      position.y,
      this.imageSize.width,
      this.imageSize.height
    );
  }
}
