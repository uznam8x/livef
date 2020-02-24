import * as R from "ramda";
import * as F from "../f";
const click = (tasks, node, done) => {
    node.addEventListener('click', (event) => {
        F.serial([
            done => {
                done(null, event);
            },
            ...tasks,
        ], (err, ans)=>{
            
        })
    });
    done(null, node);
}

export default R.curry(click);