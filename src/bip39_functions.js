/* global BigInt */
import { sha256 } from 'js-sha256';
import * as common from './common_functions.js';
import english from './wordlists/bip39/english.json';

function checksum(entropy) {
  var packedEntropy = []
  for (var i = 0; i < entropy.length; i += 2) {
    var code = parseInt(entropy.substr(i, 2), 16);
    packedEntropy.push(code);
  }
  const hash = sha256(packedEntropy);
  const bits = entropy.length * 4;
  const cs = bits / 32;
  const hashbits = common.lpad(BigInt('0x' + hash).toString(2), '0', 256);
  const csum = hashbits.slice(0, cs);

  return csum;
}

function entropyToMnemonic(entropy) {
  var entropyBits = common.bytesToBinary(Array.from(entropy));
  const cs = checksum(entropy);
  entropyBits += cs;
  const chunks = entropyBits.match(/(.{1,11})/g);
  const words = chunks.map((binary) => {
    const index = common.binaryToByte(binary);
    return english[index];
  });

  return words.join(' ');
}

function mnemonicToEntropy(mnemonic) {
  const words = mnemonic.split(' ');
  var bits = words.map((word, i) => {
    const index = english.indexOf(word);
    if (index === -1) {
      throw new Error('Invalid mnemonic');
    }

    return common.lpad(index.toString(2), '0', 11);
  }).join('');
  bits = bits.slice(0, -4);

  return BigInt('0b' + bits).toString(16);
}

export { entropyToMnemonic, mnemonicToEntropy };
