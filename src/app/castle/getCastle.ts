import { CASTLE_SIZE, CASTLE_HEALTH, CASTLE_POSITION } from "./const";
import { Castle, CastleActions, CastleState } from "./interface";

const getCastleImage = (): HTMLImageElement => {
  const image = new Image(CASTLE_SIZE.width, CASTLE_SIZE.height);
  image.src = require("../../assets/castle.png");

  return image;
};

const drawCastle = (state: CastleState, ctx: any): void => {
  state.image.onload = () => {
    ctx.drawImage(
      state.image,
      state.position.x,
      state.position.y,
      state.size.width,
      state.size.height
    );
  };
};

export const getCastle = (): Castle => {
  const state: CastleState = {
    position: CASTLE_POSITION,
    size: CASTLE_SIZE,
    health: CASTLE_HEALTH,
    image: getCastleImage(),
  };

  const actions: CastleActions = {
    getDamage(damageValue: number) {
      state.health = state.health - damageValue;
    },
    getHealth(healthValue: number) {
      state.health = state.health + healthValue;
    },
    drawCastle: (ctx: any) => {
      drawCastle(state, ctx);
    },
  };

  return {
    state,
    actions,
  };
};
