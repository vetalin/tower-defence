import { CurvePath } from "./CurvePath";
import { PathBuilder } from "./PathBuilder";

describe("Starting of path", () => {
  it("Check that choosing one side of path", () => {
    const path = new PathBuilder(null);
    path.direction = "toTop";
    path.getStartPoint();
    expect(path.startPoint.x).toBe(400);
    expect(path.startPoint.y).toBe(800);
  });

  it("Path must be end in castle", () => {
    const path = new PathBuilder(null);
    path.direction = "toTop";
    path.getStartPoint();
    path.renderAllPointForPath();
    expect(path.endPoint.x).toBe(400);
    expect(path.endPoint.y).toBe(400);
  });

  it("Path not include not 90 deg angles", () => {
    const path = new PathBuilder(null);
    path.direction = "toTop";
    path.getStartPoint();
    path.renderAllPointForPath();
    const allPoints = path.path;
    // Из стартовой точки линия строго идет вверх
    expect(allPoints[0].x).toBe(allPoints[1].x);
    expect(allPoints[0].y).not.toBe(allPoints[1].y);
    // Линия уходит в колено
    expect(allPoints[1].x).not.toBe(allPoints[2].x);
    expect(allPoints[1].y).toBe(allPoints[2].y);
    // Колено снова идет вверх
    expect(allPoints[2].x).toBe(allPoints[3].x);
    expect(allPoints[2].y).not.toBe(allPoints[3].y);
    // Колено заканчивается и возвращается к исходной линии
    expect(allPoints[3].x).not.toBe(allPoints[4].x);
    expect(allPoints[3].y).toBe(allPoints[4].y);
  });

  it("Path includes pathPointDirections list, directions have same lenght from path", () => {
    const path = new PathBuilder(null);
    path.direction = "toTop";
    path.getStartPoint();
    path.renderAllPointForPath();

    expect(path.pathDirections.length).toBe(path.path.length);
  });

  it("Path includes pathPointDirections list, directions have thruthy direction from point", () => {
    const path = new PathBuilder(null);
    path.direction = "toTop";
    path.getStartPoint();
    const getPoint = (x, y) => ({ x, y });
    path.path = [
      getPoint(400, 800),
      getPoint(400, 700),
      getPoint(300, 700),
      getPoint(300, 600),
      getPoint(400, 600),
    ];

    path.pathDirections = path.getPathDirectionsFromPath(path.path);

    expect(path.pathDirections[0]).toBe("toTop");
    expect(path.pathDirections[1]).toBe("toTop");
    expect(path.pathDirections[2]).toBe("toLeft");
    expect(path.pathDirections[3]).toBe("toTop");
    expect(path.pathDirections[4]).toBe("toRight");
  });
});

describe("Curve", () => {
  let path: PathBuilder;
  let curvePath: CurvePath;
  beforeEach(() => {
    path = new PathBuilder(null);
    path.getRandomDirection();
    path.getStartPoint();
    curvePath = new CurvePath(path.direction, path.step);
  });

  it("Curve have start position", () => {
    path.direction = "toTop";
    path.getStartPoint();
    expect(path.startPoint).not.toBeUndefined();
  });

  it("Curve have 3 points", () => {
    path.direction = "toTop";
    curvePath["mainDirection"] = "toTop";
    path.getStartPoint();
    const curvePoints = curvePath.getCurvePoints(path.startPoint);
    expect(curvePoints.length).toBe(3);
  });

  it("function getDirectionForCurve return pravilno direction from index (curve piece)", () => {
    path.direction = "toTop";
    curvePath["mainDirection"] = "toTop";
    path.getStartPoint();
    expect(curvePath["getDirectionForCurve"]("toLeft", 0)).toBe("toLeft");
    expect(curvePath["getDirectionForCurve"]("toLeft", 1)).toBe("toTop");
    expect(curvePath["getDirectionForCurve"]("toLeft", 2)).toBe("toRight");
  });

  it("getNextPointForCurve return right value direction from", () => {
    path.direction = "toTop";
    curvePath["mainDiretction"] = "toTop";
    path.getStartPoint();

    const startPoint = { x: 400, y: 200 };

    const curveToLeft = curvePath["getNextPointForCurve"](startPoint, "toLeft");
    expect(curveToLeft.x).toBe(startPoint.x - path.step);
    expect(curveToLeft.y).toBe(startPoint.y);
    const curveToRight = curvePath["getNextPointForCurve"](
      startPoint,
      "toRight"
    );
    expect(curveToRight.x).toBe(startPoint.x + path.step);
    expect(curveToRight.y).toBe(startPoint.y);
    const curveToTop = curvePath["getNextPointForCurve"](startPoint, "toTop");
    expect(curveToTop.x).toBe(startPoint.x);
    expect(curveToTop.y).toBe(startPoint.y - path.step);
    const curveToBottom = curvePath["getNextPointForCurve"](
      startPoint,
      "toBottom"
    );
    expect(curveToBottom.x).toBe(startPoint.x);
    expect(curveToBottom.y).toBe(startPoint.y + path.step);
  });

  it("Curve first point has different axis of main direction", () => {
    const point = { x: 400, y: 800 };

    path.direction = "toTop";
    curvePath["mainDirection"] = "toTop";
    const curvePointsToTop = curvePath.getCurvePoints(point);
    expect(curvePointsToTop[0].x).not.toBe(400);
    path.direction = "toLeft";
    curvePath["mainDirection"] = "toLeft";
    const curvePointsToLeft = curvePath.getCurvePoints(point);
    expect(curvePointsToLeft[0].y).not.toBe(800);
  });

  it("Curve second point has same axis of main direction", () => {
    const point = { x: 400, y: 800 };

    path.direction = "toTop";
    curvePath["mainDirection"] = "toTop";
    const curvePointsToTop = curvePath.getCurvePoints(point);
    expect(curvePointsToTop[1].y).toBeLessThan(800);
    // ---
    path.direction = "toLeft";
    curvePath["mainDirection"] = "toLeft";
    const curvePointsToLeft = curvePath.getCurvePoints(point);
    expect(curvePointsToLeft[1].x).toBeLessThan(400);
  });

  it("Curve last point has different direction of first point direction", () => {
    const point = { x: 400, y: 800 };

    path.direction = "toTop";
    curvePath["mainDirection"] = "toTop";
    const curvePointsToTop = curvePath.getCurvePoints(point);
    expect(curvePointsToTop[2].y).toBeLessThan(800);
    expect(curvePointsToTop[2].x).toBe(400);

    path.direction = "toLeft";
    curvePath["mainDirection"] = "toLeft";
    const curvePointsToLeft = curvePath.getCurvePoints(point);
    expect(curvePointsToLeft[2].x).toBeLessThan(400);
    expect(curvePointsToLeft[2].y).toBe(800);
  });
});
