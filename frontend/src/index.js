import go from "gojs";
import "gojs/extensions/RoundedRectangles";
import "gojs/extensions/Figures";
import "./styles/index.scss";
const $ = go.GraphObject.make;

/*
const model = new go.GraphLinksModel(
    [
        {
            key: 1,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b",
        },
        {
            key: 2,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            loop: true,
        },
        {
            key: 3,
            header: "Supplier",
            isGroup: true,
            footer: "Shipper",
            role: "b",
        },
        {
            key: 4,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b",
            group: 3,
        },
        {
            key: 5,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            group: 3,
        },
        {
            key: 13,
            header: "Supplier",
            isGroup: true,
            footer: "Shipper",
            role: "b",
            loop: true,
        },
        {
            key: 14,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b",
            group: 13,
        },
        {
            key: 15,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            group: 13,
        },
    ],
    [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 2, to: 13 },
        { from: 4, to: 5 },
        { from: 14, to: 15 },
    ]
);
*/

const model = new go.GraphLinksModel(
    [
        {
            key: 1,
            header: "Output",
            text: "Output",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
        {
            key: 2,
            header: "Html",
            text: "Html",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
        {
            key: 3,
            header: "Head",
            text: "Head",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
        {
            key: 5,
            header: "Meta",
            text: "Meta",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
        {
            key: 6,
            header: "Meta",
            text: "Meta",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
        {
            key: 4,
            header: "Body",
            text: "Body",
            footer: "Retailer",
            role: "b",
            loc: "0 0",
        },
    ],
    [
        { from: 2, to: 1 },
        { from: 3, to: 2 },
        { from: 4, to: 2 },
        { from: 5, to: 3 },
        { from: 6, to: 3 },
    ]
);
document.addEventListener("DOMContentLoaded", () => {
    let myDiagram;
    myDiagram = $(go.Diagram, "app", {
        /*layout: $(go.TreeLayout, {
            setsPortSpot: true,
            setsChildPortSpot: true,
            isRealtime: true,
        }),*/
    });

    myDiagram.nodeTemplate = $(
        go.Node,

        new go.Binding("location", "loc", go.Point.parse),
        $(
            go.Panel,
            "Auto",
            $(
                go.Shape,
                "RoundedTopRectangle",
                { fill: "white" },
                new go.Binding("fill", "role", function (r) {
                    return r[0] === "t" ? "lightgray" : "white";
                })
            ),
            $(
                go.TextBlock,
                { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                new go.Binding("text", "header")
            )
        ),
        $(
            go.Panel,
            "Auto",
            { minSize: new go.Size(NaN, 70) },
            $(go.Shape, "Rectangle", { fill: "white" }),
            $(
                go.TextBlock,
                { width: 120 },
                { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                new go.Binding("text", "text")
            ),
            $(
                go.Shape,
                "BpmnActivityLoop",
                {
                    visible: false,
                    width: 10,
                    height: 10,
                    alignment: new go.Spot(0.5, 1, 0, -3),
                    alignmentFocus: go.Spot.Bottom,
                },
                new go.Binding("visible", "loop")
            )
        ),
        $(
            go.Panel,
            "Auto",
            $(
                go.Shape,
                "RoundedBottomRectangle",
                { fill: "white" },
                new go.Binding("fill", "role", function (r) {
                    return r[0] === "b" ? "lightgray" : "white";
                })
            ),
            $(
                go.TextBlock,
                { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                new go.Binding("text", "footer")
            )
        )
    );

    /*
    myDiagram.groupTemplate = $(
        go.Group,
        "Vertical",
        { defaultStretch: go.GraphObject.Horizontal },
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
        ),
        $(
            go.Panel,
            "Auto",
            $(
                go.Shape,
                "RoundedTopRectangle",
                { fill: "white" },
                new go.Binding("fill", "role", function (r) {
                    return r[0] === "t" ? "lightgray" : "white";
                })
            ),
            $(
                go.TextBlock,
                { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                new go.Binding("text", "header")
            )
        ),
        $(
            go.Panel,
            "Auto",
            $(go.Shape, { fill: "white" }),
            $(go.Placeholder, { padding: 20 }),
            $(
                go.Shape,
                "BpmnActivityLoop",
                {
                    visible: false,
                    width: 10,
                    height: 10,
                    alignment: new go.Spot(0.5, 1, 0, -3),
                    alignmentFocus: go.Spot.Bottom,
                },
                new go.Binding("visible", "loop")
            )
        ),
        $(
            go.Panel,
            "Auto",
            $(
                go.Shape,
                "RoundedBottomRectangle",
                { fill: "white" },
                new go.Binding("fill", "role", function (r) {
                    return r[0] === "b" ? "lightgray" : "white";
                })
            ),
            $(
                go.TextBlock,
                { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                new go.Binding("text", "footer")
            )
        )
    );*/

    myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape),
        $(go.Shape, { toArrow: "Triangle" })
    );

    myDiagram.model = model;
});
