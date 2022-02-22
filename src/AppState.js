import React from 'react';
import CoinSelect from './CoinSelect.js';
import Deck from './Deck.js';
import Mnemonic from './Mnemonic.js';
import * as mnemonics from './mnemonic_functions.js';
import * as cards from './card_functions.js';

function entropyTest() {
  const bip39Entropy = '23db8160a31d3e0dca3688ed941adbf3'
  const bip39Expected = 'cat swing flag economy stadium alone churn speed unique patch report train';
  const bip39Calculated = mnemonics.entropyToMnemonic(bip39Entropy, 'bip39');
  const bip39EntropyCalculated = mnemonics.mnemonicToEntropy(bip39Calculated, 'bip39');
  const bip39Deck = cards.entropyToCards(bip39Entropy, 128);
  const bip39CardsToEntropy = cards.cardsToEntropy(bip39Deck, 128);
  /*
  const xmrEntropy = '688b988f7de513383daa61f282807fe5aabe71a639aa58b9cb6beab6f5f80a0c';
  const xmrExpected = 'gesture mouth bids aglow tudor bawled insult listen jewels sugar calamity alley obvious sovereign jubilee legion oyster gumball using payment gumball giving sedan splendid giving';
  const xmrCalculated = mnemonics.entropyToMnemonic(xmrEntropy, 'xmr');
  const xmrEntropyCalculated = mnemonics.mnemonicToEntropy(xmrCalculated, 'xmr');
  const xmrDeck = cards.entropyToCards(xmrEntropy, 256);
  const xmrCardsToEntropy = cards.cardsToEntropy(xmrDeck, 256);
  */

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
  /*
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
  */
}

class AppState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinType: 'bip39',
      entropy:  mnemonics.initialEntropy('bip39'),
      mnemonic: mnemonics.entropyToMnemonic(mnemonics.initialEntropy('bip39'), 'bip39'),
      deck:     cards.entropyToCards(mnemonics.initialEntropy('bip39'), 128)
    };
    entropyTest();
  };

  updateCoinType(coinType) {
    var numBits;
    if (coinType === 'bip39') {
      numBits = 128;
    } else {
      numBits = 256;
    }
    this.setState({
      coinType: coinType,
      entropy:  mnemonics.initialEntropy(coinType),
      mnemonic: mnemonics.entropyToMnemonic(
                  mnemonics.initialEntropy(coinType),
                  coinType
                ),
      deck:     cards.entropyToCards(mnemonics.initialEntropy(coinType), numBits)
    });
  }

  render() {
    return (
      <div>
        <CoinSelect coinType={this.state.coinType} update={this.updateCoinType.bind(this)}/>
        <Mnemonic mnemonic={this.state.mnemonic}/>
        <Deck deck={this.state.deck}/>
      </div>
    )
  }
}

export default AppState;
