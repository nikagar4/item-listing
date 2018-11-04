import React from 'react';
import { connect } from 'react-redux';
import ListItemFull from '../components/ListItemFull';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

function withActiveItem(WrappedComponent) {
  const ComponentWithActiveItem = ({ activeItem, ...props }) => (
    <div>
      {activeItem && <ListItemFull />}
      <WrappedComponent {...props} />
    </div>
  );

  ComponentWithActiveItem.displayName = `withActiveItem(${getDisplayName(
    WrappedComponent
  )})`;

  const mstp = state => {
    return {
      activeItem: state.items.activeItem
    };
  };

  return connect(mstp)(ComponentWithActiveItem);
}

export default withActiveItem;
