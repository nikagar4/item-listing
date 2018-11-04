import React from 'react';
import { connect } from 'react-redux';
import { pick, prop, pipe, omit } from 'ramda';
import { debounce } from 'lodash';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

const listOrganizer = name => WrappedComponent => {
  class ComponentWithListItems extends React.Component {
    state = {
      lastIndex: 0
    };

    componentDidMount() {
      this.scrollContainer.addEventListener('scroll', this.onScroll);
    }

    onScroll = debounce(({ target }) => {
      if (target.scrollTop === target.scrollHeight - target.offsetHeight) {
        this.setState({
          lastIndex: this.state.lastIndex + 10
        });
      }
    }, 200);

    componentWillUnmount() {
      this.scrollContainer.removeEventListener('scroll', this.onScroll);
    }

    scrollContainer = null;

    render() {
      const { lastIndex } = this.state;
      const listItems = this.props[name];
      return (
        <div
          ref={el => {
            this.scrollContainer = el;
          }}
          className="list-container"
        >
          <WrappedComponent
            listItemIds={listItems.slice(0, lastIndex + 10)}
            {...omit([name])(this.props)}
            listName={name}
          />
        </div>
      );
    }
  }

  ComponentWithListItems.displayName = `listOrganizer(${getDisplayName(
    WrappedComponent
  )})`;

  const mstp = pipe(
    prop('items'),
    pick([name])
  );

  return connect(mstp)(ComponentWithListItems);
};

export default listOrganizer;
