import React, { Component } from "react";
import { IPoint } from "../types";

export interface IProps {
  from: IPoint;
  to: IPoint;
  style?: string;
}

export interface IState {}

class Wire extends Component<IProps, IState> {
  state = {};

  getPoints = (from = { x: 0, y: 0 }, to = { x: 0, y: 0 }): IPoint[] => {
    const c1x = from.x + (to.x - from.x) / 2;
    const c1y = from.y;
    const c2x = c1x;
    const c2y = to.y;
    return [
      { x: from.x, y: from.y },
      { x: c1x, y: c1y },
      { x: c2x, y: c2y },
      { x: to.x, y: to.y }
    ];
  };

  getPointsToPath = (list: IPoint[]): string => {
    return list.reduce((a, b, i) => {
      const type = i === 0 ? "C" : "";
      return a + `${b.x} ${b.y} ${type}`;
    }, "M");
  };

  render() {
    const { from, to } = this.props;
    const list = this.getPoints(from, to);
    const line = this.getPointsToPath(list);

    const style = this.props.style || '';
    return <path className={`wire ${style}`} d={line}></path>;
  }
}

export default Wire;
