import "./styles/index.scss";
import Ws from "@adonisjs/websocket-client/index";
const ws = Ws("ws://localhost:3333");
ws.connect();

const fs = ws.subscribe("fs");
fs.emit("create", { asdf: 111 });
const $ = go.GraphObject.make;
go.Key = "string";
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

        "undoManager.isEnabled": true,
    });

    myDiagram.nodeTemplate = $(
        go.Node,
        go.Panel.Auto,
        { locationSpot: go.Spot.Center },
        new go.Binding(
            "location",
            () =>
                new go.Point.parse(
                    `${Math.random() * 1000} ${Math.random() * 1000}`
                )
        ),
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
            portId: "in",
            toLinkable: true,
            toSpot: go.Spot.Left,
        }),
        $(go.Shape, "Circle", {
            alignment: new go.Spot(1, 0.5),
            desiredSize: new go.Size(12, 12),
            fill: "red",
            portId: "out",
            cursor: "pointer",
            fromLinkable: true,
            fromSpot: go.Spot.Right,
        })
    );

    myDiagram.groupTemplate = $(go.Group, "Vertical");
    myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape),
        $(go.Shape, { toArrow: "Triangle" })
    );

    myDiagram.model = model;

    myDiagram.addModelChangedListener(function (evt) {
        // ignore unimportant Transaction events
        if (!evt.isTransactionFinished) return;
        var txn = evt.object; // a Transaction
        if (txn === null) return;
        // iterate over all of the actual ChangedEvents of the Transaction
        txn.changes.each(function (e) {
            // record node insertions and removals
            if (
                e.change === go.ChangedEvent.Insert &&
                e.modelChange === "nodeDataArray"
            ) {
                const node = myDiagram.model.findNodeDataForKey(e.newValue.key);

                console.log(
                    evt.propertyName + " added node with key: " + e.newValue.key
                );
            } else if (
                e.change === go.ChangedEvent.Remove &&
                e.modelChange === "nodeDataArray"
            ) {
                console.log(
                    evt.propertyName +
                        " removed node with key: " +
                        e.oldValue.key
                );
            }

            if (e.change === go.ChangedEvent.Property) {
                if (e.modelChange === "linkFromKey") {
                    console.log(
                        evt.propertyName +
                            " changed From key of link: " +
                            e.object +
                            " from: " +
                            e.oldValue +
                            " to: " +
                            e.newValue
                    );
                } else if (e.modelChange === "linkToKey") {
                    console.log(
                        evt.propertyName +
                            " changed To key of link: " +
                            e.object +
                            " from: " +
                            e.oldValue +
                            " to: " +
                            e.newValue
                    );
                }
            } else if (
                e.change === go.ChangedEvent.Insert &&
                e.modelChange === "linkDataArray"
            ) {
                console.log(
                    evt.propertyName +
                        " added link: " +
                        JSON.stringify(e.newValue)
                );
            } else if (
                e.change === go.ChangedEvent.Remove &&
                e.modelChange === "linkDataArray"
            ) {
                console.log(evt.propertyName + " removed link: " + e.oldValue);
            }
        });
    });

    document.querySelector(".btn--add").addEventListener("click", () => {
        //myDiagram.model.addNodeData({ key: "adsf", text: "node" });
        console.log(myDiagram.toolManager.clickCreatingTool);
        myDiagram.toolManager.clickCreatingTool.doMouseUp();
    });
});
