import React from "react";
import { connect } from "react-redux";
import { AConnection, update } from "../store/actions/connection";
import { IConnection } from "../store/interfaces/connection";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
interface IProps {
  x: number;
  y: number;
  position: {
      x: number;
      y: number;
  }
  update: any;
}

interface IState {}
class BoxConnector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
  }
  move(e: any, data: DraggableData) {
    const event = e as UIEvent;
    event.stopImmediatePropagation();
    
    const from = {x: this.props.x + this.props.position.x, y: this.props.y + this.props.position.y};
    const to = {x: e.offsetX, y: e.offsetY};
    this.props.update({from, to });
  }

  stop(e: DraggableEvent) {
    this.props.update({from:{ x: 0, y: 0}, to:{ x: 0, y: 0}});
  }
  render() {
    return (
      <Draggable onDrag={this.move} onStop={this.stop} position={this.props}>
        <circle className="box__connection" r="10"></circle>
      </Draggable>
    );
  }
}
export default connect(undefined, dispatch => {
  return {
    update: (payload: IConnection) => dispatch(update(payload))
  };
})(BoxConnector);
