import { observable, action } from 'mobx';
const store = observable({
  canvas: null,
  model: [],
});
export default store;
