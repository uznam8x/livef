import React, {RefObject} from "react";
import { connect } from "react-redux";
import { AConnection, update } from "../store/actions/connection";
import { IConnection } from "../store/interfaces/connection";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
interface IProps {
  x: number;
  y: number;
  update: any;
}

interface IState {
  ref: RefObject<SVGCircleElement>,
}

class BoxConnector extends React.Component<IProps, IState> {
  position: object = {x: 0, y: 0}
  constructor(props: IProps) {
    super(props);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    this.state = {
      ref: React.createRef<SVGCircleElement>(),
    }
  }

  start(e:any, data: DraggableData){
    const rect = this.state.ref.current?.getBoundingClientRect();
    console.log(this.state.ref.current?.transform.baseVal.consolidate());
    this.position = {x: rect?.x, y: rect?.y};
    document.querySelector("body")?.classList.add("react-draggable-dragging");
  }

  
  move(e: any, data: DraggableData) {
    const event = e as UIEvent;
    event.stopImmediatePropagation();
    
    //console.dir(this.state.ref.current);
    //const from = {x: this.props.x + this.props.position.x, y: this.props.y + this.props.position.y};
    //const to = {x: e.offsetX, y: e.offsetY};
    this.props.update({from:this.position, to:this.state.ref.current?.getBoundingClientRect() });
  }

  stop(e: DraggableEvent) {
    this.props.update({from:{ x: 0, y: 0}, to:{ x: 0, y: 0}});
    document.querySelector("body")?.classList.remove("react-draggable-dragging");
  }

  render() {
    return (
      <Draggable onStart={this.start} onDrag={this.move} onStop={this.stop} position={this.props}>
        <circle ref={this.state.ref} className="box__connection" r="10"></circle>
      </Draggable>
    );
  }
}

export default connect(undefined, dispatch => {
  return {
    update: (payload: IConnection) => dispatch(update(payload))
  };
})(BoxConnector);
