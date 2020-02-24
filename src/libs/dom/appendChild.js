import * as R from "ramda";
import * as DOM from "./index";
function appendChild(node, parent, done){
    parent.appendChild(node);
    done(null, node);
}
export default R.curry(appendChild);