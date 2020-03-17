import { RefObject } from "react";
export interface IPoint {
  x: number;
  y: number;
}

export interface ISize {
  width?: number;
  height?: number;
}

export interface IWire {
  [key: string]: IPoint
}

export interface IPost extends IPoint{
  subject: string;
  description: string;
}

export interface IStage extends IPoint{
  ref: RefObject<SVGSVGElement>;
}

export interface IBox extends IPoint, IPost, ISize{
  index?: number;
  id: string;
  connect: IBox[] | Array<any>
  ref?: RefObject<SVGGElement>;
}