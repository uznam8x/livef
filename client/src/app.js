import * as d3 from 'd3';
import { curry, mergeDeepLeft } from 'ramda';
import store from './core/store';
import viewport from './core/viewport';
import Node from './components/node';
import Line from './components/line';
import zoom from './core/zoom';

const view = d3.create('svg');

export default {
  mount: curry((options, selector) => {
    const container = document.querySelector(selector);
    container.appendChild(view.node());

    const canvas = {
      view,
      stage: view.append('g'),
    };

    viewport(view);
    zoom(view, canvas.stage);

    //new Node(canvas.stage.append('g'));
    //new Line(canvas.stage.append('g'));

    store.canvas = canvas;
  }),

  model(nodes, paths) {
    store.model = [nodes, paths];


    /*nodes.forEach( v => {
      node.add(v);
    });
    paths.forEach( v => {
      node.add(v);
    });*/
  },
};
