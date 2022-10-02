import { useEffect } from "react";
// routes
import Router from 'router';
// theme
import ThemeConfig from './theme';
// components
// import Settings from './components/settings';
// import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import { useDispatch, useSelector } from "react-redux";
import { setPools, setPool } from "./redux/slices/pools";
import useEagerConnect from "./hooks/useEagerConnect";
import { switchNetwork } from "./redux/slices/network";
import { BigNumber } from "ethers";
// import { addLiquidity, removeLiquidity } from "./redux/slices/liquidityLocks";
// import { addToken, removeToken } from "./redux/slices/tokenLocks";
import { useInactiveListener } from './hooks/useInactiveListener'
import { formatEther, parseEther, formatUnits } from '@ethersproject/units';
// import io from "socket.io-client";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { setupNetwork } from 'utils/wallet';

// ----------------------------------------------------------------------

export default function App() {
  const { chainId } = useActiveWeb3React();  
  // const aaa = useActiveWeb3React();  
  const poolsStore = useSelector((state) => state.pools.pools);
  const poolStore = useSelector((state) => state.pools.pool);
  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();

  useEagerConnect();
  useInactiveListener();
  
  const provider = window.ethereum;
  useEffect(() => {
    if(!chainId){
      if(provider && provider.chainId && (Number(provider.chainId) !== Number(process.env.REACT_APP_ETHEREUM_CHAINID) && Number(provider.chainId) !== Number(process.env.REACT_APP_BSC_CHAINID))){    
        setupNetwork(process.env.REACT_APP_BSC_CHAINID);
      }else if(provider && provider.chainId && Number(network) !== provider.chainId){    
        dispatch(switchNetwork(provider.chainId));
      }
    }
  }, [dispatch, chainId, network, provider]);
 

  useEffect(() => {
    if (provider)
      provider.on('chainChanged', (id) => {
        if ((Number(id) === Number(process.env.REACT_APP_ETHEREUM_CHAINID) || Number(id) === Number(process.env.REACT_APP_BSC_CHAINID)))
          dispatch(switchNetwork(id));
      });
  }, [dispatch, provider]);
  // useEffect(() => {    
  //   // const socket = io(process.env.REACT_APP_SERVER_URL);
  //   const funcLogPoolExtraData = ({ pool, _extraData, ipfs }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.ipfs = ipfs;
  //       pool_find.extraData = _extraData;
  //       dispatch(setPools(pools_tmp));
  //     }
  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.ipfs = ipfs;
  //       pool_find.extraData = _extraData;
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   const funcLogPoolKYCUpdate = ({ pool, kyc }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.kyc = kyc;
  //       dispatch(setPools(pools_tmp));
  //     }
  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.kyc = kyc;
  //       dispatch(setPool(pool_find));
  //     }
  //   };

  //   const funcLogPoolAuditUpdate = ({ pool, audit, auditLink }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.audit = audit;
  //       pool_find.auditLink = auditLink;

  //       dispatch(setPools(pools_tmp));
  //     }
  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.audit = audit;
  //       pool_find.auditLink = auditLink;
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   const funcLogDeposit = ({ pool, participant, amount }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));

  //     if (pool_find) {
  //       pool_find.weiRaised = Number(formatEther(parseEther(String(pool_find.weiRaised)).add(amount)));
  //       let participants = pool_find.participantsAddresses;
  //       let isExisted = false;
  //       for (let i = 0; i < participants.length; i++) {
  //         if (participants[i] === participant) {
  //           isExisted = true;
  //           break;
  //         }
  //       }
  //       if (!isExisted) {
  //         participants.push(participant);
  //       }
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.weiRaised = Number(formatEther(parseEther(String(pool_find.weiRaised)).add(amount)));
  //       let participants = pool_find.participantsAddresses;
  //       let isExisted = false;
  //       for (let i = 0; i < participants.length; i++) {
  //         if (participants[i] === participant) {
  //           isExisted = true;
  //           break;
  //         }
  //       }
  //       if (!isExisted) {
  //         participants.push(participant);
  //       }
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   const funcLogPoolStatusChanged = ({ pool, status }) => {
  //     console.log(pool);
  //     console.log(status);
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.status = BigNumber.from(status).toString(10);
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       console.log(pool);
  //       console.log(status);
  //       pool_find.status = BigNumber.from(status).toString(10);
  //       console.log(pool_find.status);
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   // const funcLogPoolRemoved = (address) => {
  //   //   const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //   //   let pool_find = pools_tmp.findIndex(ele => ele.address === address);
  //   //   if (pool_find > -1) {
  //   //     pools_tmp.splice(pool, 1);
  //   //     dispatch(setPools(pools_tmp));
  //   //   }

  //   //   pool_find = JSON.parse(JSON.stringify(poolStore));
  //   //   if (pool_find.address === address) {
  //   //     pool_find = {};
  //   //     dispatch(setPool(pool_find));
  //   //   }
  //   // };
  //   const funcLogAddressWhitelisted = ({ pool_address, whitelistedAddresses }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool_address));
  //     if (pool_find) {
  //       for (let ele of whitelistedAddresses) {
  //         if (!pool_find.whiteLists.find(ele1 => ele1 === ele)) {
  //           pool_find.whiteLists.push(ele);
  //         }
  //       }
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool_address)) {
  //       for (let ele of whitelistedAddresses) {
  //         if (!pool_find.whiteLists.find(ele1 => String(ele1) === String(ele))) {
  //           pool_find.whiteLists.push(ele);
  //         }
  //       }
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   const funcLogUpdateWhitelistable = ({ pool, whitelistable }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.whitelistable = whitelistable;
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.whitelistable = whitelistable;
  //       dispatch(setPool(pool_find));
  //     }
  //   };

  //   const funcLogPoolTierUpdate = ({ pool, _tier }) => {
  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(pool));
  //     if (pool_find) {
  //       pool_find.tier = _tier;
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));
  //     if (pool_find.address === String(pool)) {
  //       pool_find.tier = _tier;
  //       dispatch(setPool(pool_find));
  //     }
  //   };
  //   const funcLogPoolUnlockVestingToken = ({ _pool, unlockedVestingAmount }) => {

  //     const pools_tmp = JSON.parse(JSON.stringify(poolsStore));
  //     let pool_find = pools_tmp.find(ele => ele.address === String(_pool));
  //     if (pool_find) {
  //       pool_find.teamVesting_unlocked_amount = Number(formatUnits(unlockedVestingAmount, pool_find.decimals));
  //       dispatch(setPools(pools_tmp));
  //     }

  //     pool_find = JSON.parse(JSON.stringify(poolStore));

  //     if (pool_find.address === String(_pool)) {
  //       pool_find.teamVesting_unlocked_amount = Number(formatUnits(unlockedVestingAmount, pool_find.decimals));
  //       dispatch(setPool(pool_find));
  //     }
  //   };

  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolExtraData`, funcLogPoolExtraData);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolKYCUpdate`, funcLogPoolKYCUpdate);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolAuditUpdate`, funcLogPoolAuditUpdate);

  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogDeposit`, funcLogDeposit);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolStatusChanged`, funcLogPoolStatusChanged);
  //   // socket.on(`launchpad:${network===Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolRemoved`, funcLogPoolRemoved);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogAddressWhitelisted`, funcLogAddressWhitelisted);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogUpdateWhitelistable`, funcLogUpdateWhitelistable);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolTierUpdate`, funcLogPoolTierUpdate);
  //   socket.on(`launchpad:${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}:LogPoolUnlockVestingToken`, funcLogPoolUnlockVestingToken);
  //   return () => {
  //     if (socket) socket.disconnect();
  //   }
  // }, [dispatch, network, poolsStore, poolStore]);
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        {/* <Settings /> */}
        {/* <ScrollToTop /> */}
        <Router />
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
