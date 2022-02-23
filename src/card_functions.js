/* global BigInt */
import * as cardNames from './CardNames.js';
import * as common from './common_functions.js';

function newDeck() {
  return cardNames.CARD_NAMES.slice().concat(
    cardNames.CARD_NAMES.map((x) => { return x + '_reverse'; })
  );
};

function cardsToEntropy(cards, numBits) {
  const deck = newDeck();
  var cardsCopy = cards.slice();
  var pile = [];
  var bits = [];

  cardsCopy.reverse().forEach(card => {
    var cardName = '';
    pile.push(card.id);
    pile.push(card.id + '_reverse');

    if (card.reverse) {
      cardName = card.id + '_reverse';
    } else {
      cardName = card.id
    }

    pile = deck.filter(x => pile.indexOf(x) !== -1);
    const bitsAvail = Math.floor(Math.log2(pile.length));
    const cardIndex = pile.indexOf(cardName);
    const cardIndexBits = common.lpad(cardIndex.toString(2), '0', bitsAvail);
    bits.push(cardIndexBits);
  });

  bits.reverse();
  var bitsStr = '';
  var bitsUsed = 0;

  bits.forEach(bitChunk => {
    // this is to handle the BIP39 checksum bits at the end
    if (bitsUsed + bitChunk.length > numBits) {
      bitsStr += bitChunk.slice(bitChunk.length - (numBits - bitsUsed));
      bitsUsed += bitChunk.length;
    } else {
      bitsStr += bitChunk;
      bitsUsed += bitChunk.length;
    }
  });

  if (bitsStr.length > numBits) {
    bitsStr = bitsStr.slice(0, numBits);
  } else {
    bitsStr = common.lpad(bitsStr, '0', numBits);
  }
  return common.lpad(BigInt('0b' + bitsStr).toString(16), '0', numBits / 4);
};

function entropyToCards(entropy, numBits) {
  var deck = newDeck();
  var cards = [];
  const entropyBits = common.lpad(BigInt('0x' + entropy).toString(2), '0', numBits);
  var enumerator = 0;

  while (deck.length > 0) {
    const bitsAvail = Math.floor(Math.log2(deck.length));
    const bits = common.lpad(entropyBits.substr(enumerator, bitsAvail) || '0', '0', bitsAvail);
    const cardIndex = parseInt(bits, 2);
    var card = deck[cardIndex];
    var reverseCard = '';

    if (card.match(/_reverse/)) {
      reverseCard = card.substr(0, card.indexOf('_reverse'));
      cards.push({
        id:      reverseCard,
        reverse: true
      });
    } else {
      reverseCard = card + '_reverse';
      cards.push({
        id:      card,
        reverse: false
      });
    }

    deck.splice(cardIndex, 1);
    const reverseCardIndex = deck.indexOf(reverseCard);
    deck.splice(reverseCardIndex, 1);
    enumerator += bitsAvail;
  }

  return cards;
};

export { cardsToEntropy, entropyToCards }
