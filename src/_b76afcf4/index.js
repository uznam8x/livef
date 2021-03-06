import pipe from '../func/pipe';
import task from '../func/task';
import _4c347da6 from './_4c347da6';
import _69ae8cb5 from './_69ae8cb5';
import _1a93c36e from './_1a93c36e';
import _e8c27b46 from './_e8c27b46';
import _bfd370f6 from './_bfd370f6';
import _be5ce90b from './_be5ce90b';
export default (args, next) => {
  console.log(args);
  new Promise((resolve) => resolve(null, args || {}))
    .then((res) =>
      pipe(
        pipe(
          pipe(
            task(
              _bfd370f6,
              Object.assign(
                { props: res || {} },
                {
                  attrs: {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                  },
                }
              )
            ),
            task(
              _be5ce90b,
              Object.assign(
                { props: res || {} },
                { attrs: { charset: 'utf-8' } }
              )
            )
          ).then((res) =>
            task(
              _1a93c36e,
              Object.assign({ props: res || {} }, { attrs: { a: 1 } })
            )
          ),
          task(_e8c27b46, Object.assign({ props: res || {} }, { attrs: {} }))
        ).then((res) =>
          task(
            _69ae8cb5,
            Object.assign({ props: res || {} }, { attrs: { lang: 'kr' } })
          )
        )
      ).then((res) =>
        task(_4c347da6, Object.assign({ props: res || {} }, { attrs: {} }))
      )
    )
    .then((res) => next(null, res));
};
