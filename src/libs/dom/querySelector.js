import * as R from "ramda";
const querySelector = (query, done) => {
    const node = document.querySelector(query);
    done(null, node);
}

export default R.curry(querySelector);