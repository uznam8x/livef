import React from "react";
import Flow from "../modules/Flow";
import Pods from "../modules/Pods";
import axios from "axios";
import * as api from "../context/api";
interface IProps {}
interface IState {
  data: Array<any>;
}
class App extends React.Component<IProps, IState> {
  state = {
    data: []
  };

  componentDidMount() {
    axios(api.flow as any).then((res: any) => this.setState({ data: res.data }));
  }

  componentWillMount() {}

  render() {
    return (
      <div className="container max-w-none h-full">
        <header className="toolbar"></header>
        <main className="flex">
          <Pods className="w-2/12"></Pods>
          <Flow items={this.state.data}></Flow>
          <aside id="status" className="w-2/12"></aside>
        </main>
      </div>
    );
  }
}

export default App;
