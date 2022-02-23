import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMnemonic } from './appStateSlice.js';

export default function Mnemonic() {
  const mnemonic = useSelector((state) => { return state.appState.mnemonic });
  const invalidMnemonic = useSelector((state) => { return state.appState.invalidMnemonic });
  const dispatch = useDispatch();

  return (
    <div>
      <textarea
        cols="60"
        rows="5"
        value={mnemonic}
        onChange={ (e) => {
          dispatch(updateMnemonic(e.target.value));
        }}
      />
      <div
        hidden={!invalidMnemonic}
        style={{
          color:      'red',
          fontWeight: 'bold'
        }}
      >
        Invalid Mnemonic!
      </div>
    </div>
  );
}
