import { Position } from "../game/interface";

export type PathDirection = "toTop" | "toLeft" | "toRight" | "toBottom";

export type PathPointDirectoins = PathDirection[];
export type PathPoint = Position;
export type PathPoints = PathPoint[];
