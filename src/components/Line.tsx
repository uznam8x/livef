import React from "react";
import { IBoxConnect } from "../store/interfaces/box";
import { RootState } from "../store";
import { connect } from "react-redux";
import * as Boxes from "../store/modules/boxes";

const getEntries = (item: Boxes.IState ): IBoxConnect[] => {
    return Object.entries(item?.indexed).map( v => v[1]);
}

interface IOffset {
    width: number;
    height: number;
}
const getOffset = ( { padding = { x: 0, y: 0}, width = 0, height = 0} = {} ): IOffset => {
    return {
        width: width + padding.x * 2,
        height: height + padding.y * 2,
    }
}
const Line = (props: RootState) => {
    const entries = getEntries(props.boxes);
    const items = entries.filter((v:any, i: number) => v.connect && v.connect.length);
    const lines = items.reduce((a: any, b: any, i: number)=>{
        const c = b.connect.map( (v: any, k: number) => {
            const t = props.boxes.indexed[v.id];
            const fo = getOffset(b);
            const to = getOffset(t);
            const fx = b.x + fo.width;

            const p1 = { x:fx, y:b.y + (fo.height /2) };
            const p2 = { x: fx + ((t.x - fx) / 2), y:p1.y };
            const p4 = { x:t.x, y:t.y + (to.height / 2) };
            const p3 = { x: p2.x, y:p4.y };

            return (
                <path key={`${i}-${k}`} className="line" d={`M${p1.x} ${p1.y} C${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}`}></path>
            )
        })
        return a.concat(c);
    },[]);
    return (
        <g>{lines}</g>
    )
};

export default connect((state: RootState)=>({
    boxes: state.boxes,
}))(Line);