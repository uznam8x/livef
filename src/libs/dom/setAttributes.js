import * as R from "ramda";
const setAttributes = (attrs, node, done) => {
    for(let key in attrs){
        node.setAttribute(key, attrs[key]);
    }
    done(null, node);
}

export default R.curry(setAttributes);