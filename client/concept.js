import * as R from 'ramda';
import pipe from '../func/pipe';
import task from '../func/task';
import entry from './entry';
import _69ae8cb5 from './_69ae8cb5';
import _1a93c36e from './_1a93c36e';
import _e8c27b46 from './_e8c27b46';
import _bfd370f6 from './_bfd370f6';
import _be5ce90b from './_be5ce90b';
(() => new Promise((resolve) => resolve({})))()
  .then((res) =>
    pipe(
      pipe(
        pipe(
          task(
            _bfd370f6,
            Object.assign(res || {}, {
              attrs: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            })
          ),
          task(
            _be5ce90b,
            Object.assign(res || {}, { attrs: { charset: 'utf-8' } })
          )
        ).then((res) =>
          task(_1a93c36e, Object.assign(res || {}, { attrs: { a: 1 } }))
        ),
        task(_e8c27b46, Object.assign(res || {}, { attrs: {} }))
      ).then((res) =>
        task(_69ae8cb5, Object.assign(res || {}, { attrs: { lang: 'kr' } }))
      )
    ).then((res) => task(entry, Object.assign(res || {}, { attrs: {} })))
  )
  .then(console.log);

`[rect, rect] --> group --> svg`;
(() => new Propmise((resolve) => resolve({})))()
  .then(pipe(task(rect, {}), task(rect, {})))
  .then(task(group, {}))
  .then(task(svg, {}));
