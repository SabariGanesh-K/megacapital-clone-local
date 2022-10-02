import { Box, Button, Grid, Typography } from '@mui/material';
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden';
import { useEffect, useLayoutEffect, useState } from 'react';
import apis from 'services';
import { useLocation } from 'react-router-dom';
import { getNetworkImage, getNetworkSymbol } from 'utils/networkSymbol';
import { useSelector } from 'redux/store';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { displayFollowers, formattedDate, imageURL, isValidImage } from '../utils';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';

export default function ProjectDetail(props) {
  // const [name, setName] = React.useState('Some event');
  // async function Twitter() {
  //   await fetch('https://api.twitter.com/2/lists/84839422/followers?user.fields=id,name,profile_image_url', {
  //     headers: {
  //       Authorization:
  //         'Bearer AAAAAAAAAAAAAAAAAAAAANSAfgEAAAAAa%2FBPgl22Md491LAnCNfZNiB2mT0%3D9fALsRkc8QUEFlbj2zGXyPDIYHYxlIsdAV2vx5IoEs0f3GP7Ac'
  //     }
  //   });
  //   let followerCount = user.fields.public_metrics.follower_count;
  //   return followerCount;
  // }

  const { pathname, hash } = useLocation();

  const [pools, setPools] = useState([]);
  const tokenAddress = pathname.split('/')[pathname.split('/').length - 1];
  // console.log(name, startDateTime, endDateTime);
  const [data, setData] = useState([]);
  const [twitterUser, setTwitterUser] = useState('');
  const [randomImages, setRandomImages] = useState([imageURL('avatar1.png'), imageURL('avatar2.png'), imageURL('avatar3.png')]);

  const [roadmapdata, setRoadmapData] = useState('');
  const { name = '', description, startDateTime, endDateTime } = data;
  const handleGoogleCalander = (e) => {
    e.stopPropagation();
    atcb_action({
      name: name,
      description: description,
      startDate: startDateTime,
      endDate: endDateTime,
      options: ['Google'],
      timeZone: 'Europe/Berlin'
    });
  };

  useEffect(() => {
    (async () => {
      const response = await apis.getProjectDetails(tokenAddress, {});
      if (response.statusText === 'OK') {
        const { pool } = response.data;
        setData(pool);
        console.log("data is",pool);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await apis.getRandomImages();
      if (response?.status !== 200) return;
      const images = response?.data?.results?.length > 0 ? response.data.results.map(result => result.picture.thumbnail) : [];
      setRandomImages(images);
    })();
  }, []);

  useEffect(() => {
    document.querySelector('.css-hsfvqa').style.overflow = 'visible';
    document.querySelector('.css-om7vnx').style.overflow = 'visible';
  }, []);


  /*useEffect(() => {
    (async () => {
      console.log('###########',data);
      if (data) {
        await getIpfsData(data.extraData);
      }
    })();
  }, []);*/


  useLayoutEffect(() => {

    setTimeout(() => {
      const pos = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({ top: (pos - 300) });
    }, 200);

    // setTimeout(( ) => {
    //   const pos = window.pageYOffset || document.documentElement.scrollTop;
    //   window.scrollTo({top: (pos - 300)});
    // }, 300)
  }, [hash]);

  /*useEffect(() => {
    console.log('#########', hash);


    setTimeout(( ) => {
      const pos = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({top: (pos - 300)});
    }, 300)


  }, [hash]);*/


  return (
    <>
      <Page style={{ backgroundColor: '#171819' }}>
        <MHidden width='mdDown'>
          <Grid paddingLeft='13%' paddingRight='13%'>
            <Grid container spacing={1} paddingTop='30px'>
              <Grid item sm={3}>
                <CustomCard name='Token Price' number='0.05USDC'></CustomCard>
              </Grid>
              <Grid item sm={3}>
                <CustomCard name='Pool Size' number={`${data?.presaleRate || 0} USDC`}></CustomCard>
              </Grid>
              <Grid item sm={3}>
                <CustomCard name='Hard Cap' number={`${data?.hardCap || 0} USDC`}></CustomCard>
              </Grid>
              <Grid item sm={3}>
                <CustomCard name='Type' number='unlocked'></CustomCard>
              </Grid>
            </Grid>
            <Grid marginTop='30px'>
              <Detail data={data}></Detail>
            </Grid>
            <Typography marginTop='30px' style={{ fontSize: '34px', fontFamily: 'Segoe UI', color: '#56C5FF' }}>
              {displayFollowers(data?.twitter_followers)} Followers
            </Typography>
            <Grid container direction='row' spacing={1} marginTop='10px'>
              {randomImages.map((image, idx) => <Grid item key={idx}>
                <Box component='img' src={image} borderRadius={'50%'} />
              </Grid>)}
            </Grid>
            <Grid marginTop='30px' container direction='row' spacing={1}>
              <Grid item>
                <Button
                  style={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    textTransform: 'lowercase'
                  }}
                >
                  <Box component='img' src={imageURL('Vector.png')} mr={1} />
                  whitepaper
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    textTransform: 'lowercase'
                  }}
                  onClick={() => window.open(data?.ipfs?.website, '_blank')}
                >
                  <Box component='img' src={imageURL('Vector_www.png')} mr={1} />
                  <span className='text-lowercase'>{data?.ipfs?.website}</span>
                </Button>
              </Grid>
              <Grid item>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  <Box component='a' href={`${data?.ipfs?.telegram}`} target='_blank'>
                    <Box component='img' src={imageURL('plane_avatar.png')} />
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  <Box component='a' href={`${data?.ipfs?.twitter}`} target='_blank'>
                    <Box component='img' src={imageURL('twitter_avatar.png')} />
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  <Box component='a' href={`${data?.ipfs?.discord}`} target='_blank'>
                    <Box component='img' src={imageURL('Discord.png')} />
                  </Box>
                </Box>
              </Grid>
              <Grid item alignItems='center' display='flex'>
                {/* <Box component="a" href="#" color="white">
                  Add To Google Calendar
                </Box> */}
                <Box component='a' color='white' sx={{ cursor: 'pointer' }} onClick={handleGoogleCalander}>
                  Add to Google Calendar
                </Box>
              </Grid>
            </Grid>
            <Grid marginTop='50px'>
              <ProjectInformation data={data}></ProjectInformation>
            </Grid>
            {/* <Grid marginTop="60px" justifyContent="center" display="flex">
              <Box component="img" src={imageURL('roadmap-icon.png')}></Box>
            </Grid> */}
            <div id='sticky' style={{ position: 'sticky', top: '92px', backgroundColor: 'rgb(23, 24, 25)' }}>
              <Grid container marginTop='60px' justifyContent='center' sx={{ width: '113%' }}>
                <Grid xs position='relative'>
                  {' '}
                  <Box component='div' width={'50%'}>
                    <Box component={'a'} href='#roadmap'>
                      <img src={imageURL('roadmap-icon-1.png')} />
                    </Box>
                  </Box>
                  <Box
                    component={'span'}
                    sx={{
                      position: 'absolute',
                      top: '30%',
                      width: '52%',
                      height: '4px',
                      background: '#56c4ff',
                      right: -1
                    }}
                  ></Box>
                  {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
                </Grid>
                <Grid xs position='relative'>
                  {' '}
                  <Box component='div' width={'50%'}>
                    <Box component={'a'} href='#about'>
                      <img src={imageURL('roadmap-icon-2.png')} />
                    </Box>
                  </Box>
                  <Box
                    component={'span'}
                    sx={{
                      position: 'absolute',
                      top: '30%',
                      width: '52%',
                      height: '4px',
                      background: '#56c4ff',
                      right: -1
                    }}
                  ></Box>
                  {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
                </Grid>
                <Grid xs position='relative'>
                  {' '}
                  <Box component='div' width={'50%'}>
                    <Box component={'a'} href='#features'>
                      <img src={imageURL('roadmap-icon-3.png')} />
                    </Box>
                  </Box>
                  <Box
                    component={'span'}
                    sx={{
                      position: 'absolute',
                      top: '30%',
                      width: '52%',
                      height: '4px',
                      background: '#56c4ff',
                      right: -1
                    }}
                  ></Box>
                  {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
                </Grid>
                <Grid xs position='relative'>
                  {' '}
                  <Box component='div' width={'50%'}>
                    <Box component={'a'} href='#team'>
                      <img src={imageURL('roadmap-icon-4.png')} />
                    </Box>
                  </Box>
                  <Box
                    component={'span'}
                    sx={{
                      position: 'absolute',
                      top: '30%',
                      width: '52%',
                      height: '4px',
                      background: '#56c4ff',
                      right: -1
                    }}
                  ></Box>
                  {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
                </Grid>
                <Grid xs position='relative'>
                  {' '}
                  <Box component='div' width={'50%'}>
                    <Box component={'a'} href='#tokenomics'>
                      <img src={imageURL('roadmap-icon-5.png')} />
                    </Box>
                  </Box>
                  {/* <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '34%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: 0
                  }}
                ></Box> */}
                  {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
                </Grid>
              </Grid>
            </div>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Roadmap'}
                id='roadmap'
                description={data?.roadmap_description}
                description_url={data?.roadmap_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'About'}
                id='about'
                description={data?.about_description}
                description_url={data?.about_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Features'}
                id='features'
                description={data?.features_description}
                description_url={data?.features_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Team'}
                id='team'
                description={data?.teams_description}
                description_url={data?.teams_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Tokenomics'}
                id='tokenomics'
                description={data?.tokenomics_description}
                description_url={data?.tokenomics_url}
              ></Roadmap>
            </Grid>
            {/* <Grid container marginTop="60px">
              <Box color="white">
                Jan 2022
                <br />
                <br />
                Public Sale on Solanium
                <br />
                <br />
                Feb 2022
                <br />
                <br />
                TGE for all holders. Playable Demo - for early investors
                <br />
                <br />
                Mar 2022
                <br />
                <br />
                DEX listing. MVP = demo plus blockchain layer - for early investors
                <br />
                <br />
                Apr 2022
                <br />
                <br />
                CEX listing. Back end dev also fully underway
                <br />
                <br />
                May 2022
                <br />
                <br />
                Key NFT Sales. Alpha version - for key online leaders
                <br />
                <br />
                Jun 2022
                <br />
                <br />
                Announcement of Key Game theme Challenges
                <br />
                <br />
                Jul 2022
                <br />
                <br />
                Beta version - for key online leaders
                <br />
                <br />
                Aug 2022
                <br />
                <br />
                Partnerships Announced
                <br />
                <br />
                Sep 2022
                <br />
                <br />
                Game Launch on Stores
              </Box>
            </Grid> */}
          </Grid>
        </MHidden>
        <MHidden width='mdUp'>
          <Grid paddingLeft='5%' paddingRight='5%'>
            <Grid container spacing={1} paddingTop='30px'>
              <Grid item xs={6}>
                <CustomCard name='Token Price' number='0.05USDC'></CustomCard>
              </Grid>
              <Grid item xs={6}>
                <CustomCard name='Pool Size' number='0.05USDC'></CustomCard>
              </Grid>
              <Grid item xs={6}>
                <CustomCard name='Hard Cap' number='0.05USDC'></CustomCard>
              </Grid>
              <Grid item xs={6}>
                <CustomCard name='Type' number='unlocked'></CustomCard>
              </Grid>
            </Grid>
            <Grid marginTop='30px'>
              <Detail></Detail>
            </Grid>
            <Grid display='flex' justifyContent='center'>
              <Typography marginTop='30px' style={{ fontSize: '20px', fontFamily: 'Segoe UI', color: '#56C5FF' }}>
                {displayFollowers(data?.twitter_followers)} Followers
              </Typography>
            </Grid>
            <Grid container direction='row' spacing={1} marginTop='10px' display='flex' justifyContent='center'>
              <Grid item>
                <Box component='img' src={imageURL('avatar1.png')} />
              </Grid>
              <Grid item>
                <Box component='img' src={imageURL('avatar2.png')} />
              </Grid>
              <Grid item>
                <Box component='img' src={imageURL('avatar3.png')} />
              </Grid>
            </Grid>
            <Grid
              marginTop='30px'
              container
              direction='row'
              spacing={1}
              padding='0px 15px'
              display='flex'
              justifyContent='space-around'
            >
              <Grid item xs={12}>
                <Button
                  style={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    width: '100%',
                    textTransform: 'lowercase'
                  }}
                >
                  <Box component='img' marginRight='8px' src={imageURL('Vector.png')} />
                  whitepaper
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                <Button
                  style={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    width: '100%',
                    textTransform: 'lowercase'
                  }}
                >
                  <Box component="img" marginRight="8px" src={imageURL('Vector_www.png')} />
                  <span>www.megacapital.com</span>
                </Button>
              </Grid> */}
              <Grid item xs={12}>
                <Button
                  style={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Segoe UI',
                    fontSize: '14px',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    textTransform: 'lowercase',
                    width: '100%'
                  }}
                >
                  <Box component='img' marginRight='8px' src={imageURL('Vector_www.png')} />
                  <span className='text-lowercase'>{data?.ipfs?.website}</span>
                </Button>
              </Grid>

              <Grid item marginTop='20px'>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  <Box component='a' href={`${data?.ipfs?.telegram}`}>
                    <Box component='img' src={imageURL('plane_avatar.png')} />
                  </Box>
                </Box>
              </Grid>

              <Grid item marginTop='20px'>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  <Box component='a' href={`${data?.ipfs?.twitter}`}>
                    <Box component='img' src={imageURL('twitter_avatar.png')} />
                  </Box>
                </Box>
              </Grid>
              <Grid item marginTop='20px'>
                <Box
                  component='button'
                  style={{
                    height: '44px',
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 10px 10px 10px'
                  }}
                >
                  {' '}
                  <Box component='a' href={`${data?.ipfs?.discord}`}>
                    <Box component='img' src={imageURL('Discord.png')} />
                  </Box>
                </Box>
              </Grid>
              <Grid item alignItems='center' display='flex' marginTop='15px'>
                <Box component='a' color='white' sx={{ cursor: 'pointer' }} onClick={handleGoogleCalander}>
                  Add To Google Calendar
                </Box>
              </Grid>
            </Grid>
            <Grid marginTop='50px'>
              <ProjectInformation data={data}></ProjectInformation>
            </Grid>
            <Grid container marginTop='60px' justifyContent='center' display='flex'>
              <Grid xs={2.4} position='relative'>
                {' '}
                <Box component='div' width={'50%'}>
                  <Box component={'a'} href='#roadmap'>
                    <img src={imageURL('roadmap-icon-1.png')} />
                  </Box>
                </Box>
                <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '30%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: -1
                  }}
                ></Box>
                {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
              </Grid>
              <Grid xs={2.4} position='relative'>
                {' '}
                <Box component='div' width={'50%'}>
                  <Box component={'a'} href='#about'>
                    <img src={imageURL('roadmap-icon-2.png')} />
                  </Box>
                </Box>
                <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '30%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: -1
                  }}
                ></Box>
                {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
              </Grid>
              <Grid xs={2.4} position='relative'>
                {' '}
                <Box component='div' width={'50%'}>
                  <Box component={'a'} href='#features'>
                    <img src={imageURL('roadmap-icon-3.png')} />
                  </Box>
                </Box>
                <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '30%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: -1
                  }}
                ></Box>
                {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
              </Grid>
              <Grid xs={2.4} position='relative'>
                {' '}
                <Box component='div' width={'50%'}>
                  <Box component={'a'} href='#team'>
                    <img src={imageURL('roadmap-icon-4.png')} />
                  </Box>
                </Box>
                <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '30%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: -1
                  }}
                ></Box>
                {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
              </Grid>
              <Grid xs={2.4} position='relative'>
                {' '}
                <Box component='div' width={'50%'}>
                  <Box component={'a'} href='#tokenomics'>
                    <img src={imageURL('roadmap-icon-5.png')} />
                  </Box>
                </Box>
                {/* <Box
                  component={'span'}
                  sx={{
                    position: 'absolute',
                    top: '34%',
                    width: '52%',
                    height: '4px',
                    background: '#56c4ff',
                    right: 0
                  }}
                ></Box> */}
                {/* <img src={imageURL('roadmap-icon-line.png')} /> */}
              </Grid>
            </Grid>
            <Grid item marginTop='50px'>
              <Roadmap
                title={'Roadmap'}
                id='roadmap'
                description={data?.roadmap_description}
                description_url={data?.roadmap_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'About'}
                id='about'
                description={data?.about_description}
                description_url={data?.about_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Features'}
                id='features'
                description={data?.features_description}
                description_url={data?.features_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Team'}
                id='team'
                description={data?.teams_description}
                description_url={data?.teams_url}
              ></Roadmap>
            </Grid>
            <Grid marginTop='50px'>
              <Roadmap
                title={'Tokenomics'}
                id='tokenomics'
                description={data?.tokenomics_description}
                description_url={data?.tokenomics_url}
              ></Roadmap>
            </Grid>
            {/* <Grid container marginTop="60px">
              <Box color="white" fontSize={12}>
                Jan 2022
                <br />
                <br />
                Public Sale on Solanium
                <br />
                <br />
                Feb 2022
                <br />
                <br />
                TGE for all holders. Playable Demo - for early investors
                <br />
                <br />
                Mar 2022
                <br />
                <br />
                DEX listing. MVP = demo plus blockchain layer - for early investors
                <br />
                <br />
                Apr 2022
                <br />
                <br />
                CEX listing. Back end dev also fully underway
                <br />
                <br />
                May 2022
                <br />
                <br />
                Key NFT Sales. Alpha version - for key online leaders
                <br />
                <br />
                Jun 2022
                <br />
                <br />
                Announcement of Key Game theme Challenges
                <br />
                <br />
                Jul 2022
                <br />
                <br />
                Beta version - for key online leaders
                <br />
                <br />
                Aug 2022
                <br />
                <br />
                Partnerships Announced
                <br />
                <br />
                Sep 2022
                <br />
                <br />
                Game Launch on Stores
              </Box>
            </Grid> */}
          </Grid>
        </MHidden>
      </Page>
    </>
  );
}

function CustomCard(props) {
  return (
    <>
      <MHidden width='mdDown'>
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }}>
          <Box style={{ fontSize: '15px', color: '#24B6E6' }}>{props.name}</Box>
          <Box marginTop='20px' style={{ fontSize: '20px', color: 'white' }}>
            {props.number}
          </Box>
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }}>
          <Box style={{ fontSize: '15px', color: '#24B6E6' }} textAlign='center'>
            {props.name}
          </Box>
          <Box marginTop='10px' style={{ fontSize: '20px', color: 'white' }} textAlign='center'>
            {props.number}
          </Box>
        </Grid>
      </MHidden>
    </>
  );
}

function ProjectInformation({ data, roadmapdata }) {
  const chainId = useSelector((store) => store.network.chainId);
  const { account } = useActiveWeb3React();
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    (async () => {
      if (account && data !== undefined) {
        console.log('account', account);
        console.log('condition', data?.whiteLists.includes(account));
        setCondition(!data?.whitelistable || data?.whiteLists.includes(account));
      }
    })();
  }, [account, data, roadmapdata]);

  return (
    <>
      <MHidden width='mdDown'>
        <Grid container border='1px solid #56C5FF' borderRadius={1} bgColor='#232323' padding='30px' rowSpacing={2}>
          <Grid item sm={7} color='#56C5FF' fontSize={48}>
            Project Information
          </Grid>
          <Grid item sm={5} color='#56C5FF' fontSize={48}>
            Token Information
          </Grid>
          <Grid container item direction='row'>
            <Grid container item sm={2} direction='column'>
              <Grid item color='white'>
                HARDCAP
              </Grid>
              <Grid item color='white'>
                OPEN TIME
              </Grid>
              <Grid item color='white'>
                CLOSE TIME
              </Grid>
              <Grid item color='white'>
                LISTING DATE
              </Grid>
              <Grid item color='white'>
                DEAL
              </Grid>
            </Grid>
            <Grid container item sm={3} direction='column'>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {data?.hardCap} USDC
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {formattedDate(data?.startDateTime)}
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {formattedDate(data?.endDateTime)}
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {formattedDate(data?.createdAt)}
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {data?.whitelistable ? 'VC' : 'IDO'}
              </Grid>
            </Grid>
            <Grid container item sm={2}></Grid>
            <Grid container item sm={2} direction='column'>
              <Grid item color='white'>
                SYMBOL
              </Grid>
              <Grid item color='white'>
                CATEGORY
              </Grid>
              <Grid item color='white'>
                BLOCKCHAIN
              </Grid>
              <Grid item color='white'>
                TGI
              </Grid>
              <Grid item color='white'>
                TYPE
              </Grid>
            </Grid>
            <Grid container item sm={2} direction='column'>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {data?.symbol}
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                Metaverse
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                {getNetworkSymbol(chainId, true)}
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                Solana
              </Grid>
              <Grid item color='#56C5FF' justifyContent='right' display='flex'>
                unlocked
              </Grid>
            </Grid>
          </Grid>
          <Grid sm={12} marginTop='50px'>
            <Box color='#56C5FF'>35700/100000</Box>
            <Box position='relative' display='flex'>
              <Box width='100%' height='10px' borderRadius={2} backgroundColor='white' />
              <Box
                position='absolute'
                left='0px'
                borderRadius={2}
                height='10px'
                width={`calc(35700/100000*100%)`}
                backgroundColor='#56C5FF'
              />
            </Box>
          </Grid>
          <Grid item container marginTop='50px'>
            <Grid item sm={3} color='#56C5FF'>
              your Contribution
            </Grid>
            <Grid item sm={3} color='#56C5FF'>
              Personal Max
            </Grid>
            <Grid item sm={6} color='#56C5FF'>
              Token Price
            </Grid>
            <Grid item sm={3} fontSize={28} color='white'>
              $1000
            </Grid>
            <Grid item sm={3} fontSize={28} color='white'>
              247854
            </Grid>
            <Grid item sm={6} fontSize={28} color='white'>
              $0.04
            </Grid>
          </Grid>
          {condition ? (
            <>
              <Grid item container marginTop='20px'>
                <Grid item sm={12} color='#56C5FF'>
                  your BUSD balance: 244.64
                </Grid>
                <Grid item container sm={6} bgColor='#232323' position='relative' display='flex'>
                  <Box
                    component='input'
                    padding='5px'
                    width='100%'
                    height='50px'
                    placeholder='0.0'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                  ></Box>
                  <Box
                    component='button'
                    position='absolute'
                    right='8px'
                    top='7px'
                    style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                    color='white'
                    paddingLeft='20px'
                    paddingRight='20px'
                  >
                    MAX
                  </Box>
                </Grid>
              </Grid>
              <Grid marginTop='20px'>
                <Box
                  component='button'
                  style={{ backgroundColor: '#56C5FF', border: 'none', borderRadius: 6 }}
                  color='white'
                  padding='10px 28px 10px 28px'
                >
                  APPROVE
                </Box>
                <Box
                  marginLeft='10px'
                  component='button'
                  style={{
                    backgroundColor: '#232323',
                    borderRadius: 4,
                    border: '1px solid #56C5FF',
                    color: '#56C5FF',
                    padding: '10px 52px 10px 52px'
                  }}
                >
                  BUY
                </Box>
              </Grid>
            </>
          ) : null}
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid
          container
          border='1px solid #56C5FF'
          borderRadius={1}
          backgroundColor='#232323'
          padding='20px'
          rowSpacing={2}
        >
          <Grid item xs={12} color='#56C5FF' fontSize={20} justifyContent='center' display='flex'>
            Project Information
          </Grid>
          <Grid fontSize={16}>
            <Grid item xs={12} color='white' marginTop='20px'>
              HARDCAP
            </Grid>
            <Grid item xs={12} color='#56C5FF'>
              {data?.hardCap} USDC
            </Grid>
            <Grid item xs={12} color='white' marginTop='15px'>
              OPEN TIME
            </Grid>
            <Grid item xs={12} color='#56C5FF'>
              Jan 29, 2022, 9:00:00 PM
            </Grid>
            <Grid item xs={12} color='white' marginTop='15px'>
              CLOSE TIME
            </Grid>
            <Grid item xs={12} color='#56C5FF'>
              Jan 31, 2022, 9:00:00 PM
            </Grid>
            <Grid item xs={12} color='white' marginTop='15px'>
              LISTING DATE
            </Grid>
            <Grid item xs={12} color='#56C5FF'>
              Jan 31, 2022, 9:00:00 PM
            </Grid>
            <Grid item xs={12} color='white' marginTop='15px'>
              DEAL
            </Grid>
            <Grid item xs={12} color='#56C5FF' marginBottom='30px'>
              INO
            </Grid>
          </Grid>
          <Grid item xs={12} color='#56C5FF' fontSize={20} justifyContent='center' display='flex'>
            Token Information
          </Grid>
          <Grid item xs={12} color='#56C5FF' marginTop='15px' marginBottom='20px'>
            PRGC
          </Grid>
          <Grid xs={6}>
            <Box color='white'>CATEGORY</Box>
            <Box color='#56C5FF' marginTop='2px'>
              Metaverse
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box color='white'>TGI</Box>
            <Box color='#56C5FF' marginTop='2px'>
              Solana
            </Box>
          </Grid>
          <Grid xs={6} marginTop='10px'>
            <Box color='white'>BLOCKCHAIN</Box>
            <Box color='#56C5FF' marginTop='2px'>
              Solana
            </Box>
          </Grid>
          <Grid xs={6} marginTop='10px'>
            <Box color='white'>TYPE</Box>
            <Box color='#56C5FF' marginTop='2px'>
              unlocked
            </Box>
          </Grid>
          <Grid xs={12} marginTop='30px' width='100%'>
            <Box color='#56C5FF'>35700/100000</Box>
            <Box position='relative' display='flex'>
              <Box width='100%' height='10px' borderRadius={2} backgroundColor='white' />
              <Box
                position='absolute'
                left='0px'
                borderRadius={2}
                height='10px'
                width={`calc(35700/100000*100%)`}
                backgroundColor='#56C5FF'
              />
            </Box>
          </Grid>
          <Grid item container marginTop='50px'>
            <Grid item xs={6} fontSize={16} color='#56C5FF'>
              your Contribution
            </Grid>
            <Grid item xs={6} fontSize={22} color='white' display='flex' justifyContent='flex-end'>
              $1000
            </Grid>
            <Grid item xs={6} fontSize={16} color='#56C5FF'>
              Personal Max
            </Grid>
            <Grid item xs={6} fontSize={22} color='white' display='flex' justifyContent='flex-end'>
              247854
            </Grid>
            <Grid item xs={6} fontSize={16} color='#56C5FF'>
              Token Price
            </Grid>
            <Grid item xs={6} fontSize={22} color='white' display='flex' justifyContent='flex-end'>
              $0.04
            </Grid>
          </Grid>
          {condition ? (
            <>
              <Grid item container marginTop='20px'>
                <Grid item sm={12} color='#56C5FF'>
                  your BUSD balance: 244.64
                </Grid>
                <Grid item container sm={6} bgColor='#232323' position='relative' display='flex'>
                  <Box
                    component='input'
                    padding='5px'
                    width='100%'
                    height='50px'
                    placeholder='0.0'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: 5 }}
                  ></Box>
                  <Box
                    component='button'
                    position='absolute'
                    right='8px'
                    top='7px'
                    style={{ backgroundColor: '#56C5FF', height: '70%', border: 'none', borderRadius: 6 }}
                    color='white'
                    paddingLeft='20px'
                    paddingRight='20px'
                  >
                    MAX
                  </Box>
                </Grid>
              </Grid>
              <Grid marginTop='20px'>
                <Box
                  component='button'
                  style={{ backgroundColor: '#56C5FF', border: 'none', borderRadius: 6 }}
                  color='white'
                  padding='10px 28px 10px 28px'
                >
                  APPROVE
                </Box>
                <Box
                  marginLeft='10px'
                  component='button'
                  style={{
                    backgroundColor: '#232323',
                    borderRadius: 4,
                    border: '1px solid #56C5FF',
                    color: '#56C5FF',
                    padding: '10px 52px 10px 52px'
                  }}
                >
                  BUY
                </Box>
              </Grid>
            </>
          ) : null}
        </Grid>
      </MHidden>
    </>
  );
}

function Detail({ data }) {
  const chainId = useSelector((store) => store.network.chainId);
  return (
    <>
      <MHidden width='mdDown'>
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }}>
          <Grid container direction='row'>
            <Grid item sm={8}>
              <Box component='img' src={isValidImage(data?.ipfs?.logo)} height={200}></Box>
            </Grid>
            <Grid item sm={4} display='flex' justifyContent='right' paddingRight='20px' sx={{ height: '40px' }}>
              <Box
                component='button'
                style={{
                  backgroundColor: 'rgba(242, 188, 26, 0.1)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#F9C013',
                  padding: '8px 10px'
                }}
              >
                <img src={getNetworkImage(chainId)} alt={data?.name} width={25} />
              </Box>
              <Box
                component='button'
                marginLeft='10px'
                style={{
                  background: '#000000',
                  border: 'none',
                  borderRadius: 8,
                  color: '#56C5FF',
                  padding: '5px 10px'
                }}
              >
                {data?.whitelistable ? 'VC' : 'IDO'}
              </Box>
            </Grid>
          </Grid>
          <Grid marginTop='20px'>
            <Typography component='p' style={{ fontFamily: 'Segoe UI', fontSize: '48px', color: '#56C5FF' }}>
              {data?.name}
            </Typography>
            <Typography
              marginTop='15px'
              component='p'
              style={{ width: '55%', fontFamily: 'Segoe UI', fontSize: '20px' }}
            >
              Computers have their own language called Machine Code which tells them what to do. As you can see, it
              doesn't make a lot of sense to humans!
            </Typography>
            <Typography
              marginTop='15px'
              component='p'
              style={{ width: '55%', fontFamily: 'Segoe UI', fontSize: '15px', color: '#F1F0F0' }}
            >
              Computers have their own language called Machine Code which tells them what to do. As you can see, it
              doesn't make a lot of sense to humans!
            </Typography>
          </Grid>
          {/* <Grid marginTop="20px">
                        <Box component="button" style={{ padding: "10px", backgroundColor: "#56C5FF", color: "white", border: 'none', borderRadius: 4 }} >CONNECT WALLET</Box>
                        <Box component="button" marginLeft="20px" style={{ padding: "10px", backgroundColor: "#232323", borderRadius: 4, border: "1px solid #56C5FF", color: "#56C5FF" }} >FOLLOW US</Box>
                        <Box component="a" marginLeft="20px" href="#" style={{ fontFamily: "Segoe UI", fontSize: "15px", color: '#56C5FF' }} >VIEW CONTRACT</Box>
                    </Grid> */}
          <Grid marginTop='20px' align='center' justifyContent='center' alignItems='center'>
            <Typography
              component='p'
              style={{ width: '55%', fontFamily: 'Segoe UI', fontSize: '34px', color: '#56C5FF' }}
            >
              {/*Project {getProjectStatus(data?.startDateTime, data?.endDateTime)}*/}
            </Typography>
            <Box marginTop='30px' component='img' src={imageURL('projects-process.png')} />
          </Grid>
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }} position='relative'>
          <Box
            component='button'
            position='absolute'
            left='10px'
            top='10px'
            alignItems='center'
            style={{
              height: '40px',
              backgroundColor: 'rgba(242, 188, 26, 0.1)',
              border: 'none',
              borderRadius: 8,
              color: '#F9C013',
              padding: '7px 13px'
            }}
          >
            <img src={getNetworkImage(chainId)} alt={data?.name} width={25} />
          </Box>
          <Box
            component='button'
            position='absolute'
            right='10px'
            top='10px'
            alignItems='center'
            style={{
              height: '40px',
              background: '#000000',
              border: 'none',
              borderRadius: 8,
              color: '#56C5FF',
              padding: '7px 13px'
            }}
          >
            {data?.whitelistable ? 'VC' : 'IDO'}
          </Box>
          <Grid item sm={12} justifyContent='center' display='flex'>
            <Box component='img' src={isValidImage(data?.ipfs?.logo)} />
          </Grid>
          <Grid item sm={12} justifyContent='center' display='flex'>
            <Typography
              component='p'
              marginTop='20px'
              style={{ fontFamily: 'Segoe UI', fontSize: '20px', color: '#56C5FF' }}
            >
              ProtReality Games
            </Typography>
          </Grid>
          <Box
            marginTop='15px'
            component='p'
            textAlign='center'
            style={{ fontFamily: 'Segoe UI', fontSize: '12px', color: '#F1F0F0' }}
          >
            Computers have their own language called Machine Code which tells them what to do. As you can see, it
            doesn't make a lot of sense to humans!
          </Box>
          <Box
            component='button'
            style={{
              padding: '10px 5px',
              backgroundColor: '#56C5FF',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontSize: 10
            }}
          >
            CONNECT WALLET
          </Box>
          <Box
            component='button'
            marginLeft='10px'
            style={{
              padding: '10px',
              backgroundColor: '#232323',
              fontSize: 10,
              borderRadius: 4,
              border: '1px solid #56C5FF',
              color: '#56C5FF'
            }}
          >
            FOLLOW US
          </Box>
          <Box
            component='a'
            marginLeft='10px'
            href='#'
            style={{ fontFamily: 'Segoe UI', fontSize: '10px', color: '#56C5FF' }}
          >
            VIEW CONTRACT
          </Box>
        </Grid>
        {/*<Grid marginTop='20px' align='center' justifyContent='center' alignItems='center'>
          <Typography
            component='p'
            style={{ width: '55%', fontFamily: 'Segoe UI', fontSize: '22px', color: '#56C5FF' }}
          >
            Project Process
          </Typography>
        </Grid>*/}
        <Grid container marginTop='20px'>
          <Grid item xs={4} paddingLeft='10px'>
            <Box component='img' marginLeft='5px' src={imageURL('whitelist.png')}></Box>
            <Box fontSize={20}>Whitelist </Box>
            {/* <Box fontSize={12} marginTop="10px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi sit dictumst</Box> */}
          </Grid>
          <Grid item xs={4} paddingLeft='15px'>
            <Box component='img' src={imageURL('sale.png')} />
            <Box fontSize={20} marginLeft='10px'>
              Sale
            </Box>
            {/* <Box fontSize={12} marginTop="10px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi sit dictumst</Box> */}
          </Grid>
          <Grid item xs={4} paddingLeft='15px'>
            <Box component='img' src={imageURL('claim.png')} />
            <Box fontSize={20}>Claim</Box>
            {/* <Box fontSize={12} marginTop="10px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi sit dictumst</Box> */}
          </Grid>
        </Grid>
      </MHidden>
    </>
  );
}

function Roadmap({ roadmapData, title, id, description, description_url }) {
  // const chainId = useSelector((store) => store.network.chainId);
  // const { account } = useActiveWeb3React();
  // const [condition, setCondition] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     if (account && data !== undefined) {
  //       console.log('account', account);
  //       console.log('condition', data?.whiteLists.includes(account));
  //       setCondition(!data?.whitelistable || data?.whiteLists.includes(account));
  //     }
  //   })();
  // }, [account, data, roadmapdata]);

  return (
    <>
      <MHidden width='mdDown'>
        <Grid
          container
          border='1px solid #56C5FF'
          borderRadius={1}
          bgColor='#232323'
          padding='60px'
          rowSpacing={3}
          margin={'100px 0px'}
          id={id}
        >
          <Grid item sm={12} color='#56C5FF' fontSize={48}>
            <Box component={'div'}>{title}</Box>
          </Grid>
          <Grid item sm={12} color='#fff' fontSize={18}>
            <Box component={'p'}>{description}</Box>
          </Grid>
          <Grid item sm={12} color='#56C5FF' fontSize={18}>
            <Box component={'div'}>
              <Box component={'img'} src={description_url} width={'100%'} />
            </Box>
          </Grid>
        </Grid>
      </MHidden>
      <MHidden width='mdUp'>
        <Grid
          container
          border='1px solid #56C5FF'
          borderRadius={1}
          bgColor='#232323'
          padding='20px'
          rowSpacing={3}
          margin={'35px 0px'}
          id={id}
        >
          <Grid item md={12} sm={12} xsm={12} width={'100%'} color='#56C5FF' fontSize={24}>
            <Box component={'div'}>{title}</Box>
          </Grid>
          <Grid item md={12} sm={12} xsm={12} width={'100%'} color='#56C5FF' fontSize={16}>
            <Box component={'p'} color={'#fff'}>
              {description}
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xsm={12} width={'100%'} color='#56C5FF'>
            <Box component={'div'}>
              <Box component={'img'} src={description_url} width={'100%'} />
            </Box>
          </Grid>
        </Grid>
      </MHidden>
    </>
  );
}
