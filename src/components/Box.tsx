import React from "react";
import { connect } from "react-redux";
import { register } from "../store/actions/box";
import { IBoxConnect } from "../store/interfaces/box";
import Draggable from "react-draggable";
interface IProps {
  item: any;
  register: any;
}

interface IState {
  config: any;
  item: IBoxConnect;
}

class Box extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.update = this.update.bind(this);
    this.move = this.move.bind(this);

    const config = {
      padding: {
        x: 14,
        y: 14
      },
      ref: React.createRef<SVGGElement>()
    };

    this.state = {
      config,
      item: Object.assign(props.item, config)
    };
  }

  update(v: IBoxConnect) {
    const content = v.ref?.current?.querySelector(".box__content");
    const rect = content?.getBoundingClientRect();
    v.width = rect!.width || 0;
    v.height = rect!.height || 0;
    this.setState({ item: v });
    this.props.register(v);
  }
  componentDidMount() {
    this.update(Object.assign(this.props.item, this.state.config));
  }
  move(e: any, data: any) {
    this.update(Object.assign(this.state.item, { x: data.x, y: data.y }));
  }
  render() {
    const box: IBoxConnect = this.state.item;
    const v: any = box;
    v.width = v.width || 0;
    v.height = v.height || 0;
    v.vw = v.width + v.padding.x * 2;
    v.vh = v.height + v.padding.y * 2;
    v.cx = v.vw / 2;
    v.cy = v.vh / 2;
    return (
      <Draggable onDrag={this.move} defaultPosition={{ x: v.x, y: v.y }}>
        <g ref={v.ref} className="box" transform={`translate(${v.x}, ${v.y})`}>
          <rect
            className="box__background"
            rx="8"
            ry="8"
            width={v.vw}
            height={v.vh}
          ></rect>
          <g
            className="box__content"
            transform={`translate(${v.padding.x}, ${v.padding.y - 5 + v.height / 2} )`}
          >
            <text className="box__subject">
              asdfasdfasdfasdfasdfasdfasfasfd
            </text>
            <text className="box__description">bbb</text>
          </g>
          <circle className="box__input" cx="0" cy={v.cy} r="10"></circle>
          <circle className="box__output" cx={v.vw} cy={v.cy} r="10"></circle>
        </g>
      </Draggable>
    );
  }
}

export default connect(null, dispatch => {
  return {
    register: (payload: IBoxConnect) => dispatch(register(payload))
  };
})(Box);
