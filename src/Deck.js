import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Card  from './Card.js';
import * as cardNames from './CardNames.js';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SortableItem = SortableElement(({value}) =>
  <li>
    <Card key={value.card} card={value.card} reverse={value.reverse}/>
  </li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      listStyleType: 'none'
    }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${value.card}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Deck extends React.Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: reorder(items, oldIndex, newIndex),
    }));
  };

  render() {
    return <SortableList items={this.props.deck} onSortEnd={this.onSortEnd} axis="xy"/>;
  }
}

export default Deck;
