import React, { Component } from "react";
import { IBox } from "../types";
export interface IProps {
  item: IBox;
}

export interface IState {}

class Slot extends Component<IProps, IState> {
  state = {};
  render() {
    const x = 0;
    const y = (this.props.item.height || 0) / 2;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle className="slot" r="8" data-id={this.props.item.id}></circle>
      </g>
    );
  }
}

export default Slot;
