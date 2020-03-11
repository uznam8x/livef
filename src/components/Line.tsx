import React from "react";
import { IBoxConnect } from "../store/interfaces/box";
import { RootState } from "../store";
import { connect } from "react-redux";
import * as Boxes from "../store/modules/boxes";
import * as Rect from "../libs/rectangle";
import * as Bezier from "../libs/bezier";
const getEntries = (item: Boxes.IState): IBoxConnect[] => {
  return Object.entries(item?.indexed).map(v => v[1]);
};

const Line = (props: RootState) => {
  const entries = getEntries(props.boxes);
  const items = entries.filter(
    (v: any, i: number) => v.connect && v.connect.length
  );
  const lines = items.reduce((a: any, b: any, i: number) => {
    const c = b.connect.map((v: any, k: number) => {
      const t: IBoxConnect = props.boxes.indexed[v.id];

      const fb: Rect.Rectangle = Rect.getBounding(b);
      const tb: Rect.Rectangle = Rect.getBounding(t);

      const res: string = Bezier.getPointsToPath(
        { x: fb.x + fb.width, y: fb.y + fb.height / 2 },
        { x: tb.x, y: tb.y + tb.height / 2 }
      );
      return <path key={`${i}-${k}`} className="line" d={res}></path>;
    });
    return a.concat(c);
  }, []);
  return <g>{lines}</g>;
};

export default connect((state: RootState) => {
  return Object.assign({}, state, { boxes: state.boxes });
  })(Line);
