import React from "react";
//import Stage from "../components/Stage";
import Flow from "../modules/Flow";
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
      <div className="container-fluid full-screen">
        <header className="toolbar"></header>
        <main className="row">
          <aside id="components" className="col-2"></aside>
          <section className="col p-0">
            <Flow items={this.state.data}>
            </Flow>
          </section>
          <aside id="status" className="col-2"></aside>
        </main>
      </div>
    );
  }
}

export default App;
