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
        w: 0,
        h: 0,
        connect: [
            {id:"b"}
        ],
      },
      {
          id: "b",
        x: 400,
        y: 200,
        w: 0,
        h: 0,
        connect: [],
      }
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
