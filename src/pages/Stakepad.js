import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import ViewAllPools from 'components/ViewAllPools';
import PoolsCardPhone from 'components/PoolsCardPhone';
// material
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useStakingContract, useTokenContract } from '../hooks/useContract';
// hooks
// components
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden';
import axios from '../utils/axios';
import { useSnackbar } from 'notistack';
import { imageURL } from '../utils';
// ----------------------------------------------------------------------

export default function Stakepad() {
  return (
    <Page title="Megacapital" style={{ backgroundColor: '#171819' }}>
      <Grid>
        <MHidden width="mdDown">
          <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop="30px">
            <Grid align="center" justifyContent="center">
              {/*<Box component="a" href="#">*/}
              {/*  <Button class="btn btn-light text-info mx-1">Stakepad</Button>*/}
              {/*</Box>*/}
              <button
                className="btn btn-dark text-info mx-1"
                onClick={() => window.scrollTo({ left: 0, top: 580, behavior: 'smooth' })}
              >
                Staking Pools
              </button>
              <a href="#farmingSection">
                <button className="btn btn-dark text-info mx-1">Farming Pools</button>
              </a>
            </Grid>
            <Grid align="center" justifyContent="center" marginTop="30px">
              <Box component="p" fontSize="16px" style={{ color: 'white' }}>
                Earn high yield by staking mega capital token or join other
                <br />
                attractive staking pools from IDO projects
              </Box>
            </Grid>
            {/*<Grid marginTop="50px">
              <Grid container position="relative" display="flex" marginBottom="60px">
                <Box fontSize="34px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
                  Stakepad
                </Box>
                <Box fontSize="24px" sx={{ position: 'absolute', right: '10px' }}>
                  <ViewAllPools to="#" title="View All Pools" />
                </Box>
              </Grid>
              <StakePadCard></StakePadCard>
              <StakePadCard></StakePadCard>
              <StakePadCard></StakePadCard>
            </Grid>*/}
            <StakingPool></StakingPool>
            <FarmingPools></FarmingPools>
          </Grid>
        </MHidden>
        <MHidden width="mdUp">
          <Grid paddingLeft={'7%'} paddingRight={'7%'} paddingTop="30px">
            <Grid color="#56C5FF" textAlign="center" fontSize={20} marginBottom="20px">
              <Box
                component="button"
                marginRight="10px"
                padding="5px"
                backgroundColor="#232323"
                color="#56C5FF"
                border="none"
                borderRadius={0.5}
                fontSize={13}
                onClick={() => window.scrollTo({ left: 0, top: 1280, behavior: 'smooth' })}
              >
                Stakepad
              </Box>
              <Box
                component="button"
                marginRight="10px"
                padding="5px"
                backgroundColor="#232323"
                color="#56C5FF"
                border="none"
                borderRadius={0.5}
                fontSize={13}
                onClick={() => window.scrollTo({ left: 0, top: 220, behavior: 'smooth' })}
              >
                Staking Pools
              </Box>
              <Box
                component="button"
                padding="5px"
                backgroundColor="#232323"
                color="#56C5FF"
                border="none"
                borderRadius={0.5}
                fontSize={13}
                onClick={() => window.scrollTo({ left: 0, top: 550, behavior: 'smooth' })}
              >
                Farming Pools
              </Box>
            </Grid>
            <Grid align="center" textAlign="center" color="white">
              Earn high yield by staking mega capital token or join other attractive staking pools from IDO projects
              check word file please
            </Grid>
            <StakingPool />
            {/*<StakingPool title="Farming Pool" />*/}
          </Grid>
        </MHidden>
      </Grid>
    </Page>
  );
}

export function StakingPool(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  // const [isLoading, setIsLoading] = useState(true);
  const [pools, SetPools] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/bsc/stake`, {});
        if (response.data) {
          SetPools(response.data.data);
        } else {
          enqueueSnackbar('failed', {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!', {
          variant: 'error'
        });
      }
    })();
  }, [account, network]);

  return (
    <>
      <MHidden width="mdDown">
        <Grid marginTop="50px">
          {props?.isHomePage ? null : (
            <Grid container position="relative" marginBottom="60px">
              <Box fontSize="24px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
                Staking Pools
              </Box>
              <Box fontSize="24px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
                <ViewAllPools to="#" title="View All Pools" />
              </Box>
            </Grid>
          )}
          {pools.map((item, key) => (
            <PoolBox pool={item} />
          ))}
        </Grid>
      </MHidden>
      <MHidden width="mdUp">
        <Grid marginTop="50px">
          <Grid container position="relative" marginBottom="60px">
            <Box fontSize="16px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
              {props?.title ? props?.title : 'Staking Pools'}
            </Box>
            <Box fontSize="16px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
              <ViewAllPools to="#" title="View All Pools" />
            </Box>
          </Grid>
          {pools.map((item, key) => (
            <PoolsCardPhone pool={item} />
          ))}
        </Grid>
      </MHidden>
    </>
  );
}

function PoolBox(props) {
  const navigate = useNavigate();

  const { pool } = props;
  const { library, account } = useActiveWeb3React();
  const [loader, setLoader] = useState(false);
  const signer = library?.getSigner();
  const network = useSelector((state) => state.network.chainId);
  console.log('token ', pool.tokenAddress);
  const tokenContract = useTokenContract(pool.tokenAddress);
  const stakingContract = useStakingContract(pool.address);
  const [data, setData] = useState({
    token_decimal: 0,
    wallet_balance: 0,
    staked: 0,
    rewards: 0,
    staking_amount: 0,
    unstaking_amount: 0
  });
  const [openedPool, setOpenedPool] = useState(false);
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    // let unmounted = false;
    if (openedPool) {
      console.log(pool.tokenName);

      (async () => {
        setProcessing(true);
        try {
          const wallet_balance = await tokenContract.balanceOf(account);
          const decimals = await tokenContract.decimals();
          const staked = await stakingContract.balances(account);
          const rewards = await stakingContract.earned(account);
          console.log('balance', wallet_balance);
          setData({
            ...data,
            token_decimal: decimals,
            wallet_balance: formatUnits(wallet_balance, decimals),
            staked: formatUnits(staked, decimals),
            rewards: formatUnits(rewards, decimals)
          });
          setLoader(true);
        } catch (error) {
          console.log(error);
          setLoader(true);
        }
        setProcessing(false);
      })();
    }
    // return () => {
    //   unmounted = true;
    // };
  }, [account, tokenContract, pool, loader, openedPool]);

  const toggleOpenedPool = () => setOpenedPool((prevState) => !prevState);

  const handleStake = async () => {
    var bignumber_staking_amount = parseUnits(String(data.staking_amount), data.token_decimal);
    // check allowance
    try {
      console.log('asd', pool.address);
      console.log('asdasdasd', bignumber_staking_amount);

      const allowance = await tokenContract.allowance(account, pool.address);
      console.log('asdasdasd', allowance.toString());
      if (allowance.lt(bignumber_staking_amount)) {
        const tx = await tokenContract.approve(pool.address, bignumber_staking_amount);
        let result = await tx.wait();
        if (result.confirmations > 1) {
          const tx = await stakingContract.stake(bignumber_staking_amount);
          await tx.wait();
          navigate(`/stakepad`);
        }
      } else {
        const tx = await stakingContract.stake(bignumber_staking_amount);
        await tx.wait();
        navigate(`/stakepad`);
      }
    } catch (err) {
      console.log(err);
      return;
    }

    // stake
    try {
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleUnstake = async () => {
    try {
      const tx = await stakingContract.withdraw(parseUnits(String(data.unstaking_amount), data.token_decimal));
      await tx.wait();
      navigate(`/stakepad`);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const handleHarvest = async () => {
    try {
      const tx = await stakingContract.getReward();
      await tx.wait();
      navigate(`/stakepad`);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <>
      <Box
        borderRadius={1}
        sx={{ cursor: 'pointer', bgcolor: '#272727', p: '10px', marginBottom: '15px' }}
        onClick={toggleOpenedPool}
      >
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box component="img" src={imageURL('pool-logo.png')} sx={{ width: '50px', marginRight: '10px' }} />
              <Box fontSize="20px" sx={{ marginTop: '10px', color: 'white' }}>
                {pool.tokenName}
              </Box>
            </Box>
          </Grid>
          <Grid container item sm={8} display="flex" justifyContent="right" direction="row">
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}> Duration</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                1 Month
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}>Staked</Box>
              <Box sx={{ fontSize: 20, minWidth: '3em' }} color="white" gutterBottom>
                {pool.tvl}
              </Box>
            </Grid>
            <Grid item sx={{ marginRight: '20px' }}>
              <Box sx={{ fontSize: 15, color: 'white' }}>bonus</Box>
              <Box sx={{ fontSize: 20 }} color="white" gutterBottom>
                {pool.rewardRate}%
              </Box>
            </Grid>
            {/* <Grid item sx={{ marginRight: '20px' }}>
              <button class="btn btn-info text-light mt-2 mx-4">Discover</button>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
      {openedPool &&
        (processing ? (
          <Grid
            container
            borderRadius={1}
            bgcolor={'#232323'}
            marginTop="20px"
            marginBottom="20px"
            marginLeft="0px"
            padding="20px"
            alignItems="center"
            justifyContent="center"
            columnSpacing={4}
            rowSpacing={2}
            width="100%"
          >
            {/* <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} /> */}
            <HashLoader color="#59f1f6" size={30} />
          </Grid>
        ) : (
          <Grid
            container
            borderRadius={1}
            bgcolor={'#232323'}
            marginTop="20px"
            marginBottom="20px"
            marginLeft="0px"
            columnSpacing={4}
            rowSpacing={2}
            width="100%"
          >
            <Grid sm="6" item color="#56C5FF">
              your {pool.tokenSymbol} balance : {data.wallet_balance}
            </Grid>
            <Grid sm="6" item color="#56C5FF">
              your staked : {data.staked}
            </Grid>
            <Grid container item sm="6" display="flex" position="relative" height="60px">
              <Box
                component="input"
                type="number"
                padding="5px"
                width="100%"
                height="50px"
                placeholder="0.0"
                style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                value={data.staking_amount}
                onChange={(e) => setData({ ...data, staking_amount: e.target.value })}
              ></Box>
              <Box
                component="button"
                type="number"
                position="absolute"
                right="7px"
                top="20px"
                style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                color="white"
                paddingLeft="20px"
                paddingRight="20px"
                onClick={() => setData({ ...data, staking_amount: data.wallet_balance })}
              >
                MAX
              </Box>
            </Grid>
            <Grid container item sm="6" display="flex" position="relative" height="60px">
              <Box
                component="input"
                padding="5px"
                width="99%"
                height="50px"
                placeholder="0.0"
                style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                value={data.unstaking_amount}
                onChange={(e) => setData({ ...data, unstaking_amount: e.target.value })}
              ></Box>
              <Box
                component="button"
                position="absolute"
                right="17px"
                top="20px"
                style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                color="white"
                paddingLeft="20px"
                paddingRight="20px"
                onClick={() => setData({ ...data, unstaking_amount: data.staked })}
              >
                MAX
              </Box>
            </Grid>
            <Grid container item direction="row" marginTop="10px">
              <Button class="btn btn-info mx-1 px-4 text-light" onClick={() => handleStake()}>
                STAKE
              </Button>
              <Button class="btn btn-outline-secondary mx-1 px-4 text-info" onClick={() => handleUnstake()}>
                UNSTAKE
              </Button>
            </Grid>
            <Grid item>
              <Button
                class="btn btn-outline-secondary mx-1 px-4 mt-2 text-light"
                width="100px"
                onClick={() => handleHarvest()}
              >
                HARVEST {data.rewards} {pool.tokenSymbol}
              </Button>
              <Box marginTop="8px">Harvesting will reset the lock time</Box>
            </Grid>
            <Grid container item direction="row" marginTop="10px">
              <Grid item sm="2">
                <Box color="white">DEPOSIT FEE</Box>
              </Grid>
              <Grid item color="#56C5FF" sm="3.5" justifyContent="right" display="flex">
                None
              </Grid>
            </Grid>
            <Grid container item direction="row" marginTop="10px">
              <Grid sm="2">
                <Box color="white">WITHDRAW FEE</Box>
              </Grid>
              <Grid sm="3.5" color="#56C5FF" justifyContent="right" display="flex">
                <Box>None</Box>
              </Grid>
            </Grid>
            <Grid container item direction="row" marginTop="10px">
              <Grid sm="2">
                <Box color="white">PERFORMANCE FEE TIME</Box>
              </Grid>
              <Grid color="#56C5FF" sm="3.5" justifyContent="right" display="flex">
                <Box>None</Box>
              </Grid>
            </Grid>
            <Grid container item direction="row" marginTop="10px">
              <Grid sm="2">
                <Box color="white">LOCK TIME</Box>
              </Grid>
              <Grid color="#56C5FF" sm="3.5" justifyContent="right" display="flex">
                <Box>30 Days</Box>
              </Grid>
            </Grid>
            <Grid item color="#56C5FF" marginBottom="25px" marginTop="10px">
              Buy Token
            </Grid>
          </Grid>
        ))}
    </>
  );
}

function FarmingPools() {
  const [pools, SetPools] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { account, network } = useActiveWeb3React();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/bsc/stake`, {});
        if (response.data) {
          SetPools(response.data.data);
        } else {
          enqueueSnackbar('failed', {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!', {
          variant: 'error'
        });
      }
    })();
  }, [account, network]);
  return (
    <Grid marginTop="50px" id="farmingSection">
      <Grid container position="relative" marginBottom="60px">
        <Box fontSize="24px" sx={{ position: 'absolute', left: '10px', color: '#56C5FF' }}>
          Farming Pools
        </Box>
        <Box fontSize="24px" sx={{ position: 'absolute', right: '10px', color: 'white' }}>
          <ViewAllPools to="#" title="View All Pools" />
        </Box>
      </Grid>

      <Grid item container justifyContent="center">
        <Typography variant="h3">Coming Soon</Typography>
      </Grid>

      {/*{pools.map((item, key) => (*/}
      {/*  <PoolBox key={key} pool={item} />*/}
      {/*))}*/}
    </Grid>
  );
}
