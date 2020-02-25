import * as d3 from "d3";

const style = {
    paddingLeft: 20,
    paddingTop: 14,
}

const createBox = (g) => {
    let box = g.append("g");
    box.attr("class", "box");
    return box;
}

const createBackground = (g) => {
    let background = g.append("rect");
    background
        .attr("class", "box__background")
        .attr("rx", 6).attr("ry", 6);
    return background;
}

const createContainer = (g) => {
    let node = g.append("g");
    node.attr("transform", `translate(${style.paddingLeft}, ${style.paddingTop * 2})`);
    node.attr("fill", "#333");
    node.append("text")
        .attr("class", "box__subject")
    node.append("text")
        .attr("class", "box__description")
        .attr("transform", "translate(0, 20)")
    return node;
}

const createPoint = (g) => {
    const point = g.append("circle");
    point.attr("class", "box__point")
    .attr("r", 10)
    return point;
}


class Box {
    constructor(stage) {
        this.stage = stage;
        this.connect = [];

        this.position = {
            x: 0,
            y: 0
        }

        this.box = createBox(stage);

        this.background = createBackground(this.box);

        this.container = createContainer(this.box);

        this.in = createPoint(this.box);
        this.in.classed("box__point--in", true);
        
        this.out = createPoint(this.box);
        this.out.classed("box__point--out", true);

        this.render = this.render.bind(this);
        setTimeout(this.render, 500);
    }

    setPosition(x, y){
        this.position = {x,y};
        this.box.attr("transform", `translate(${x}, ${y})`);
    }
    setConnect( arr ){
        /*arr.forEach(v => {
            const line = this.box.append("path");
            const point = [ { x: this.position.x, y: this.position.y }, ...arr ];
            line.attr("d", createPath(point));
            line.attr("stroke-width", 3)
                .attr("stroke", "#000")
        });*/
        
    }

    setSubject( str ){
        this.container.select(".box__subject").text(str);
    }
    setDescription( str ){
        this.container.select(".box__description").text(str);
    }

    render(){
        const rect = this.container.node().getBoundingClientRect();
        const w = rect.width + ( style.paddingLeft * 2 );
        const h = rect.height + ( style.paddingTop * 2 ) - 4;

        this.background
            .attr("width", w)
            .attr("height", h);

        this.in
            .attr("transform", `translate(0, ${h / 2})`)

        this.out
            .attr("transform", `translate(${w}, ${h / 2})`)
    }
}
/*

const bound = (g) => {
    return g.node().getBoundingClientRect();
}

const translateY = (g) => {
    const rect = bound(g);
    g.attr("transform", `translate(0, ${rect.height / 2})`);
    return g;
}

const addContainer = (g, style = { paddingLeft: 0, paddingTop: 0}) => {
    let node = g.append("g");
    node.attr("fill", "#333");
    node.attr("transform", `translate(${style.paddingLeft}, ${style.paddingTop * 2})`);
    node.append("text")
        .attr("class", "box__title")
        .text("title");
    node.append("text")
        .attr("class", "box__category")
        .attr("transform", "translate(0, 20)")
        .text("category");

    return node;
}

const addLinker = (g) => {
    const link = g.append("g");
    link.append("circle")
    .attr("class", "box__linker")
    .attr("r", 10)
    return link;
}
const setLink = () => {

}
export default ( stage, option = {} ) => {
    
    let box = stage.append("g");
    box.attr("class", "box");
    
    let background = box.append("rect");
    background
        .attr("class", "box__background")
        .attr("rx", 6).attr("ry", 6);

    let container = addContainer(box, style);

    const input = addLinker(box);
    const output = addLinker(box);
    
    setTimeout(()=>{
        const rect = bound(container);
        const w = rect.width + ( style.paddingLeft * 2 );
        const h = rect.height + ( style.paddingTop * 2 ) - 4;
        background
            .attr("width", w)
            .attr("height", h);

        input
            .attr("transform", `translate(0, ${h / 2})`)
        output
            .attr("transform", `translate(${w}, ${h / 2})`)
    }, 300);

    return {
        el: box,
        setLink,
    };
}
*/

export default Box;