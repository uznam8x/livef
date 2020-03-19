import React, { Component } from "react";
import Connections from "./components/Connections";
import Boxes from "./components/Boxes";
import { IStage, IBox, IPoint, IWire } from "./types";
import Wire from "./components/Wire";
import * as Context from "./context";
import * as R from "ramda";
import "./assets/flow.scss";
export interface IProps {
  items: IBox[];
}

export interface IState {
  stage: IStage;
  boxes: IBox[];
  wire: {
    from: IPoint;
    to: IPoint;
  }
}

class Flow extends Component<IProps, IState> {
  state = {
    stage: {
      ref: React.createRef<SVGSVGElement>(),
      x: 0,
      y: 0
    },
    boxes: [],
    wire: {
      from: { x: 0, y: 0},
      to: { x: 0, y: 0},
    }
  };

  

  actions = {
    update: (list: IBox[], index: number | null = null, item: IBox | null = null) => {
      if(index !== null && index > -1 && item){
        const items:IBox[] = list.concat([]);
        items[index] = item;
        this.setState({ boxes: items});
      } else {
        this.setState({ boxes: list});
      }
      
    },
    wire:(from: IPoint = {x: 0, y:0}, to: IPoint = {x: 0, y:0}) => {
      const wire: IWire = {from, to};
      this.setState(Object.assign(this.state, {wire}));
    },
    connect: (item:IBox, id: string) => {
      item.connect = R.pipe(
        R.append({id})
      )(item.connect);
      
      const items: IBox[] = this.state.boxes;
      if((item.index !== null || item.index !== undefined)){
        const index: number = item.index || 0;
        items[index] = item;
        this.sync({items}, true);
      }
    }
  };

  resize = () => {
    const rect = this.state.stage.ref.current?.getBoundingClientRect();
    this.setState({
      stage: Object.assign(this.state.stage, {
        x: rect?.x || 0,
        y: rect?.y || 0
      })
    });
  };

  sync = (props: IProps, force: boolean = false) => {
    if(this.state.boxes.length !== props.items.length || force){
      const boxes = R.addIndex<any, any>(R.map)((v: IBox, i: number, list: any[] = []) => {
        if (!!v.connect && !!v.connect.length) {
          v.connect = R.addIndex<any, any>(R.map)((c: IBox, k: number) => {
            const xid = R.findIndex(R.propEq("id", c.id))(list);
            return (xid > -1) ? list[xid] : c;
          })(v.connect);
        }
        v.index = i;
        v.width = v.width || 0;
        v.height = v.height || 0;
        return v;
      })(props.items);
  
      this.setState({boxes});
    }
  }
  componentDidMount() {
    
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillReceiveProps(props: IProps){
    this.sync(props);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const { state, actions } = this;

    return (
      <svg
        ref={this.state.stage.ref}
        className="flow"
        data-x={this.state.stage.x}
      >
        <g className="flow__stage">
          <Context.Provider
            value={{ state, actions }}
          >
            <Wire style="wire--dashed" from={this.state.wire.from} to={this.state.wire.to}></Wire>
            <Connections></Connections>
            <Boxes></Boxes>
          </Context.Provider>
        </g>
      </svg>
    );
  }
}

export default Flow;
