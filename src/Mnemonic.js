import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMnemonic } from './appStateSlice.js';

export default function Mnemonic() {
  const mnemonic = useSelector((state) => { return state.appState.mnemonic });
  const dispatch = useDispatch();

  return (
    <textarea
      cols="60"
      rows="5"
      value={mnemonic}
      onChange={ (e) => {
        console.log('changed text area to: ' + e.target.value);
        dispatch(updateMnemonic(e.target.value));
      }}
    />
  );
}
