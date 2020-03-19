import React, { Component } from "react";
import Connections from "./components/Connections";
import Boxes from "./components/Boxes";
import { IStage, IBox, IPoint, IWire } from "./types";
import Wire from "./components/Wire";
import * as Context from "./context";
import * as R from "ramda";
import "./assets/flow.scss";
import axios from "axios";

export interface IProps {
  items: IBox[];
}

export interface IState {
  stage: IStage;
  boxes: IBox[];
  wire: {
    from: IPoint;
    to: IPoint;
  };
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
      from: { x: 0, y: 0 },
      to: { x: 0, y: 0 }
    }
  };

  timeout: any = null;
  actions = {
    update: (
      list: IBox[],
      index: number | null = null,
      item: IBox | null = null
    ) => {
      let boxes: IBox[] = list;
      if (index !== null && index > -1 && item) {
        const items: IBox[] = list.concat([]);
        items[index] = item;
        boxes = items;
      }

      this.setState({ boxes });

      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.submit, 300, item);
    },

    wire: (from: IPoint = { x: 0, y: 0 }, to: IPoint = { x: 0, y: 0 }) => {
      const wire: IWire = { from, to };
      this.setState({ wire });
    },

    connect: (item: IBox, id: string) => {
      const items: IBox[] = this.state.boxes;
      const connect = R.pipe(
        R.map((v: IBox) => ({ id: v.id })),
        R.append({ id }),
        R.uniq
      )(item.connect);

      item.connect = R.map((v: any) => this.find(items, v.id))(connect);
      this.actions.update(items, item.index, item);
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

  find = (list: IBox[], id: string): IBox | null => {
    const xid = R.findIndex(R.propEq("id", id))(list);
    return xid > -1 ? list[xid] : null;
  };

  submit = (item: IBox) => {
    const param = R.pipe(
      JSON.stringify,
      JSON.parse,
      R.map( (v: any) => ({
        id: v.id,
          subject: v.subject,
          description: v.description,
          param: v.param || {},
          x: v.x,
          y: v.y,
          connect: R.pipe(R.map((c: IBox) => ({ id: c.id })))(v.connect)
      })),
      R.head
    )([item]);


    axios({
      method: "put",
      url: `/api/flow/${param.id}`,
      data: param
    }).then(res => {});
  }

  sync = (props: IProps) => {
    //if (this.state.boxes.length !== props.items.length) {
    const boxes = R.addIndex<any, any>(R.map)(
      (v: IBox, i: number, list: any[] = []) => {
        if (!!v.connect && !!v.connect.length) {
          v.connect = R.pipe(
            R.map((c: IBox) => ({ id: c.id })),
            R.uniq
          )(v.connect);

          v.connect = R.map((v: IBox) => this.find(list, v.id))(v.connect);
        }

        v.index = i;
        v.width = v.width || 0;
        v.height = v.height || 0;
        return v;
      }
    )(props.items);

    this.setState({ boxes });

    /*
      if (force) {
        const param = R.pipe(
          JSON.stringify,
          JSON.parse,
          R.map((v: any) => {
            return {
              id: v.id,
              subject: v.subject,
              description: v.description,
              param: v.param || {},
              x: v.x,
              y: v.y,
              connect: R.pipe(R.map((c: IBox) => ({ id: c.id })))(v.connect)
            };
          })
        )(boxes);

        axios({
          method: "put",
          url: "/api/flow",
          data: param
        }).then(res => {});
      }*/
    //}
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillReceiveProps(props: IProps) {
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
          <Context.Provider value={{ state, actions }}>
            <Wire
              style="wire--dashed"
              from={this.state.wire.from}
              to={this.state.wire.to}
            ></Wire>
            <Connections></Connections>
            <Boxes></Boxes>
          </Context.Provider>
        </g>
      </svg>
    );
  }
}

export default Flow;
