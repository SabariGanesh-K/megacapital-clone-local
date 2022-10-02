import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import StakePadCard from 'components/StakePadCard';
// material
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';

import { getPools } from 'redux/slices/pools';
import { SearchContext } from 'contexts/SearchContext';
import { useIDOContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import DashboardFooter from './DashboardFooter';

// ----------------------------------------------------------------------

export default function FarmingPool() {
  const { themeStretch } = useSettings();
  const { hash } = useLocation();

  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const idoContract = useIDOContract();

  const [search, setSearch] = useContext(SearchContext);

  //Pagination part
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState(-1);
  const [sort, setSort] = useState('createdAt');
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);
  const pools = useSelector((state) => state.pools.pools);
  const totalPage = useSelector((state) => state.pools.totalPage);
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, page, search, tab, sort, filter, account));
      if (!unmounted) setIsLoading(false);
    })();
    return () => (unmounted = true);
  }, [account, dispatch, filter, network, page, search, sort, tab]);

  useEffect(() => {
    switch (hash) {
      case '#my-contributions':
        setTab(1);
        break;
      case '#my-alarms':
        setTab(2);
        break;
      case '#my-presales':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [hash]);

  return (
    <Page title="Megacapital">
      {/* <Container maxWidth='md'> */}
      <Grid>
        <Grid paddingLeft={'7%'} paddingRight={'7%'}>
          <Grid align="center" justifyContent="center">
            <Box component="a" href="/stakepad">
              <Button class="btn btn-dark text-info mx-1">Stakepad</Button>
            </Box>
            <a href="#" class="btn btn-dark text-info mx-1">
              Staking Pools
            </a>
            <a href="/farmingpool" class="btn btn-light text-info mx-1">
              Farming Pools
            </a>
          </Grid>
          <Grid align="center" justifyContent="center" marginTop="30px">
            <Box component="h2" class="text-info">
              STAKING MEGA CAPITAL TOKEN
            </Box>
            <Box component="h5">
              Earn high yield by staking mega capital token or join other
              <br />
              attractive staking pools from IDO projects
            </Box>
          </Grid>
          <Grid marginTop="50px">
            <Grid container position="relative" marginBottom="30px">
              <Box component="h4" class="text-info" sx={{ position: 'absolute', left: '10px' }}>
                Stakepad
              </Box>
              <Box component="h4" sx={{ position: 'absolute', right: '10px' }}>
                View All Pools
              </Box>
            </Grid>
            <StakePadCard></StakePadCard>
            <StakePadCard></StakePadCard>
            <StakePadCard></StakePadCard>
          </Grid>
          <Grid marginTop="50px">
            <Grid container position="relative" marginBottom="30px">
              <Box component="h4" class="text-info" sx={{ position: 'absolute', left: '10px' }}>
                Staking Pools
              </Box>
              <Box component="h4" sx={{ position: 'absolute', right: '10px' }}>
                View All Pools
              </Box>
            </Grid>
            <PoolBox></PoolBox>
            <PoolBox></PoolBox>
            <PoolBox></PoolBox>
          </Grid>
          <Grid>
            <BuyToken></BuyToken>
            <Grid marginTop="50px">
              <Grid container position="relative" marginBottom="30px">
                <Box component="h4" class="text-info" sx={{ position: 'absolute', left: '10px' }}>
                  Farming Pools
                </Box>
                <Box component="h4" sx={{ position: 'absolute', right: '10px' }}>
                  View All Pools
                </Box>
              </Grid>
              <StakePadCard></StakePadCard>
              <StakePadCard></StakePadCard>
              <StakePadCard></StakePadCard>
            </Grid>
          </Grid>
        </Grid>
        <DashboardFooter></DashboardFooter>
        {/* Pools */}
        {/* <Box sx={{ marginTop: '50px', marginBottom: '50px' }}>
              <Typography align='center' sx={{ marginBottom: '35px' }}>
                <h1>Staking Pools</h1>
                <p>Earn high yield by staking mega capital token  or join other attractive staking pools from IDO projects check word file please </p>
              </Typography>
              <PoolBox />
              <PoolBox />
              <PoolBox />
              <PoolBox />
              <PoolBox />
            </Box> */}

        {/* </Container> */}
      </Grid>
    </Page>
  );
}

function InvestCard() {
  return (
    <Card>
      <CardContent>
        <Box component="img" src="logo.png" sx={{ width: '50%' }} />
        <Typography variant="h6" component="div">
          Alpha
        </Typography>
        <Typography variant="h5" component="div">
          ..MGV
        </Typography>
        <Typography variant="body2">Allocations X1</Typography>
        <Button size="small" sx={{ bgcolor: 'grey' }}>
          FCFS
        </Button>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          IDO, NFT
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
function PastInvestBox() {
  return (
    <Box sx={{ bgcolor: '#272727', p: '10px', marginBottom: '15px' }}>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box component="img" src="img/icon1.png" sx={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h5" sx={{ marginTop: '10px' }}>
              Project Name
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={4}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ marginRight: '10px' }}>
              <Typography variant="h6">Total Raise</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                $2356
              </Typography>
            </Box>
            <Box sx={{ marginRight: '10px' }}>
              <Typography variant="h6">Token Price</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                $0.08
              </Typography>
            </Box>
            <Box sx={{ marginRight: '10px' }}>
              <Typography variant="h6">ROI(ATH)</Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                71.00x
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
function BuyToken() {
  return (
    <Grid container borderRadius={1} bgcolor={'#272727'} marginTop="20px" padding="15px" spacing={2}>
      <Grid md="6">your BUSD balance : 244.64</Grid>
      <Grid md="6">your staked : 6,000</Grid>
      <Grid
        borderRadius={1}
        marginTop="10px"
        item
        bgcolor={'#373737'}
        md="6"
        display="flex"
        position="relative"
        height="60px"
      >
        <Grid bottom="10px">0.0</Grid>
        <Grid position="absolute" right="5px">
          <Button class="btn btn-info mx-1 px-4">MAX</Button>
        </Grid>
      </Grid>
      <Grid
        borderRadius={1}
        marginTop="10px"
        item
        bgcolor={'#373737'}
        md="6"
        display="flex"
        position="relative"
        height="60px"
      >
        <Grid bottom="10px">0.0</Grid>
        <Grid position="absolute" right="5px">
          <Button class="btn btn-info mx-1 px-4">MAX</Button>
        </Grid>
      </Grid>
      <Grid container direction="row" marginTop="10px">
        <Button class="btn btn-info mx-1 px-4 text-light">STAKE</Button>
        <Button class="btn btn-outline-secondary mx-1 px-4 text-info">UNSTAKE</Button>
      </Grid>
      <Grid marginTop="10px">
        <Button class="btn btn-outline-secondary mx-1 px-4 mt-2 text-light">HARVEST 43.66 MGV</Button>
        <Box>Harvesting will reset the lock time</Box>
      </Grid>
      <Grid container direction="row" marginTop="10px">
        <Grid sm="3">
          <Box>DEPOSIT FEE</Box>
        </Grid>
        <Grid class="text-info" sm="3">
          <Box>None</Box>
        </Grid>
      </Grid>
      <Grid container direction="row" marginTop="10px">
        <Grid sm="3">
          <Box>WITHDRAW FEE</Box>
        </Grid>
        <Grid class="text-info" sm="3">
          <Box>None</Box>
        </Grid>
      </Grid>
      <Grid container direction="row" marginTop="10px">
        <Grid sm="3">
          <Box>PERFORMANCE FEE TIME</Box>
        </Grid>
        <Grid class="text-info" sm="3">
          <Box>None</Box>
        </Grid>
      </Grid>
      <Grid container direction="row" marginTop="10px">
        <Grid sm="3">
          <Box>LOCK TIME</Box>
        </Grid>
        <Grid class="text-info" sm="3">
          <Box>30 Days</Box>
        </Grid>
      </Grid>
      <Box class="text-info" marginTop="10px">
        Buy Token
      </Box>
    </Grid>
  );
}
function PoolBox() {
  const navigate = useNavigate();
  return (
    <Box borderRadius={1} sx={{ bgcolor: '#272727', p: '10px', marginBottom: '15px' }}>
      <Grid container spacing={2}>
        <Grid item sm={7}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box component="img" src="img/catecoin.webp" sx={{ width: '50px', marginRight: '10px' }} />
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              Megacapital
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={1} sx={{ marginRight: '10px' }}>
          <Typography sx={{ fontSize: 20 }}>Duration</Typography>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            1 Month
          </Typography>
        </Grid>
        <Grid item sm={1} sx={{ marginRight: '10px' }}>
          <Typography sx={{ fontSize: 20 }}>Staked</Typography>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            6,000
          </Typography>
        </Grid>
        <Grid item sm={1} sx={{ marginRight: '10px' }}>
          <Typography sx={{ fontSize: 20 }}>bonus</Typography>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            20%
          </Typography>
        </Grid>
        <Grid item sm={1} sx={{ marginRight: '10px' }}>
          <button class="btn btn-info text-light mt-2 mx-4">Discover</button>
        </Grid>
      </Grid>
    </Box>
  );
}
