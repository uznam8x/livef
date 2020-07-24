import { curry } from 'ramda';
import store from './store';
import attrs from '../utils/attrs';
import node from '../components/node';
import zoom from './zoom';

const resize = (canvas) => {
  const {
    width,
    height,
  } = canvas.node().parentNode?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

  attrs.set({ width, height, viewBox: `0 0 ${width} ${height}` })(canvas);
};

const setup = (canvas) => {
  resize(canvas);
};

export default (canvas) => {
  window.addEventListener('resize', setup.bind(null, canvas));
  setTimeout(setup.bind(null, canvas), 10);
};
