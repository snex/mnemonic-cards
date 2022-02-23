import { createSlice } from '@reduxjs/toolkit';
import * as mnemonics from './mnemonic_functions.js';
import * as cards from './card_functions.js';

function _updateMnemonic(state, action) {
  state.mnemonic = mnemonics.entropyToMnemonic(
    cards.cardsToEntropy(
      state.deck,
      mnemonics.entropySize(state.coinType)
    ),
    state.coinType
  );
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    coinType: 'bip39',
    mnemonic: mnemonics.entropyToMnemonic(
      mnemonics.initialEntropy('bip39'),
      'bip39'
    ),
    deck: cards.entropyToCards(
      mnemonics.initialEntropy('bip39'),
      mnemonics.entropySize('bip39')
    )
  },
  reducers: {
    updateCoinType: (state, action) => {
      state.coinType = action.payload;
      state.mnemonic = mnemonics.entropyToMnemonic(
        mnemonics.initialEntropy(action.payload),
        action.payload
      );
      state.deck = cards.entropyToCards(
        mnemonics.initialEntropy(action.payload),
        mnemonics.entropySize(action.payload)
      );
    },
    updateMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    updateDeck: (state, action) => {
      state.deck = action.payload;
      _updateMnemonic(state, action);
    },
    swapReverse: (state, action) => {
      var card = state.deck.find(card => card.id == action.payload);

      card.reverse = !card.reverse;
      _updateMnemonic(state, action);
    }
  }
});

export const { updateCoinType, updateMnemonic, updateDeck, swapReverse } = appStateSlice.actions;
export default appStateSlice.reducer;
