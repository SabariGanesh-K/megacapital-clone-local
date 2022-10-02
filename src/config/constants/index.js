export const IDO_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0xb7BB0b6Ceb97cd0F482AADA8Cf09df14451f7300', //Ropsten IDO
  [process.env.REACT_APP_BSC_CHAINID]: '0x867C074445b148D07B1Ab02dD89c99bc1dF516f1', //BSC IDO
  [process.env.REACT_APP_LOCALHOST_CHAINID]: ''
};

export const LOCK_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0xdd151CEbdc9574686a408381732a5756D4A96819',
  [process.env.REACT_APP_BSC_CHAINID]: '0x7C1666fa1e6E3908618B4aE4cEB239f8ccb62C10',
  [process.env.REACT_APP_LOCALHOST_CHAINID]: ''
};

export const STAKING_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '',
  [process.env.REACT_APP_BSC_CHAINID]: '0x46A46CC79Fa25326185879f183958365495404Bf',
  [process.env.REACT_APP_LOCALHOST_CHAINID]: ''
};

export const ADMIN_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0x4984aefC02674b60D40ef57FAA158140AE69c0a8',
  [process.env.REACT_APP_BSC_CHAINID]: '0x4984aefC02674b60D40ef57FAA158140AE69c0a8',
  [process.env.REACT_APP_LOCALHOST_CHAINID]: ''
};


export const SCAN_URL = {
  '1': 'https://etherscan.io',
  '3': 'https://ropsten.etherscan.io',
  '42': 'https://kovan.etherscan.io',
  '56': 'https://bscscan.com',
  '97': 'https://testnet.bscscan.com'
};

export const CURRENCY_NAME = {
  '1': 'Ethereum',
  '3': 'TEthereum',
  '42': 'TEthereum',
  '56': 'BNB',
  '97': 'TBNB',
  '1337': 'Ethereum'
};

export const CURRENCY_SYMBOL = {
  '1': 'ETH',
  '3': 'tETH',
  '42': 'tETH',
  '56': 'BNB',
  '97': 'tBNB',
  '1337': 'ETH'
};
export const NETWORK_NAME = {
  '1': 'Ethereum Mainnet',
  '3': 'Ropsten Testnet',
  '42': 'Kovan Testnet',
  '56': 'Binance Smart Chain Mainnet',
  '97': 'Binance Smart Chain Testnet',
  '1337': 'localhost'
};
export const SWAP_URL = {
  '1': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '3': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '42': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '56': 'https://pancakeswap.finance/swap?outputCurrency=',
  '97': 'https://pancakeswap.finance/swap?outputCurrency='
};
export const DEXTOOL_URL = {
  '1': 'https://www.dextools.io/app/ether/pair-explorer/',
  '3': 'https://www.dextools.io/app/ether/pair-explorer/',
  '42': 'https://www.dextools.io/app/ether/pair-explorer/',
  '56': 'https://poocoin.app/tokens/',
  '97': 'https://poocoin.app/tokens/'
};
export const POOL_STATUS = [
  'Upcoming',
  'Inprogress',
  'Finished',
  'Ended',
  'Cancelled'
];
export const POOL_TIER = [
  'common',
  'gold',
  'platinum',
  'diamond'
];

export const DEALS_TAB = [
  { id: 0, isComingSoon: false,link: '/idodeals', title: 'IDO Deals' },
  { id: 1, isComingSoon: false, link: '/vcdeals', title: 'VC Deals' },
];

export const PROJECT_STATUS = {
  inProcess: 'IN-PROCESS',
  completed: 'COMPLETED'
};