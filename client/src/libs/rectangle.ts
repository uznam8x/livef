export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    padding? : {
        x: number,
        y: number,
    }
}
export function getBounding( rect = { x: 0, y: 0, width: 0, height: 0, padding: { x: 0, y: 0}} ):Rectangle {
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width + (rect.padding.x * 2),
        height: rect.height + (rect.padding.y * 2),
    }
}