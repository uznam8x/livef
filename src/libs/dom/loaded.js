import * as R from "ramda";
const loaded = (done) => {
    document.addEventListener("DOMContentLoaded", (e) => {
        done(null, e.target);
    });
};

export default R.curry(loaded);
