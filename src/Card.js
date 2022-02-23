import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { swapReverse } from './appStateSlice.js';

export default function Card(props) {
  const thisCard = props.id;
  const reverse = useSelector((state) => {
    return state.appState.deck.find(card => card.id === thisCard).reverse
  });
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: thisCard});
  const style = {
    width:     84,
    height:    122,
    transform: CSS.Transform.toString(transform),
    transition
  }
  const drawBack = () => {
    if (!reverse) {
      return '';
    }
    return (
      <use
        href="svg-cards.svg#alternate-back"
        transform="scale(0.5)"
        clipPath="url(#triangle)"
      />
    )
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <svg
        ref={setNodeRef}
        width="84"
        height="122"
        onDoubleClick={ (e)=> {
          dispatch(swapReverse(thisCard));
          e.preventDefault();
        }}
      >
        <clipPath id="triangle">
          <polygon points="168,0 168,244 0,244" fill="red"/>
        </clipPath>
        <use
          href={"svg-cards.svg#" + thisCard}
          transform="scale(0.5)"
        />
        {drawBack()}
      </svg>
    </div>
  )
}
