import React, { Component } from "react";
import * as Context from "../context";
import { IStage, IBox } from "../types";
import Box from './Box';
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


class Boxes extends Component<IProps, IState> {
  render() {
    const { context } = this.props;
    return (
      <g className="flow__boxes">
        {context.state.boxes.map((v: IBox, i: number) => {

          return (
            <Box key={i} context={context} item={Object.assign(v, {index: i})}></Box>
          );
        })}
      </g>
    );
  }
}

export default (props: any) => (
  <Context.Consumer>
    {context => <Boxes context={context} {...props} />}
  </Context.Consumer>
);
