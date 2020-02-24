import { curry, curryN } from "ramda";
import * as F from "./index";
const combine = (tasks, args, done) => {
    F.serial([
        done => done(null, args),
        ...tasks
    ], done);
};
export default curry(combine);
