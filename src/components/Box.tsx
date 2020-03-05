import React, { RefObject } from "react";
import { connect } from "react-redux";
import { register } from "../store/modules/boxes";
import Draggable from 'react-draggable';
type Props = {
  item: any;
  register: any;
};
type State = {
  config: any;
  box: TBox | any;
};
export type TBox = {
  id: string;
  g: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vw: number;
  vh: number;
  cx: number;
  cy: number;
  ref: RefObject<SVGGElement>;
  connect: Array<any>;
};
class Box extends React.Component<Props, State> {
  state: State = {
    config: {
      g: 14,
      vw: 0,
      vh: 0,
      cx: 0,
      cy: 0,
      ref: React.createRef<SVGGElement>()
    },
    box: {}
  };
  constructor(props: Props) {
    super(props);
    this.state.box = Object.assign(props.item, this.state.config);
    this.update = this.update.bind(this);
    this.move = this.move.bind(this);
  }

  update(v: any) {
    const content = v.ref?.current?.querySelector(".box__content");
    const rect = content?.getBoundingClientRect();
    v.w = rect?.width || 0;
    v.h = rect?.height || 0;
    v.vw = v.w + v.g * 2;
    v.vh = v.h + v.g * 2;
    v.cx = v.vw / 2;
    v.cy = v.vh / 2;
    this.setState({ box: v });

    const payload = { [v.id]: v };
    this.props.register(payload);
  }
  componentDidMount() {
    this.update( Object.assign(this.props.item, this.state.config) );
  }
  move(e: any, data: any){
    this.update(Object.assign(this.state.box, {x:data.x, y:data.y}));
  }
  render() {
    const v: TBox = this.state.box;
    return (
        <Draggable
            onDrag={this.move}
            defaultPosition={{x: v.x, y: v.y}}
        >
      <g id={`box-${v.id}`} ref={v.ref} className="box" transform={`translate(${v.x}, ${v.y})`}>
        <rect
          className="box__background"
          rx="8"
          ry="8"
          width={v.vw}
          height={v.vh}
        ></rect>
        <g
          className="box__content"
          transform={`translate(${v.g}, ${v.g - 5 + v.h / 2} )`}
        >
          <text className="box__subject">asdfasdfasdfasdfasdfasdfasfasfd</text>
          <text className="box__description">bbb</text>
        </g>
        <circle className="box__input" cx="0" cy={v.cy} r="10"></circle>
        <circle className="box__output" cx={v.vw} cy={v.cy} r="10"></circle>
      </g>
      </Draggable>
    );
  }
}

export default connect(null, (dispatch) => {
  return {
    register: (payload: any) => dispatch(register(payload))
  };
})(Box);
