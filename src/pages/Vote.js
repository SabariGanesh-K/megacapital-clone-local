import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// material
import { Box, Button, Grid } from '@mui/material';

import { getPools } from 'redux/slices/pools';
// import { useIDOContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
// import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden';
import { imageURL } from '../utils';

// ----------------------------------------------------------------------

export default function Vote() {
  const { hash } = useLocation();

  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  // const [search, setSearch] = useContext(SearchContext);

  //Pagination part
  // const [pageSize, setPageSize] = useState(50);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);
  // const pools = useSelector((state) => state.pools.pools);
  // const totalPage = useSelector((state) => state.pools.totalPage);
  // const handlePageChange = (e, value) => {
  //   setPage(value);
  // };

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, tab, account));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, network, tab]);

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
    <Page title='Megacapital' style={{ backgroundColor: '#171819' }}>
      {/* <Container maxWidth='md'> */}
      <MHidden width='mdDown'>
        <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop='70px'>
          <Grid align='center' justifyContent='center' paddingBottom='30px'>
            <Box component='h2' class='text-info'>VOTE</Box>
            <Box component='h5' color='white'>
              Vote for the next project you'd like to see on mega capital<br />Launchpads
            </Box>
          </Grid>
          <VoteCard name='Hassan Coin'></VoteCard>
          <VoteCard name='sheraz coin'></VoteCard>
          <VoteCard name='Mega Capital Coin'></VoteCard>
          <VoteCard name='Mega coin 1'></VoteCard>
          <VoteCard name='Clinton Randolph'></VoteCard>
          <AboutCard></AboutCard>
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop='30px'>
          <Grid align='center' justifyContent='center'>
            <Box component='h2' class='text-info'>VOTE</Box>
            <Box color='white' fontSize={16} marginBottom='20px'>
              Vote for the next project you'd like to see on mega capital Launchpads
            </Box>
          </Grid>
          <PhoneVoteCard name='Hassan Coin' angle='down'></PhoneVoteCard>
          <PhoneVoteCard name='sheraz coin' angle='up'></PhoneVoteCard>
          <PhoneVoteCard name='Mega Capital Coin' angle='down'></PhoneVoteCard>
          <PhoneVoteCard name='Mega coin 1' angle='down'></PhoneVoteCard>
          <PhoneVoteCard name='Clinton Randolph' angle='down'></PhoneVoteCard>
          <AboutCard></AboutCard>
        </Grid>
      </MHidden>
      {/* </Container> */}
    </Page>
  );
}

function PhoneVoteCard(props) {
  return (
    <>
      <Grid container backgroundColor='#232323' padding='10px' marginBottom='20px' borderRadius={1}>
        <Grid item xs={12} height='100px' position='relative' display='flex'>
          <Box component='img' width='100%' height='100%' position='absolute' src={imageURL('projects (2).png')}></Box>
          <Box component='img' src={imageURL('logo.png')} width='35px' height='30px' position='absolute' left='10px'
               top='10px'></Box>
          <Box backgroundColor='#232323' position='absolute' left='5px' bottom='5px' padding='1px 10px' color='white'
               borderRadius={0.5} fontSize={14}>NFT</Box>
          <Box component='button' backgroundColor='rgb(255, 255, 255, 0)' border='none' position='absolute' right='10px'
               top='10px'>
            {props.angle === 'down' ? <Box component='img' src={imageURL('angle_down.png')}></Box> :
              <Box component='img' src={imageURL('angle_up.png')}></Box>}
          </Box>
        </Grid>
        <Grid item xs={12} marginTop='15px' color='#56C5FF'>Project Name</Grid>
        <Grid item xs={6} marginTop='15px' padding='5px'><Box component='button' borderRadius={0.5} width='100%'
                                                              color='#56C5FF' backgroundColor='rgb(255, 255, 255, 0)'
                                                              padding='5px' border='1px solid #56C5FF'>NO</Box></Grid>
        <Grid item xs={6} marginTop='15px' padding='5px'><Box component='button' borderRadius={0.5} width='100%'
                                                              color='white' backgroundColor='#56C5FF' padding='5px'
                                                              border='none'>YES</Box></Grid>
      </Grid>

    </>
  );
}

function VoteCard(props) {
  return (
    <Grid borderRadius={1} container bgcolor={'#232323'} direction='row' sx={{ width: '100%' }}
          padding='20px 5px 20px 5px' marginTop='20px'>
      <Grid item container md='5' sm='12' direction='row'>
        <Box item component='img' src={imageURL('logo.png')} marginLeft='10px'></Box>
        <Box item fontSize='20px' marginTop='13px' marginLeft='10px' color='white'> {props.name}</Box>
      </Grid>
      <Grid item md='3' sm='3'>
        <Box marginTop='13px' alignItems='center' justifyContent='center' display='flex' fontSize='16px'
             borderRadius={1} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          width: '100px',
          height: '40px',
          color: '#56C5FF'
        }}>NFT</Box>
      </Grid>
      <Grid item md='1.5' sm='3'>
        <Button class='btn btn-info text-light mx-2 px-5 mt-2'>YES</Button>
      </Grid>
      <Grid item md='1.5' sm='3'>
        <Button class='btn btn-outline-info mx-2 px-5 mt-2'>NO</Button>
      </Grid>
      <Grid item md='1' sm='3'>
        <Button><i class='Nft-arrow fa-solid fa-angle-down text-info mx-5 pt-3'></i></Button>
      </Grid>
    </Grid>
  );
}

function AboutCard() {
  return (
    <>
      <MHidden width='mdDown'>
        <Grid container bgcolor={'#272727'} sx={{ width: '100%' }} padding='20px' marginTop='20px' borderRadius={2}>
          <Box component='h2' class='text-info'>About</Box>
          <Box marginTop='30px' component='p' color='white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mattis congue volutpat in et, dui, iaculis. Commodo morbi posuere et porta. Velit aliquet imperdiet
            fringilla faucibus tincidunt quam facilisi. Risus, posuere lacus, vel aliquet ultrices sagittis, ultrices
            aenean rutrum. Scelerisque elementum porta enim egestas ac tempus eu. Lorem arcu vitae, id risus, faucibus
            duis sed. Sed egestas quis erat amet orci eu porttitor congue. Eu a at velit feugiat faucibus vitae enim.
            Cras massa sapien rhoncus natoque nec.Dolor habitant nisl vulputate morbi in ut ultrices dolor. Facilisis
            elementum est sed interdum amet in aenean sed. Enim porta proin donec sociis consectetur.</Box>
          <Grid container direction='row' marginBottom='20px'>
            <Box component='button' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 10px 10px 10px'
            }}><Box component='img' src={imageURL('twitter_avatar.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px'
            }}><Box component='img' src={imageURL('Discord.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px'
            }}><Box component='img' src={imageURL('plane_avatar.png')} /></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 10px 10px 10px'
            }}> <Grid container direction='row'><Box component='img' marginTop='7px' width='26px' height='14px'
                                                     src={imageURL('homelink.png')} /><Box marginLeft='5px'
                                                                                           color='white'>www.megacapital.com</Box></Grid></Box>
            <Box component='button' marginLeft='10px' href='/' style={{
              height: '44px',
              border: 'none',
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px',
              color: 'white'
            }}><i class='fa-regular fa-file text-info mx-2'></i>Pitch Dock</Box>
          </Grid>
          <Box component='img' borderRadius={2} width='100%' height='300px' src={imageURL('projects (2).png')} />
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid container bgcolor={'#272727'} sx={{ width: '100%' }} padding='20px' marginTop='20px' borderRadius={1}>
          <Grid item xs={12} justifyContent='center' display='flex'><Box component='p' fontSize={20}
                                                                         color='#56C5FF'>About</Box></Grid>
          <Box marginTop='20px' component='p' textAlign='center' color='white' fontSize={12}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis congue volutpat in et, dui, iaculis. Commodo
            morbi posuere et porta. Velit aliquet imperdiet fringilla faucibus tincidunt quam facilisi. Risus, posuere
            lacus, vel aliquet ultrices sagittis, ultrices aenean rutrum. Scelerisque elementum porta enim egestas ac
            tempus eu. Lorem arcu vitae, id risus, faucibus duis sed. Sed egestas quis erat amet orci eu porttitor
            congue. Eu a at velit feugiat faucibus vitae enim. Cras massa sapien rhoncus natoque nec.Dolor habitant nisl
            vulputate morbi in ut ultrices dolor. Facilisis elementum est sed interdum amet in aenean sed. Enim porta
            proin donec sociis consectetur.</Box>
          <Grid container direction='row' marginBottom='20px'>
            <Grid item xs={12}>
              <Box component='button' width='100%' href='/' style={{
                height: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px 10px 10px 10px'
              }}>
                <Grid container direction='row'>
                  <Box component='img' marginTop='7px' width='26px' height='14px' src={imageURL('homelink.png')} />
                  <Box marginLeft='5px' color='white'>www.megacapital.com</Box>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} marginTop='15px'>
              <Box component='button' width='100%' href='/' style={{
                height: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px',
                color: 'white'
              }}><i class='fa-regular fa-file text-info mx-2'></i>Pitch Dock</Box>
            </Grid>
            <Grid item xs={12} marginTop='28px' display='flex' justifyContent='space-around'>
              <Box component='button' marginLeft='10px' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px'
              }}><Box component='img' src={imageURL('plane_avatar.png')} /></Box>
              <Box component='button' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px 10px 10px 10px'
              }}><Box component='img' src={imageURL('twitter_avatar.png')} /></Box>
              <Box component='button' marginLeft='10px' href='/' style={{
                height: '44px',
                width: '44px',
                border: 'none',
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px'
              }}><Box component='img' src={imageURL('Discord.png')} /></Box>
            </Grid>
          </Grid>
        </Grid>
      </MHidden>
    </>
  );
}