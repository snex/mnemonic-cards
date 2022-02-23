import * as mnemonics from './mnemonic_functions.js';
import * as cards from './card_functions.js';

export default function EntropyTest() {
  const bip39Entropy = '23db8160a31d3e0dca3688ed941adbf3'
  const bip39Expected = 'cat swing flag economy stadium alone churn speed unique patch report train';
  const bip39Calculated = mnemonics.entropyToMnemonic(bip39Entropy, 'bip39');
  const bip39EntropyCalculated = mnemonics.mnemonicToEntropy(bip39Calculated, 'bip39');
  const bip39Deck = cards.entropyToCards(bip39Entropy, 128);
  const bip39CardsToEntropy = cards.cardsToEntropy(bip39Deck, 128);
  const xmrEntropy = '688b988f7de513383daa61f282807fe5aabe71a639aa58b9cb6beab6f5f80a0c';
  const xmrExpected = 'gesture mouth bids aglow tudor bawled insult listen jewels sugar calamity alley obvious sovereign jubilee legion oyster gumball using payment gumball giving sedan splendid giving';
  const xmrCalculated = mnemonics.entropyToMnemonic(xmrEntropy, 'xmr');
  const xmrEntropyCalculated = mnemonics.mnemonicToEntropy(xmrCalculated, 'xmr');
  const xmrDeck = cards.entropyToCards(xmrEntropy, 256);
  const xmrCardsToEntropy = cards.cardsToEntropy(xmrDeck, 256);

  console.assert(
    bip39Expected === bip39Calculated,
    {
      entropy:  bip39Entropy,
      expected: bip39Expected,
      actual:   bip39Calculated
    }
  );
  console.assert(
    bip39Entropy === bip39EntropyCalculated,
    {
      expected: bip39Entropy,
      actual:   bip39EntropyCalculated
    }
  );
  console.assert(
    bip39Entropy === bip39CardsToEntropy,
    {
      expected: bip39Entropy,
      actual:   bip39CardsToEntropy,
      deck:     bip39Deck
    }
  );
  console.assert(
    xmrExpected === xmrCalculated,
    {
      entropy:  xmrEntropy,
      expected: xmrExpected,
      actual:   xmrCalculated
    }
  );
  console.assert(
    xmrEntropy === xmrEntropyCalculated,
    {
      expected: xmrEntropy,
      actual:   xmrEntropyCalculated
    }
  );
  console.assert(
    xmrEntropy === xmrCardsToEntropy,
    {
      expected: xmrEntropy,
      actual:   xmrCardsToEntropy,
      deck:     xmrDeck
    }
  );

  return '';
}
