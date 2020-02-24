import * as R from "ramda";
const innerHTML = (html, node, done) => {
    node.innerHTML = html;
    done(null, node);
}

export default R.curry(innerHTML);