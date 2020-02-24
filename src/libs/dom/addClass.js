import * as R from "ramda";
function addClass(list, node, done){
    R.forEach(v => {
        node.classList.add(v);
    }, list);
    done(null, node);
}
export default R.curry(addClass);