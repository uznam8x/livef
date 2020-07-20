import go, { Margin } from "gojs";
import "gojs/extensions/RoundedRectangles";
import "gojs/extensions/Figures";
import "./styles/index.scss";
import Ws from "@adonisjs/websocket-client/index";
const ws = Ws("ws://localhost:3333");
ws.connect();

const fs = ws.subscribe("fs");
fs.emit("create", { asdf: 111 });
const $ = go.GraphObject.make;

const model = new go.GraphLinksModel(
    [
        {
            key: 1,
            text: "Output",
        },
        {
            key: 2,
            text: "Html",
        },
        {
            key: 3,
            text: "Head",
        },
        {
            key: 5,
            text: "Meta",
        },
        {
            key: 6,
            text: "Meta",
        },
        {
            key: 4,
            text: "Body",
        },
    ],
    [
        { from: 2, fromPort: "out", to: 1, toPort: "in" },
        { from: 3, fromPort: "out", to: 2, toPort: "in" },
        { from: 4, fromPort: "out", to: 2, toPort: "in" },
        { from: 5, fromPort: "out", to: 3, toPort: "in" },
        { from: 6, fromPort: "out", to: 3, toPort: "in" },
    ]
);
model.linkFromPortIdProperty = "fromPort";
model.linkToPortIdProperty = "toPort";
document.addEventListener("DOMContentLoaded", () => {
    let myDiagram;
    myDiagram = $(go.Diagram, "app", {
        initialAutoScale: go.Diagram.UniformToFill,
        // define the layout for the diagram
        //layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 }),
        //layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 }),
        grid: $(
            go.Panel,
            "Grid",
            $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineH", {
                stroke: "gray",
                strokeWidth: 0.5,
                interval: 10,
            }),
            $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
            $(go.Shape, "LineV", {
                stroke: "gray",
                strokeWidth: 0.5,
                interval: 10,
            })
        ),

        "clickCreatingTool.archetypeNodeData": {
            text: "Node",
            color: "white",
        },

        "commandHandler.archetypeGroupData": {
            text: "Group",
            isGroup: true,
            color: "blue",
        },
        "undoManager.isEnabled": true,
    });

    myDiagram.nodeTemplate = $(
        go.Node,
        go.Panel.Auto,
        /* new go.Binding(
            "location",
            () =>
                new go.Point.parse(
                    `${Math.random() * 1000} ${Math.random() * 1000}`
                )
        ), */
        $(
            go.Panel,

            $(
                go.Panel,
                go.Panel.Auto,
                { minSize: new go.Size(NaN, 32), margin: 6 },
                $(go.Shape, "RoundedRectangle", {
                    fill: "purple",
                    stroke: null,
                }),
                $(
                    go.TextBlock,
                    { width: 120, textAlign: "center", stroke: "white" },
                    new go.Binding("text", "text")
                )
            )
        ),
        $(go.Shape, "Circle", {
            alignment: new go.Spot(0, 0.5),
            desiredSize: new go.Size(12, 12),
            fill: "green",
            stroke: "gray",
            portId: "in",
            toSpot: go.Spot.Left,
        }),
        $(go.Shape, "Circle", {
            alignment: new go.Spot(1, 0.5),
            desiredSize: new go.Size(12, 12),
            fill: "red",
            portId: "out",
            fromSpot: go.Spot.Right,
        })
    );

    myDiagram.linkTemplate = $(
        go.Link,
        {
            routing: go.Link.Orthogonal,
            corner: 99,
            relinkableFrom: true,
            relinkableTo: true,
        },
        $(go.Shape, { stroke: "gray", strokeWidth: 2 }),
        $(go.Shape, { stroke: "gray", fill: "gray", toArrow: "Standard" })
    );

    myDiagram.model = model;
});
