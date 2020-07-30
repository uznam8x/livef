export default (args, next) => {
  next(null, {
    tagName: 'rect',
    attributes: { width: 100, height: 60, style: 'fill: red;' },
    children: [],
  });
};
