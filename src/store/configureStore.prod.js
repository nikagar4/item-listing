import { createStore, compose } from 'redux';

export default (reducer, middlewares) => {
  return createStore(reducer, compose(middlewares));
};
