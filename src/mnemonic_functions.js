import * as bip39 from './bip39_functions.js';
import * as xmr from './xmr_functions.js';

function initialEntropy(coinType) {
  switch (coinType) {
    case 'bip39':
      //return '00000000000000000000000000000000';
      return '23db8160a31d3e0dca3688ed941adbf3';
    case 'xmr':
      return '0000000000000000000000000000000000000000000000000000000000000000';
      //return '688b988f7de513383daa61f282807fe5aabe71a639aa58b9cb6beab6f5f80a0c';
    default:
      console.log('unknown coinType: ' + coinType);
      return ''
  }
}

function entropyToMnemonic(entropy, coinType) {
  switch (coinType) {
    case 'bip39':
      return bip39.entropyToMnemonic(entropy);
    case 'xmr':
      return xmr.entropyToMnemonic(entropy);
    default:
      console.log('unknown coinType: ' + coinType);
      return '';
  }
}

function mnemonicToEntropy(mnemonic, coinType) {
  switch (coinType) {
    case 'bip39':
      return bip39.mnemonicToEntropy(mnemonic);
    case 'xmr':
      return xmr.mnemonicToEntropy(mnemonic);
    default:
      console.log('unknown coinType: ' + coinType);
      return '';
  }
}

export { initialEntropy, entropyToMnemonic, mnemonicToEntropy };
