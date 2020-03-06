import { RefObject } from "react";
export interface IBox {
    id: string,
    x: number,
    y: number,
    
}

export interface IBoxBound extends IBox {
    padding: {
        x: number,
        y: number,
    },
    width?: number | 0,
    height?: number | 0,
    ref?: RefObject<SVGGElement>
}

export interface IBoxConnect extends IBoxBound {
    connect: Array<any>,
}