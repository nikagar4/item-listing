// @flow

import { NORMALIZE, getNewSchema } from '../../middlewares/normalize';
import * as ActionTypes from './types';
import LIST_ITEMS from './constant';

export function loadItems(name) {
  return {
    [NORMALIZE]: {
      type: ActionTypes.LOAD_ITEMS,
      payload: LIST_ITEMS,
      schema: getNewSchema(name),
      name
    }
  };
}

export function setActiveItem(id, listName) {
  return {
    type: ActionTypes.SET_ACTIVE_ITEM,
    payload: { id, listName }
  };
}

export function resetActiveItem() {
  return {
    type: ActionTypes.RESET_ACTIVE_ITEM
  };
}

export function saveActiveItem(activeItem, activeListName, item) {
  return {
    type: ActionTypes.SAVE_ACTIVE_ITEM,
    payload: { id: activeItem, listName: activeListName, item }
  };
}
