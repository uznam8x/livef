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




const sum = (a,b)=>{
    console.log(a,b);
};

livef.run([
    sum, [1,2]
])

module.exports = livef;