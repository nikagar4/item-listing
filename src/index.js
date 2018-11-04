import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mergeAll, merge } from 'ramda';
import './index.css';
import normalize from './middlewares/normalize';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { itemsReducer, loadItems } from './store';
import { SAVE_ACTIVE_ITEM } from './store/list-items/types';

const reducers = {
  items: itemsReducer,
  entities: (state = {}, action) => {
    if (action.type === SAVE_ACTIVE_ITEM) {
      const { listName, id, item } = action.payload;
      return mergeAll([
        {},
        state,
        {
          [listName]: merge(state[listName], {
            [id]: merge(state[listName][id], item)
          })
        }
      ]);
    }
    if (action.payload && action.payload.entities) {
      return mergeAll([{}, state, action.payload.entities]);
    }
    return state;
  }
};

const reducer = combineReducers(reducers);

const store = configureStore(reducer, applyMiddleware(normalize));

store.dispatch(loadItems('items1'));
store.dispatch(loadItems('items2'));
store.dispatch(loadItems('items3'));
store.dispatch(loadItems('items4'));
store.dispatch(loadItems('items5'));
store.dispatch(loadItems('items6'));
store.dispatch(loadItems('items7'));
store.dispatch(loadItems('items8'));
store.dispatch(loadItems('items9'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
