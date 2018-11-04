import React from 'react';
import ListContainer from './components/ListContainer';
import listOrganizer from './hocs/listOrganizer';
import withActiveItem from './hocs/withActiveItem';
import './App.css';

const App = () => {
  const lists = [
    'items1',
    'items2',
    'items3',
    'items4',
    'items5',
    'items6',
    'items7',
    'items8',
    'items9'
  ];
  const listContainers = lists.map(name => listOrganizer(name)(ListContainer));

  return (
    <div className="App">
      <div className="container">
        {listContainers.map((Component, index) => (
          <Component key={index} />
        ))}
      </div>
    </div>
  );
};

export default withActiveItem(App);
