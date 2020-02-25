import async from "async";
import * as R from "ramda";
import * as DOM from "./libs/dom";
import * as F from "./libs/f";
import * as CS from "./libs/console";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import "./scripts/stage/index";
/*F.serial(
    [
        DOM.loaded,
        (args, done) =>
            F.parallel(
                [
                    DOM.querySelector("#app"),
                    F.serial([
                        DOM.createElement("button"),
                        DOM.setAttributes({
                            class: "test",
                            style: "padding: 2px;"
                        }),
                        DOM.innerHTML("test"),
                        DOM.onClick([DOM.currentTarget, DOM.innerHTML("click")])
                    ])
                ],
            ),
        F.spread,
        DOM.appendChild
    ]
)();*/
/*
const entry = ( args ) => done => {
    done(null, args);
}

F.serial([
    DOM.querySelector("#app"),
    (args, done) => {
        F.parallel([
            F.serial([
                DOM.createElement("div"),
                DOM.setAttributes({class:"test"}),
            ]),
            F.serial([
                DOM.createElement("div"),
                DOM.setAttributes({class:"asdf"}),
            ]),
        ], (err, ans)=>{
            done(err, ans, args);
        });
    },
    (nodes, parent, done) => {
        F.parallel(R.map( v => next => {
            DOM.appendChild(v, parent, next);
        })(nodes), done);
    }
], (err, ans) => {
    console.log(ans);
});

F.parallel([
    DOM.querySelector("#app"),
    F.serial([
        DOM.createElement("button"),
        DOM.setAttributes({class:"test"}),
    ])
], (err, ans)=>{
    F.serial([
        done => { done(null, ans)},
        F.spread,
        DOM.appendChild
    ], (err, ans)=>{

    })
})
*/
