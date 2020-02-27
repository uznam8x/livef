import * as d3 from "d3";
import store from "../store";
const convert = (from, to) => {
    console.log(to);
    const fx = from.vx + ( (to.vx - from.vx) / 2 );
    const fy = from.vy;

    const tx = fx;
    const ty = from.vy + ( (to.vy - from.vy) / 2 );
    return `M ${from.vx} ${from.vy} C ${fx} ${fy}, ${tx} ${ty}, ${to.vx} ${to.vy}`;
}

const indexed = {};
class Line {
    constructor(stage) {
        this.stage = stage;
        this.container = stage.append("g");
    }
    create(point){
        let [from, to] = point;
        const start = this.stage.select(`[data-box-id="${from.id}"]`);
        const end = this.stage.select(`[data-box-id="${to.id}"]`);
        
        from.rect = start.node().getBoundingClientRect();
        to.rect = end.node().getBoundingClientRect();
        
        from.vx = from.x + (from.rect.width - 18);
        from.vy = from.y + (from.rect.height / 2);
        to.vx = to.x;
        to.vy = to.y + (to.rect.height / 2);
        
        let line = null;
        let key = from.id+'-'+to.id;
        if(indexed[key]){
            line = indexed[key];
        } else {
            line = this.container.append("path");
            indexed[key] = line;
        }

        line.attr("d", convert(from, to));
        line.attr("stroke-width", 3)
        .attr("stroke-linecap","round").attr("fill","transparent")
            .attr("stroke", "#000");

        
    }
}

export default Line;