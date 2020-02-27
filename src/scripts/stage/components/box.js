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

const uuid = ()=>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (+new Date() + Math.random() * 16 ) % 16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
};

class Box {
    constructor(stage, liner) {
        this.id = uuid();
        this.data = {};
        this.stage = stage;
        this.liner = liner;
        this.connect = [];

        this.position = {
            x: 0,
            y: 0
        }

        let drag = {
            x: 0,
            y: 0,
        }
        let point = {};
        this.box = createBox(stage);
        this.box.call(d3.drag()
        .on("start", v => {
            drag = d3.event;
            point = this.position;
        }).on("drag", (v)=> {
            this.setPosition(
                (d3.event.x - drag.x) + point.x,
                (d3.event.y - drag.y) + point.y
            );
            this.render();
        }).on("end", v => {}));
        this.background = createBackground(this.box);

        this.container = createContainer(this.box);

        this.in = createPoint(this.box);
        this.in.classed("box__point--in", true);
        
        this.out = createPoint(this.box);
        this.out.classed("box__point--out", true);

        this.render = this.render.bind(this);
    }

    init( data ){
        this.data = data;
        if(data.id) this.id = data.id;
        if(data.x && data.y) this.setPosition(data.x, data.y);
        if(data.subject) this.setSubject(data.subject);
        if(data.description) this.setDescription(data.description);
        
        this.box.attr("data-box-id", this.id);
        setTimeout(this.render, 500);
    }

    setPosition(x, y){
        this.position = {x,y};
        this.box.attr("transform", `translate(${x}, ${y})`);
        
    }
    setConnect( arr ){
        arr.forEach(v => {
            const point = [ {id: this.id, x: this.position.x, y: this.position.y }, ...arr ];
            this.stage.store.liner.create( point );
        });
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
            .attr("transform", `translate(${w}, ${h / 2})`);

        this.setConnect(this.data.connect);
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