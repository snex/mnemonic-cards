import { createSlice } from '@reduxjs/toolkit';
import * as mnemonics from './mnemonic_functions.js';
import * as cards from './card_functions.js';

function _updateMnemonic(state, newEntropy) {
  state.mnemonic = mnemonics.entropyToMnemonic(
    newEntropy,
    state.coinType
  );
};

function _updateDeck(state, newEntropy) {
  state.deck = cards.entropyToCards(
    newEntropy,
    mnemonics.entropySize(state.coinType)
  );
};

const initialCoinType = 'bip39';
const initialEntropy  = mnemonics.initialEntropy(initialCoinType);
const initialMnemonic = mnemonics.entropyToMnemonic(initialEntropy, initialCoinType);
const initialDeck     = cards.entropyToCards(initialEntropy, mnemonics.entropySize(initialCoinType));

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    coinType: initialCoinType,
    entropy:  initialEntropy,
    mnemonic: initialMnemonic,
    deck:     initialDeck,
    invalidMnemonic: false
  },
  reducers: {
    updateCoinType: (state, action) => {
      state.coinType = action.payload;
      state.entropy = mnemonics.initialEntropy(action.payload);
    },
    updateMnemonic: (state, action) => {
      try {
        state.mnemonic = action.payload;
        const newEntropy = mnemonics.mnemonicToEntropy(action.payload, state.coinType);
        _updateDeck(state, newEntropy);
        state.invalidMnemonic = false;
      } catch (e) {
        if (e.message === 'Invalid mnemonic') {
          state.invalidMnemonic = true;
        }
      }
    },
    updateDeck: (state, action) => {
      state.deck = action.payload;
      const numBits = mnemonics.entropySize(state.coinType);
      const newEntropy = cards.cardsToEntropy(action.payload, numBits);
      state.entropy = newEntropy;
      _updateMnemonic(state, newEntropy);
    },
    swapReverse: (state, action) => {
      var card = state.deck.find(card => card.id == action.payload);
      card.reverse = !card.reverse;
      const numBits = mnemonics.entropySize(state.coinType);
      const newEntropy = cards.cardsToEntropy(state.deck, numBits);
      state.entropy = newEntropy;
      _updateMnemonic(state, newEntropy);
    }
  }
});

export const { updateCoinType, updateMnemonic, updateDeck, swapReverse } = appStateSlice.actions;
export default appStateSlice.reducer;
