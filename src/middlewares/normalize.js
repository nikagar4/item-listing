import { isNil } from 'ramda';
import { schema as Schema, normalize } from 'normalizr';

export const getNewSchema = name => [
  new Schema.Entity(name, {}, { idAttribute: '_id' })
];

export const NORMALIZE: any = Symbol('NORMALIZE');

export default (store: Object) => (next: Function) => action => {
  const norm = action[NORMALIZE];
  if (isNil(norm)) {
    next(action);
    return;
  }

  const { schema, type, name } = norm;
  next({
    type,
    payload: normalize(norm.payload, schema),
    name
  });
};
