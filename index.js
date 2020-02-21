console.clear();
import async from "async";
import * as R from "ramda";
const Debug = {
    log(message, done){
        console.log(message);
        done(null, message + Math.random());
    },
}

const pipe = (...fns) => x => {
    const perf = [];
    const task = fns.map( (v, i) => (...args) => {
        perf[i] = {id:i, name:v.name, start:Date.now(), end: 0};
        const done = args.pop();
        v(...args, (err, ans)=>{
            perf[i].end = Date.now();
            done(err, ans);
        });
    } );

    const arr = [(done) => {
        done(null, x);
    }, ...task];

    const done = (err, ans) => {
        const res = perf.map(v => ({
            name: v.name,
            performance: v.end - v.start
        }));
        res.push( res.reduce((a,b) => {
            a.name = 'total';
            a.performance = (a.performance || 0 ) + b.performance;
            return a;
        }, {}) );
        return res;
    }
    async.waterfall.call(null, arr, done);
}

pipe(
    Debug.log,
    Debug.log,
)("hello");