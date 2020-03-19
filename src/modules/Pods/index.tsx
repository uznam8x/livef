import React, { Component } from "react";

export interface IProps {
  className: any;
}

export interface IState {}

class Pods extends Component<IProps, IState> {
  state = {};
  render() {
    return (
      <aside id="pods" className={this.props.className}>
        <ul className="list-group">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </aside>
    );
  }
}

export default Pods;
