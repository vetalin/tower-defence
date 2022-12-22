import { Unit, UnitActions, UnitState } from "../common/interface";
import { Position } from "../game/interface";
import { PathPoints } from "../path/interface";

export enum EnemyClasses {
  Warrior = "Warrior",
  Archer = "Archer",
  Mage = "Mage",
  Rogue = "Rogue",
}

export interface EnemyUnit extends Unit {
  state: EnemyState;
  actions: EnemyActions;
}

export interface EnemyState extends UnitState {
  armor: number;
  attackValue: number;
  level: number;
  typeOfClass: EnemyClasses;
}

export interface EnemyActions extends UnitActions {
  move(): void;
  attack(): void;
  healing(): void;
  dying(): void;
}

export interface LoopOutput {
  getDiffTime: GetDiffTime;
  stopLoop: () => void;
}

export type GetDiffTime = () => number;

export abstract class AbstractEnemyUnit {
  state: EnemyState;
  actions: EnemyActions;

  abstract speed: number;
  abstract position: Position;
  abstract path: PathPoints;
  abstract damageValue: number;
  abstract isAttackAvailable: boolean;
  abstract healValue: number;
  abstract isHealingAvailable: boolean;
  abstract targetOfHealing: string;
  abstract health: number;
  abstract armor: number;

  abstract move(time: number): void;

  abstract startLoop(): LoopOutput;

  abstract attack(): void;

  abstract healing(): void;

  abstract dying(): void;

  abstract spawn(): void;
}
