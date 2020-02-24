import * as R from "ramda";
function appendChild(node, parent, done){
    parent.appendChild(node);
    done(null, node);
}
export default R.curry(appendChild);