export interface Unit {
  state: UnitState;
  actions: UnitActions;
}

export interface UnitState {
  image: HTMLImageElement;
  healthPoints: number;
}

export interface UnitActions {
  [key: string]: (ctx: any) => void;
}
