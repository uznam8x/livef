import * as d3 from 'd3';

export default {
  set(node) {
    node.call(
      d3
        .drag()
        .on('start', function () {})
        .on('drag', function (d) {
          d3.select(this)
            .attr('cx', (d.x = d3.event.x))
            .attr('cy', (d.y = d3.event.y));
        })
        .on('end', function (args) {})
    );
  },
};
