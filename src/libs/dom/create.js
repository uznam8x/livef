import * as R from "ramda";
const createElement = (tag, done) => {
    const el = document.createElement(tag);
    done(null, el);
}

export default R.curry(createElement);