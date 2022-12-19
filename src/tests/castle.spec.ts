import {
  CASTLE_HEALTH,
  CASTLE_POSITION,
  CASTLE_SIZE,
} from "../app/castle/const";
import { getCastle } from "../app/castle/getCastle";
import { Castle } from "../app/castle/interface";

describe("Замок большой и стоит по центру поля", () => {
  let castle: Castle;
  beforeEach(() => {
    castle = getCastle();
  });

  it("Замок имеет размеры, как в константах", () => {
    expect(castle.state.size.width).toBe(CASTLE_SIZE.width);
    expect(castle.state.size.height).toBe(CASTLE_SIZE.height);
  });

  it("Замок стоит по центру поля", () => {
    const castle = getCastle();

    expect(castle.state.position.x).toBe(CASTLE_POSITION.x);
    expect(castle.state.position.y).toBe(CASTLE_POSITION.y);
  });
});

describe("У замка есть статы", () => {
  let castle: Castle;

  beforeEach(() => {
    castle = getCastle();
  });
  it("У замка есть здоровье", () => {
    expect(castle.state.health).toBe(CASTLE_HEALTH);
  });

  it("When castle get damage, healthpoint is decrease", () => {
    expect(castle.state.health).toBe(CASTLE_HEALTH);
    castle.actions.getDamage(10);
    expect(castle.state.health).toBe(CASTLE_HEALTH - 10);
  });

  it("When castle get health, healthpoint is increase", () => {
    castle.actions.getDamage(10);
    expect(castle.state.health).toBe(CASTLE_HEALTH - 10);
    castle.actions.getHealth(10);
    expect(castle.state.health).toBe(CASTLE_HEALTH);
  });
});
