export interface BezierPoint {
  x: number,
  y: number,
}
export function getPoints(from = { x: 0, y: 0 }, to = { x: 0, y: 0 }): Array<BezierPoint> {
   const c1x = from.x + ((to.x - from.x) / 2);
   const c1y = from.y
   const c2x = c1x;
   const c2y = to.y
  return [{x:from.x, y:from.y}, {x:c1x, y:c1y}, {x: c2x, y: c2y}, {x:to.x, y:to.y}];
}

export function getPointsToPath(from = { x: 0, y: 0 }, to = { x: 0, y: 0 }): string {
  const res:Array<BezierPoint> = getPoints(from, to) as Array<BezierPoint>;
  return res.reduce((a, b, i)=>{
    const type = i === 0 ? 'C' : ''
    return a + `${b.x} ${b.y} ${type}`;
  }, "M");
}