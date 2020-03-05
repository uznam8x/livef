import React from "react";
import { TBox } from "./Box";
import { RootState } from "../store";
import { connect } from "react-redux";

const getEntries = (item: any ): any => {
    return Object.entries(item?.indexed).map( v => v[1]);
}
const Line = (props: any) => {
    const entries = getEntries(props.boxes);
    const items = entries.filter((v:any, i: number) => v.connect && v.connect.length);
    const lines = items.reduce((a: any, b: any, i: number)=>{
        const c = b.connect.map( (v: any, k: number) => {
            const t: TBox = props.boxes.indexed[v.id];
            const fx = b.x + b.vw;
            const p1 = { x:fx, y:b.y + (b.vh /2) };
            const p2 = { x: fx + ((t.x - fx) / 2), y:p1.y };
            const p4 = { x:t.x, y:t.y + (t.vh / 2) };
            const p3 = { x: p2.x, y:p4.y };

            return (
                <path key={`${i}-${k}`} className="line" d={`M${p1.x} ${p1.y} C${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}`}></path>
            )
        })
        return a.concat(c);
    },[]);
    
    return (
        <g className="line">
            {lines}
        </g>
    )
}
export default connect((state: RootState, props)=>({
    boxes: state.boxes,
}))(Line);