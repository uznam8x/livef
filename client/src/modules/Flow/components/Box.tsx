import React, { Component, createRef } from "react";
import { IStage, IBox } from "../types";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import Connector from "./Connector";
import Slot from "./Slot";
interface IProps {
  context: {
    state: {
      stage: IStage;
      boxes: IBox[];
    };
    actions: any;
  };
  item: IBox;
}

interface IState {
  width: number;
  height: number;
  padding: {
    x: number;
    y: number;
  };
}

class Box extends Component<IProps, IState> {
  state = {
    width: 0,
    height: 0,
    padding: {
      x: 20,
      y: 14
    },
    ref: createRef<SVGGElement>()
  };

  interval: any = null;

  move = (e: DraggableEvent, data: DraggableData) => {
    const { context, item } = this.props;
    item.x = data.x;
    item.y = data.y;
    context.actions.update(context.state.boxes, item.index, item);
  };

  stop = (e: DraggableEvent, data: DraggableData) => {};

  redraw = () => {
    const content = this.state.ref?.current?.querySelector(
      ".flow__boxes__item__content"
    );
    const rect: DOMRect | undefined = content?.getBoundingClientRect();
    const width = (rect?.width || 0) + this.state.padding.x * 2;
    const height = (rect?.height || 0) + this.state.padding.y * 2;

    if (!(width === this.state.width) || !(height === this.state.height)) {
      this.setState(Object.assign(this.state, { width, height }));

      const { context, item } = this.props;
      item.width = width;
      item.height = height;
      context.actions.update(context.state.boxes, item.index, item);
    }
  };

  click = () => {
    // TODO: run method

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.redraw();
    this.interval = setInterval(this.redraw, 500);
  }
  render() {
    return (
      <Draggable
        onDrag={this.move}
        onStop={this.stop}
        defaultPosition={{ x: this.props.item.x, y: this.props.item.y }}
      >
        <g ref={this.state.ref} className="flow__boxes__item">
          <rect
            className="flow__boxes__item__rect"
            width={this.state.width}
            height={this.state.height}
            rx="6"
            ry="6"
          ></rect>
          <g
            className="flow__boxes__item__content"
            transform={`
                translate(${this.state.padding.x}, ${this.state.height / 2 - 4})
            `}
          >
            <text className="flow__boxes__item__subject fs--large">
              {this.props.item.id}
            </text>
            <text className="flow__boxes__item__description">
              {this.props.item.description}
            </text>
          </g>
          <Slot item={this.props.item}></Slot>
          <Connector item={this.props.item}></Connector>
        </g>
      </Draggable>
    );
  }
}

export default Box;
