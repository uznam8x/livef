import * as d3 from "d3";
import * as R from "ramda";
import Store from "./store";
import Box from "./components/box";
import Liner from "./components/liner";

// stage
const stage = d3.select("#stage").append("svg");
stage.attr("width", "100%").attr("height", "100%");

// model
const graph = [
    {
        id:"a",
        x: 10,
        y: 20,
        subject: "Subject",
        description: "common",
        connect:[
            {
                id: "b",
            }
        ],
    },
    {
        id:"b",
        x: 280,
        y: 60,
        subject: "Subject",
        description: "common",
        connect:[
            {
                id: "c",
            }
        ],
    },
    {
        id:"c",
        x: 460,
        y: 200,
        subject: "Subject",
        description: "common",
        connect:[
            {
                id: "d",
            }
        ],
    },
    {
        id:"d",
        x: 600,
        y: 270,
        subject: "Subject",
        description: "common",
        connect:[],
    },
];


const data = R.map( v => {
    v.connect = R.map( m => {
        const a = R.find(R.propEq('id', m.id))(graph);
        return {
            id: a.id, 
            x: a.x,
            y: a.y,
        }
    })(v.connect);
    return v;
} )(graph);

stage.store = new Store(stage);

R.forEach( v => {
    const box = new Box(stage);
    box.init(v);
    //box.attr("transform", `translate(${v.x}, ${v.y})`);
})(data);
