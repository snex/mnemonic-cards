import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCoinType } from './appStateSlice.js';

export default function CoinSelect() {
  const coinType = useSelector((state) => state.appState.coinType);
  const dispatch = useDispatch();

  return (
    <div>
      <select
        name="coin"
        value={coinType}
        onChange={ (e) => {
          dispatch(updateCoinType(e.target.value));
        }}
      >
        <option value="bip39">BIP39 (Bitcoin/ETH)</option>
        <option value="xmr">Monero</option>
      </select>
    </div>
  );
}
