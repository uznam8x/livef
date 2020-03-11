import React from "react";
import Stage from "../components/Stage";

interface IProps {}
interface IState {
  data: Array<any>,
}
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    setTimeout(()=>{
      const data = [
        {
          id: "a",
          subject: "toString",
          description: "any types to string",
          x: 20,
          y: 10,
          connect: [{ id: "b" }, {id: "c"}],
        },
        {
          id: "b",
          subject: "parseInt",
          description: "string to integer",
          x: 400,
          y: 200,
          connect: []
        },
        {
          id: "c",
          subject: "toString",
          description: "asdf",
          x: 400,
          y: 400,
          connect: [{id:'d'}]
        },
        {
          id: "d",
          subject: "toString",
          description: "asdf",
          x: 600,
          y: 600,
          connect: []
        },
      ];
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
            <Stage items={this.state.data} />
          </section>
          <aside id="status" className="col-2"></aside>
        </main>
      </div>
    );
  }
}

export default App;
