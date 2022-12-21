import { Unit, UnitActions, UnitState } from "../common/interface";
import { Position, Size, Color } from "../game/interface";

export interface Castle extends Unit {
  state: CastleState;
  actions: CastleActions;
}

export interface CastleState extends UnitState {
  position: Position;
  size: Size;
}

export interface CastleActions extends UnitActions {
  getDamage: (value: number) => void;
  getHealth: (value: number) => void;
  drawCastle: (ctx: any) => void;
}

export interface Health {
  countOfHealth: number;
  countOfArmor: number;
}
