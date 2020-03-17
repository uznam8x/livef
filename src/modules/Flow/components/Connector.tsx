import React, { Component } from "react";
import * as Context from "../context";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { IBox, IStage } from "../types";
export interface IProps {
  context: {
    state: {
      stage: IStage;
      boxes: IBox[];
    };
    actions: any;
  };
  item: IBox;
}

export interface IState {}

class Connector extends Component<IProps, IState> {
  state = {};

  getPoint = () => {
    return {
      x: this.props.item.width || 0,
      y: (this.props.item.height || 0) / 2
    };
  };

  move = (e: any, data: DraggableData) => {
    const event = e as UIEvent;
    event.stopImmediatePropagation();
    const { context, item } = this.props;
    const { x, y } = this.getPoint();
    const from = {
      x: x + this.props.item.x,
      y: y + this.props.item.y
    };
    const to = {
      x: e.x - context.state.stage.x,
      y: e.y - context.state.stage.y
    };
    context.actions.wire(from, to);
  };

  start = () => {
    document.getElementsByTagName("body")[0].classList.add("flow--connecting");
  }

  stop = (e: any, data: DraggableData) => {
    document.getElementsByTagName("body")[0].classList.remove("flow--connecting");
    const { context } = this.props;
    context.actions.wire({ x: 0, y: 0 }, { x: 0, y: 0 });
    
    const id = e.target.getAttribute("data-id");
    if(id) {
        context.actions.connect(this.props.item, id);
    }
  };

  render() {
    const { x, y } = this.getPoint();
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle className="connector" r="8"></circle>
        <Draggable
        onStart={this.start}
          onDrag={this.move}
          position={{ x: 0, y: 0 }}
          onStop={this.stop}
        >
          <circle className="connector connector--handle" r="8"></circle>
        </Draggable>
      </g>
    );
  }
}

export default (props: any) => (
  <Context.Consumer>
    {context => <Connector context={context} {...props} />}
  </Context.Consumer>
);
