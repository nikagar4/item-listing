import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { pipe, path, ap, map, nth, of } from 'ramda';
import ListItem from './ListItem';

const ListContainer = ({ listItems, listName }) => (
  <div>
    {listItems.map(({ _id, name, comment }) => (
      <ListItem
        key={_id}
        title={name}
        id={_id}
        listName={listName}
        comment={comment}
      />
    ))}
  </div>
);

const mstp = (state, ownProps) => {
  const { listItemIds, listName } = ownProps;
  const listItems = pipe(path(['entities', listName]))(state);
  return {
    listItems: ap(map(nth, listItemIds), of(listItems))
  };
};

const enhance = compose(connect(mstp));

export default enhance(ListContainer);
