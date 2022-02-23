import * as crc32 from 'crc-32';
import * as common from './common_functions.js';
import english from './wordlists/xmr/english.json';

const ENTROPY_SIZE = 256;

function entropyToMnemonic(entropy) {
  const wordsLen = english.length;
  const chunks = entropy.match(/(.{1,8})/g);
  const wordList = chunks.map((chunk) => {
    var chunkArr = chunk.split('');
    var swappedChunk = [];
    
    for (var i = 0; i < chunkArr.length; i += 2) {
      swappedChunk.unshift(chunkArr[i+1]);
      swappedChunk.unshift(chunkArr[i]);
    }

    const chunkInt = parseInt(swappedChunk.join(''), 16);
    const word1Index = chunkInt % wordsLen;
    const word1 = english[word1Index];
    const word2Index = (Math.floor(chunkInt / wordsLen) + word1Index) % wordsLen;
    const word2 = english[word2Index];
    const word3Index = (Math.floor(Math.floor(chunkInt / wordsLen) / wordsLen) + word2Index) % wordsLen;
    const word3 = english[word3Index];
    return [word1, word2, word3];
  }).flat();
  const trimmedWordList = wordList.map((word) => {
    return Array.from(word.slice(0, 3)).map((chr) => {
      return chr.charCodeAt(0);
    });
  }).flat();
  const crcWord = wordList[(crc32.buf(trimmedWordList) >>> 0) % 24];
  return wordList.concat(crcWord).join(' ');
}

function mnemonicToEntropy(mnemonic) {
  const wordsLen = english.length;
  const chunks = common.eachSlice(mnemonic.split(' '), 3);
  const entropy = chunks.map((chunk) => {
    const word1Index = english.indexOf(chunk[0]);
    const word2Index = english.indexOf(chunk[1]);

    if (chunk[1] === undefined) {
      // this means we are looking at the checksum word. just escape
      return '';
    }

    const word3Index = english.indexOf(chunk[2]);
    const val = wordsLen * wordsLen * (((wordsLen - word2Index) + word3Index) % wordsLen) +
                wordsLen * (((wordsLen - word1Index) + word2Index) % wordsLen) +
                word1Index;
    const hexVal = common.lpad(val.toString(16), '0', 8);
    var swappedHexVal = [];

    for (var i = 0; i < hexVal.length; i += 2) {
      swappedHexVal.unshift(hexVal[i+1]);
      swappedHexVal.unshift(hexVal[i]);
    }

    return swappedHexVal.join('');
  }).join('');
  return entropy;
}

export { ENTROPY_SIZE, entropyToMnemonic, mnemonicToEntropy };
