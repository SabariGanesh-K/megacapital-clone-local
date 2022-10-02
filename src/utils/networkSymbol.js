import imageURL from './imageURL';

export const getNetworkSymbol = (chainId = 0, getName = false) => {
  if (getName) {
    if (chainId === 97) return 'Binance';
    else return '';
  }

  if (chainId === 97) return 'BNB';
  if (chainId === 3) return 'ETH';
  else return 'Invalid chain id';
};

const CHAINS_IMAGES = {
  1: imageURL('./chains/eth.png'),
  97: imageURL('./chains/bsc.png'),
  250: imageURL('./chains/ftm.png'),
  43114: imageURL('./chains/avax.png'),
  137: imageURL('./chains/polygon.png')
};

export const getNetworkImage = (chainId = 0) => {
  return CHAINS_IMAGES[chainId];
};

