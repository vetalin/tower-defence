import { Position, Size, Color } from "../game/interface";

export interface Castle {
  state: CastleState;
  actions: CastleActions;
}

export interface CastleState {
  position: Position;
  size: Size;
  health: number;
  image: HTMLImageElement;
}

export interface CastleActions {
  getDamage: (value: number) => void;
  getHealth: (value: number) => void;
  drawCastle: (ctx: any) => void;
}

export interface Health {
  countOfHealth: number;
  countOfArmor: number;
}
