import fs from 'fs';
import path from 'path';
export default (args, next) => {
  const { props = {} } = args;

  const dist = path.resolve(__dirname, './index.html');
  fs.writeFileSync(dist, props.html || '');
  next(null, { dist });
};
