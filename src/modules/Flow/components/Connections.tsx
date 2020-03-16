import React, { Component } from "react";
import Wire from "./Wire";
import * as Context from "../context";
import { IStage, IBox } from "../types";
import * as R from "ramda";

interface IProps {
  context: {
    state: {
      stage: IStage;
      boxes: IBox[];
    };
    actions: any;
  };
}

interface IState {}

class Connections extends Component<IProps, IState> {
  render() {
    const { context } = this.props;
    const items = R.pipe(
      R.filter<IBox, "array">((v: IBox) => !!v.connect && !!v.connect.length),
      R.addIndex<any, any>(R.map)((v: IBox, i: number): IBox[] => {
        return R.addIndex<any, any>(R.map)((c: IBox, k: number) => {
          return (
            <Wire
              key={i + "-" + k}
              from={{ x: v.x + (v.width || 0), y: v.y + ((v.height || 0) /2) }}
              to={{ x: c.x, y: c.y + ((c.height || 0) /2) }}
            ></Wire>
          );
        })(v.connect);
      })
    )(context.state.boxes);

    return <g className="flow__connections">{items}</g>;
  }
}

export default (props: any) => (
  <Context.Consumer>
    {context => <Connections context={context} {...props} />}
  </Context.Consumer>
);
