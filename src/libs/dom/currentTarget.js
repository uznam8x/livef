import * as R from "ramda";
const currentTarget = (args, done) => {
    done(null, args.currentTarget);
}

export default R.curry(currentTarget);