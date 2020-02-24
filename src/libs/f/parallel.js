import async from "async";
import * as R from "ramda";
const parallel = (tasks, done) => {
    async.parallel(tasks, done);
}
export default R.curry(parallel);