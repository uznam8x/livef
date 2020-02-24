import { curry } from "ramda";
const combine = (fn, args, done) => {
    
    fn((err, ans) => {
        done(err, [args, ans])
    });
};
export default curry(combine);
