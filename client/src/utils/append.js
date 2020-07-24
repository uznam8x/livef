import {curry, forEach} from 'ramda';
export default curry((children, parent)=>{
    forEach( v => {
        parent.append(v);
    })(children);
})