import * as d3 from "d3";
const convert = (data) => {
    const p = data.reduce((a, b, i)=>{
        let type = "M";
        if(i > 0) type = "L";
        return `${a} ${type} ${b.x},${b.y}`;
    }, "");
    return p;
}
class Line {
    constructor(stage) {
        this.stage = stage;
        this.container = stage.append("g");
    }
    create(){

    }
}

export default Line;