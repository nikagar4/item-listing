import React from 'react';
import { connect } from 'react-redux';
import { keys, omit } from 'ramda';
import { resetActiveItem, saveActiveItem } from '../store/list-items/action';

class ListItemFull extends React.Component {
  state = {};

  handleInputChange = (event: SyntheticInputEvent<*>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  save = () => {
    const { activeItem, activeListName } = this.props;
    this.props.saveActiveItem(activeItem, activeListName, this.state);
  };

  close = () => {
    this.props.resetActiveItem();
  };

  render() {
    const { item } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-content">
          {keys(item).map(
            key =>
              key !== '_id' && (
                <div className="input-container" key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input
                    className="basic-input"
                    name={key}
                    defaultValue={item[key]}
                    id={key}
                    onChange={this.handleInputChange}
                  />
                </div>
              )
          )}

          <div>
            <button onClick={this.save}>Save</button>
            <button onClick={this.close}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => {
  const { activeListName, activeItem } = state.items;
  return {
    item: state.entities[activeListName][activeItem],
    activeListName,
    activeItem
  };
};

export default connect(
  mstp,
  { resetActiveItem, saveActiveItem }
)(ListItemFull);
