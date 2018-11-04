// @flow

import { mergeAll } from 'ramda';
import * as ActionTypes from './types';

const INITIAL_STATE = {
  activeItem: null,
  activeListName: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOAD_ITEMS:
      return mergeAll([
        {},
        state,
        {
          [action.name]: action.payload.result
        }
      ]);
    case ActionTypes.SET_ACTIVE_ITEM:
      return mergeAll([
        {},
        state,
        {
          activeItem: action.payload.id,
          activeListName: action.payload.listName
        }
      ]);
    case ActionTypes.RESET_ACTIVE_ITEM:
      return mergeAll([{}, state, { activeItem: null, activeListName: null }]);
    case ActionTypes.SAVE_ACTIVE_ITEM:
      return mergeAll([{}, state, { activeItem: null, activeListName: null }]);
    default:
      return state;
  }
}
