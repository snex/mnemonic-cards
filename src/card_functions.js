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
  var pile = [];
  var bits = '';

  cards.reverse().forEach(card => {
    pile.push(card.card);

    if (card.reverse) {
      pile.push(card.card.substr(0, card.card.indexOf('_reverse')));
    } else {
      pile.push(card.card + '_reverse');
    }

    pile = deck.filter(x => pile.indexOf(x) !== -1);
    console.log(pile);
    const bitsAvail = Math.floor(Math.log2(pile.length));
    console.log('bitsAvail: ' + bitsAvail);
    const cardIndex = pile.indexOf(card.card);
    console.log('cardIndex: ' + cardIndex);
    const cardIndexBits = common.lpad(cardIndex.toString(2), '0', bitsAvail);
    console.log('cardIndexBits: ' + cardIndexBits);
    bits = bits + cardIndexBits;
    console.log('bits: ' + bits);
  });

  console.log(bits);
  console.log(bits.length);

  if (bits.length > numBits) {
    bits = bits.slice(bits.length - numBits);
  } else {
    bits = common.lpad(bits, '0', numBits);
  }
  console.log('after adjust numBits');
  console.log(bits);
  console.log(bits.length);
  console.log(parseInt(bits, 2).toString(16));
  return parseInt(bits, 2).toString(16);
};

function entropyToCards(entropy, numBits) {
  var deck = newDeck();
  var cards = [];
  const entropyBits = common.lpad(BigInt('0x' + entropy).toString(2), '0', numBits);
  console.log(entropyBits);
  var enumerator = 0;

  while (deck.length > 0) {
    const bitsAvail = Math.floor(Math.log2(deck.length));
    const bits = entropyBits.substr(enumerator, bitsAvail) || '0';
    const cardIndex = parseInt(bits, 2);
    var card = deck[cardIndex];
    var reverseCard = '';

    if (card.match(/_reverse/)) {
      reverseCard = card.substr(0, card.indexOf('_reverse'));
      cards.push({
        card:    reverseCard,
        reverse: true
      });
    } else {
      reverseCard = card + '_reverse';
      cards.push({
        card:    card,
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
