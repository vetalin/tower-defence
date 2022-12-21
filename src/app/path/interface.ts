import { Position } from "../game/interface";

export type PathDirection = "toTop" | "toLeft" | "toRight" | "toBottom";

export type PathPoint = Position & {
  direction: PathDirection;
};

export type PathPoints = PathPoint[];
