import React from "react";
//import Stage from "../components/Stage";
import Flow from "../modules/Flow";
import Pods from "../modules/Pods";
import { IBox } from "../modules/Flow/types";
import Data from "../database/flow.json";
interface IProps {}
interface IState {
  data: Array<any>,
}
class App extends React.Component<IProps, IState> {
  state = {
    data: [],
  };
  componentDidMount() {
    setTimeout(()=>{
      const data: IBox[] = Data;
      this.setState({data});
    },1000);
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
