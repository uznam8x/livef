const libs = [
    {
        index: "1",
        author: "uznam8x@gmail.com",
        subject: "trim",
        description: "remove whitespace",
        input: [
            {
                variable: "word"
                type: "string",
                default: "aaa",
            }
        ],
        output: [
            {
                type: "string",
            }
        ],
        source: "./string/trim.js",
    },
    {
        index: "2",
        author: "uznam8x@gmail.com",
        subject: "log",
        description: "output data",
        input: [
            {
                variable: "message"
                type: "any",
                default: "",
            }
        ],
        output: [
            {
                type: "any",
            }
        ],
        source: "./console/log.js",
    },
]
const graph = {
    v1:[ "1","2" ]
}


const curry = (fn, ...args) => {
    return (fn.length <= args.length)
    ? fn(...args)
    : (...more) => curry(fn, ...args, ...more)
}
const livef = {
    register:(...fns)=>{
        return fns.map( f => curry(f));
    },
    run:(...fns) => {
        fns.forEach( f => {
            f[0].apply(null,f[1]);
        } );
    }
}

const async = require("async");
async.waterfall([], done);


const sum = (a,b)=>{
    console.log(a,b);
};

livef.run([
    sum, [1,2]
])

module.exports = livef;