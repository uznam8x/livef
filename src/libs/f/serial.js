import async from "async";
import * as R from "ramda";
const serial = (tasks, done) => {
    async.waterfall(tasks, done);
};
export default R.curry(serial);