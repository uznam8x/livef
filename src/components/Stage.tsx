import React from "react";
import { connect } from "react-redux";
import Box from "./Box";
import Line from "./Line";
import { RootState } from "../store";
import { IConnection } from "../store/interfaces/connection";
import { getPointsToPath } from "../libs/bezier";
interface IProps {
  items: Array<any>;
  connection?: any;
};
interface IState {
};

class Stage extends React.Component<IProps, IState> {
  constructor(props:IProps){
    super(props);
  }
  render() {
    return (
      <svg className="stage">
        <g>
          <path className="connection" d={getPointsToPath(this.props.connection.from, this.props.connection.to)}></path>
          <Line></Line>
          <g>
            {this.props.items.map((v, i) => (
              <Box item={v} key={i}></Box>
            ))}
          </g>
        </g>
      </svg>
    );
  }
}
export default connect((state:RootState) => {
  return Object.assign({}, state);
})(Stage);