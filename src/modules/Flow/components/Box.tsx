import React, { Component, createRef } from "react";
import { IStage, IBox } from "../types";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
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
      x: 14,
      y: 14
    },
    ref: createRef<SVGGElement>()
  };
  move = (e: DraggableEvent, data: DraggableData) => {
    const { context, item } = this.props;
    item.x = data.x;
    item.y = data.y;
    context.actions.update(context.state.boxes, item.index, item);
  };

  componentDidMount() {
    const content = this.state.ref?.current?.querySelector(
      ".flow__boxes__item__content"
    );
    const rect: DOMRect | undefined = content?.getBoundingClientRect();
    const width = (rect?.width || 0) + this.state.padding.x * 2;
    const height = (rect?.height || 0) + this.state.padding.y * 2;

    this.setState(Object.assign(this.state, { width, height }));
    const { context, item } = this.props;
    item.width = width;
    item.height = height;
    context.actions.update(context.state.boxes, item.index, item);
  }
  render() {
    return (
      <Draggable
        onDrag={this.move}
        defaultPosition={{ x: this.props.item.x, y: this.props.item.y }}
      >
        <g ref={this.state.ref} className="flow__boxes__item">
          <rect
            className="flow__boxes__item__rect"
            width={this.state.width}
            height={this.state.height}
          ></rect>
          <g
            className="flow__boxes__item__content"
            transform={`
                translate(${this.state.padding.x}, ${this.state.height / 2 - 4})
            `}
          >
            <text className="flow__boxes__item__subject fs--large">
              {this.props.item.subject}
            </text>
            <text className="flow__boxes__item__description">
              {this.props.item.description}
            </text>
          </g>
          <circle className="flow__boxes__item__input"></circle>
          <circle className="flow__boxes__item__output"></circle>
        </g>
      </Draggable>
    );
  }
}

export default Box;