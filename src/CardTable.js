import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { updateDeck } from './appStateSlice.js';
import Card from './Card.js';

export default function CardTable() {
  const items = useSelector((state) => state.appState.deck);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const dispatch = useDispatch();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={rectSortingStrategy}
      >
        <Grid>
          {items.map(({id}) => (
            <Card key={id} id={id}/>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(({id}) => id === active.id);
      const newIndex = items.findIndex(({id}) => id === over.id);
      const newDeck = arrayMove(items, oldIndex, newIndex);

      dispatch(updateDeck(arrayMove(items, oldIndex, newIndex)));
    };
  };
};

function Grid({children}) {
  return (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridGap: 10
      }}
    >
      {children}
    </div>
  );
};
