import React from 'react';
import { connect } from 'react-redux';
import { setActiveItem } from '../store/list-items/action';

const ListItem = ({ title, setActiveItem, comment, listName, id, ...rest }) => (
  <div
    className="list-item"
    {...rest}
    onClick={() => {
      setActiveItem(id, listName);
    }}
  >
    <h1>{title}</h1>
    <p>{comment}</p>
  </div>
);

export default connect(
  null,
  { setActiveItem }
)(ListItem);
