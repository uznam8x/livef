import * as d3 from 'd3';
import attrs from '../utils/attrs';
export default (view, el) =>
  view.call(
    d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', function () {
        attrs.set({ transform: d3.event.transform })(el);
      })
  );
