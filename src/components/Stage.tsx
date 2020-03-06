import React from "react";
import Box from "./Box";
import Line from "./Line";
type Props = {};
type State = {
  boxes: Array<any>;
};

class Stage extends React.Component<Props, State> {
  state: State = {
    boxes: []
  };
  constructor(props: Props) {
    super(props);

    const boxes = [
      {
        id: "a",
        x: 20,
        y: 10,
        connect: [{ id: "b" }, {id: "c"}],
      },
      {
        id: "b",
        x: 400,
        y: 200,
        connect: []
      },
      {
        id: "c",
        x: 400,
        y: 400,
        connect: [{id:'d'}]
      },
      {
        id: "d",
        x: 600,
        y: 600,
        connect: []
      },
    ];
    this.state.boxes = boxes;
  }
  render() {
    return (
      <svg className="stage">
        <g>
          <Line></Line>
          <g>
            {this.state.boxes.map((v, i) => (
              <Box item={v} key={i}></Box>
            ))}
          </g>
        </g>
      </svg>
    );
  }
}
export default Stage;
