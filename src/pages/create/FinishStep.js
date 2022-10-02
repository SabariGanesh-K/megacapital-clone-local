import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIDOContract } from '../../hooks/useContract';
// import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
// import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseEther, parseUnits } from '@ethersproject/units';
// import CopyClipboard from 'components/CopyToClipboard';
import Moment from 'react-moment';

import {
  Snackbar,
  Alert as MuiAlert,
  Paper,
  Stack,
  Typography,
  Divider,
  DialogContent,
  Button,
  Dialog
} from '@mui/material';
// import SweetAlert from 'react-bootstrap-sweetalert';
// import axios from '../../utils/axios';
import { create } from 'ipfs-http-client';
import { POOL_TIER } from 'config/constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import apis from '../../services';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
// import { set } from 'date-fns';

const projectId = '2DGg3pQzKiRprxvjRddH37hP6Nd';   // <---------- your Infura Project ID

const projectSecret = '46afcc2f7f76fa5508d3c7ceed3a75fd';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FinishStep = ({ goBack, goComplete }) => {
  const network = useSelector((state) => state.network.chainId);
  const [complete, setComplete] = useState(false);
  const totalSupply = useSelector((state) => state.tokenListing.totalSupply);
  const symbol = useSelector((state) => state.tokenListing.symbol);
  const name = useSelector((state) => state.tokenListing.name);
  const decimals = useSelector((state) => state.tokenListing.decimals);
  const presale_rate = useSelector((state) => state.tokenListing.presale_rate);
  const soft_cap = useSelector((state) => state.tokenListing.soft_cap);
  const hard_cap = useSelector((state) => state.tokenListing.hard_cap);
  const min_buy = useSelector((state) => state.tokenListing.min_buy);
  const max_buy = useSelector((state) => state.tokenListing.max_buy);
  const teamVesting_amount = useSelector((state) => state.tokenListing.teamVesting_amount);
  const teamVesting_first_percent = useSelector((state) => state.tokenListing.teamVesting_first_percent);
  const teamVesting_first_period = useSelector((state) => state.tokenListing.teamVesting_first_period);
  const teamVesting_each_percent = useSelector((state) => state.tokenListing.teamVesting_each_percent);
  const teamVesting_each_period = useSelector((state) => state.tokenListing.teamVesting_each_period);

  // const refund = useSelector((state) => state.tokenListing.refund);
  const whiteListable = useSelector((state) => state.tokenListing.whiteListable);
  const dex_amount = useSelector((state) => state.tokenListing.dex_amount);
  const dex_rate = useSelector((state) => state.tokenListing.dex_rate);
  const dex_lockup = useSelector((state) => state.tokenListing.dex_lockup);
  const start_date = useSelector((state) => state.tokenListing.startDate);
  const end_date = useSelector((state) => state.tokenListing.endDate);
  const list_date = useSelector((state) => state.tokenListing.listDate);

  const logo = useSelector((state) => state.tokenListing.logo);
  const website = useSelector((state) => state.tokenListing.website);
  // const facebook = useSelector((state) => state.tokenListing.facebook);
  const twitter = useSelector((state) => state.tokenListing.twitter);
  const github = useSelector((state) => state.tokenListing.github);
  const telegram = useSelector((state) => state.tokenListing.telegram);
  // const instagram = useSelector((state) => state.tokenListing.instagram);
  const discord = useSelector((state) => state.tokenListing.discord);
  const reddit = useSelector((state) => state.tokenListing.reddit);
  const description = useSelector((state) => state.tokenListing.description);
  const roadmap_description = useSelector((state) => state.tokenListing.roadmap_description);
  const about_description = useSelector((state) => state.tokenListing.about_description);
  const features_description = useSelector((state) => state.tokenListing.features_description);
  const teams_description = useSelector((state) => state.tokenListing.teams_description);
  const tokenomics_description = useSelector((state) => state.tokenListing.tokenomics_description);
  const roadmap_url = useSelector((state) => state.tokenListing.roadmap_url);
  const about_url = useSelector((state) => state.tokenListing.about_url);
  const features_url = useSelector((state) => state.tokenListing.features_url);
  const teams_url = useSelector((state) => state.tokenListing.teams_url);
  const tokenomics_url = useSelector((state) => state.tokenListing.tokenomics_url);
  const twitter_followers = useSelector((state) => state.tokenListing.twitter_followers);

  const tier = useSelector((state) => state.tokenListing.tier);
  const address = useSelector((state) => state.tokenListing.address);
  const [poolAddress, setPoolAddress] = useState('');
  const idoContract = useIDOContract();
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState(false);

  const { account } = useActiveWeb3React();

  const handleConfirm = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      try {
        const extraData = {
          logo,
          website,
          // facebook,
          twitter,
          github,
          telegram,
          // instagram,
          discord,
          reddit,
          description,
        };
        const cid = await client.add(JSON.stringify(extraData));
        const poolFixedFee = await idoContract.poolFixedFee(POOL_TIER.findIndex((ele) => ele === tier));
        // console.log(
        //   [
        //     parseEther(String(hard_cap)),
        //     parseEther(String(soft_cap)),
        //     parseUnits(String(presale_rate), decimals),
        //     dex_amount,
        //     parseUnits(String(dex_rate), decimals),
        //     POOL_TIER.findIndex((ele) => ele === tier)
        //   ],
        //   [
        //     Math.round(new Date(start_date).getTime() / 1000),
        //     Math.round(new Date(end_date).getTime() / 1000),
        //     Math.round(new Date(list_date).getTime() / 1000),
        //     parseEther(String(min_buy)),
        //     parseEther(String(max_buy)),
        //     dex_lockup,
        //     // refund == 'refund' ? true : false,
        //     whiteListable === 'whiteListable' ? true : false
        //   ],
        //   address,
        //   cid.path,
        //   // "QmYDVpAS9PBa9qCgUK36T8z98yecasXN4D2xaeGorQao7X",
        //   teamVesting_amount > 0
        //     ? [
        //         parseUnits(String(teamVesting_amount), decimals),
        //         0,
        //         teamVesting_first_percent,
        //         teamVesting_first_period,
        //         teamVesting_each_percent,
        //         teamVesting_each_period
        //       ]
        //     : [0, 0, 0, 0, 0, 0],
        //   {
        //     value: poolFixedFee
        //   }
        // );
        let _model = [
          parseEther(String(hard_cap)),
          parseEther(String(soft_cap)),
          parseUnits(String(presale_rate), decimals),
          dex_amount,
          parseUnits(String(dex_rate), decimals),
          POOL_TIER.findIndex((ele) => ele === tier)
        ];

        let _details = [
          Math.round(new Date(start_date).getTime() / 1000),
          Math.round(new Date(end_date).getTime() / 1000),
          Math.round(new Date(list_date).getTime() / 1000),
          parseEther(String(min_buy)),
          parseEther(String(max_buy)),
          dex_lockup,
          // refund == 'refund' ? true : false,
          whiteListable === 'whiteListable' ? true : false
        ];
        let _vesting;

        teamVesting_amount > 0
          ? (_vesting = [
              parseUnits(String(teamVesting_amount), decimals),
              0,
              teamVesting_first_percent,
              teamVesting_first_period,
              teamVesting_each_percent,
              teamVesting_each_period
            ])
          : (_vesting = [0, 0, 0, 0, 0, 0]);
        const tx = await idoContract.createPool(
          _model,
          _details,
          address,
          cid.path,
          // "QmYDVpAS9PBa9qCgUK36T8z98yecasXN4D2xaeGorQao7X",
          _vesting,
          {
            value: poolFixedFee
          }
        );

        const aa = await tx.wait();
        console.log('AA', aa);
        if (aa.confirmations > 0) {
          let _poolAddress;
          for (let i = 0; i < aa.events.length; i++) {
            if (aa.events[i].event === 'LogPoolCreated') {
              _poolAddress = aa.events[i].args['pool'];
              // setPoolAddress(aa.events[i].args['pool']);
              // _poolAddress = "0x29e5AE7C1c3D3ce86cA42EA7598fe56cC30d9C93"
              setPoolAddress(_poolAddress);
            }
          }
          _model.push(address);
          _details.push(cid.path);
          console.log('projectTokenAddress', address);
          console.log('projectTokenAddress', _model[6]);
          const data = {
            poolOwner: account,
            model: _model,
            details: _details,
            vesting: _vesting,
            poolPercentFee: 0,
            poolAddress: _poolAddress,
            descriptions: {
              description,
              roadmap_description,
              roadmap_url,
              about_description,
              about_url,
              features_description,
              features_url,
              teams_description,
              teams_url,
              tokenomics_description,
              tokenomics_url,
              twitter_followers
            }
          };

          const _res = await apis.createBscIdo(data);
          console.log(_res);
        }

        console.log(Date.now());
        setTimeout(() => {
          console.log(Date.now());
          setIsConfirming(false);
          setComplete(true);
        }, 8000);
      } catch (err) {
        console.log(err);
        if (err?.data?.message?.includes(`Not enough fee!`) || err?.message?.includes(`Not enough fee!`))
          setError('Not enough balance to pay fee');
        else if (err?.data?.message?.includes(`remove tax`) || err?.message?.includes(`remove tax`))
          setError('You should remove the tax for the IDO and pool address before creation!');
        else if (err?.data?.message?.includes(`startDate fail!`) || err?.message?.includes(`startDate fail!`))
          setError('Start time incorrect!');
        else if (err?.data?.message?.includes(`end<=list!`) || err?.message?.includes(`end<=list!`))
          setError('DEX listing time should be later than the pool end time!');
        else if (err?.data?.message?.includes(`start<end!`) || err?.message?.includes(`start<end!`))
          setError('Incorrect period!');
        else if (err?.data?.message?.includes(`lockup>=30!`) || err?.message?.includes(`lockup>=30!`))
          setError('Lock up period should be longer than 30 days!');
        else if (err?.data?.message?.includes(`min<max`) || err?.message?.includes(`min<max`))
          setError('Maximum allocation should be greater than minimum!');
        else if (err?.data?.message?.includes(`hardCap > 0`) || err?.message?.includes(`hardCap > 0`))
          setError('Hardcap should be greater than 0!');
        else if (err?.data?.message?.includes(`softCap > 0`) || err?.message?.includes(`softCap > 0`))
          setError('Softcap should be greater than 0!');
        else if (err?.data?.message?.includes(`softCap < hardCap`) || err?.message?.includes(`softCap < hardCap`))
          setError('Hardcap should be greater than softcap!');
        else if (
          err?.data?.message?.includes(`Owner is a zero address!`) ||
          err?.message?.includes(`Owner is a zero address!`)
        )
          setError('Incorrect pool owner address!');
        else if (
          err?.data?.message?.includes(`dexCapPercent is 51~99%`) ||
          err?.message?.includes(`dexCapPercent is 51~99%`)
        )
          setError('The amount for liquidity to DEX should be greater than 51%!');
        else if (err?.data?.message?.includes(`dexRate > 0!`) || err?.message?.includes(`dexRate > 0!`))
          setError('DEX rate should be greater than 0!');
        else if (err?.data?.message?.includes(`presaleRate > 0!`) || err?.message?.includes(`presaleRate > 0!`))
          setError('presale rate should be greater than 0!');
        else if (err?.data?.message?.includes(`percentFee!`) || err?.message?.includes(`percentFee!`))
          setError('Incorrect percent fee!');
        else if (
          err?.data?.message?.includes(`insufficient funds for transfer`) ||
          err?.message?.includes(`insufficient funds for transfer`)
        )
          setError('Insufficient funds for transfer!');
        else setError('Oops, Something went wrong, Failed in creating a presale');
        setIsConfirming(false);
      }
    }
  };
  const onConfirm = async () => {
    goComplete(poolAddress);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };
  return (
    <>
      {/* {complete ? ( */}
      {/* <SweetAlert
        success
        title="Good job!"
        onConfirm={onConfirm}
        style={{ color: 'black' }}
        confirmBtnStyle={{ textDecoration: 'none', padding: '10px 30px', backgroundColor: 'antiquewhite' }}
      >
        Successfully Listed!
      </SweetAlert> */}
      {/* ) : (
        ''
      )} */}

      <Dialog open={complete}>
        <DialogContent sx={{ minWidth: 400 }}>
          <Stack alignItems="center">
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h3">Good job!</Typography>
            <Typography>Successfully Listed!</Typography>
            <Button variant="contained" onClick={onConfirm} sx={{ mt: 5 }}>
              OK
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Snackbar open={error !== false} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%', wordBreak: 'break-all' }}>
          {error}
        </Alert>
      </Snackbar>
      <Paper
        sx={{
          p: '20px 30px',
          mx: 'auto',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(6px)'
        }}
      >
        <Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Total Token</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {Number(formatUnits(totalSupply, decimals)).toLocaleString('en')}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Token Name</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {name}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Token Symbol</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {symbol}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Token Decimal</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {decimals}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Presale Rate</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {presale_rate} {symbol}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Listing Rate</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {dex_rate} {symbol}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>SoftCap</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {soft_cap} {network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'ETH' : 'BNB'}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>HardCap</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {hard_cap} {network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'ETH' : 'BNB'}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Minimum Buy</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {min_buy} {network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'ETH' : 'BNB'}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Maximum Buy</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {max_buy} {network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'ETH' : 'BNB'}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Liquidity</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {dex_amount} %
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Start Time</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              <Moment format="YYYY-MM-DD HH:mm">{new Date(start_date)}</Moment>
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>End Time</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              <Moment format="YYYY-MM-DD HH:mm">{new Date(end_date)}</Moment>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Estimated DEX Listing Time</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              <Moment format="YYYY-MM-DD HH:mm">{new Date(list_date)}</Moment>
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Liquidity Lock Time Period</span>
            <Stack component="span" color="success.main" marginLeft="15px">
              {dex_lockup}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Website</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {website}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Twitter</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {twitter}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Telegram</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {telegram}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Github</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {github}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Discord</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {discord}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Reddit</span>
            <Stack component="span" color="error.main" marginLeft="15px">
              {reddit}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Twitter Followers</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {twitter_followers}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Roadmap Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {roadmap_description}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>About Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {about_description}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Features Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {features_description}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Teams Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {teams_description}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Tokenomics Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {tokenomics_description}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Roadmap Url</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {roadmap_url}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>About Url</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {about_url}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Features Url</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {features_url}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Teams Url</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {teams_url}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Tokenomics Url</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {tokenomics_url}
            </Stack>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Description</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {description}
            </Stack>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
            <span>Tier</span>
            <Stack component="span" color="success.main" marginLeft="15px" wordwrap="word-break">
              {tier}
            </Stack>
          </Stack>
        </Stack>
        {teamVesting_amount > 0 ? (
          <>
            <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
              <span>Team Vesting Amount</span>
              <Stack component="span" color="success.main" marginLeft="15px">
                {teamVesting_amount} {symbol}
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
              <span>First token release</span>
              <Stack component="span" color="success.main" marginLeft="15px">
                {teamVesting_first_percent} %
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
              <span>First token period</span>
              <Stack component="span" color="success.main" marginLeft="15px">
                {teamVesting_first_period} days
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
              <span>Each token percent</span>
              <Stack component="span" color="success.main" marginLeft="15px">
                {teamVesting_each_percent} %
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" fontSize="0.85rem">
              <span>Each token period</span>
              <Stack component="span" color="success.main" marginLeft="15px">
                {teamVesting_each_period} days
              </Stack>
            </Stack>
          </>
        ) : (
          ''
        )}

        {/* {complete ? (
          <Stack direction="row" justifyContent="center">
            <Button variant="contained" color="secondary" style={{ marginTop: 20, marginLeft: 4 }} onClick={goComplete}>
              Complete
            </Button>
          </Stack>
        ) :  */}
        {!isConfirming ? (
          <Stack direction="row" justifyContent="center">
            <Button variant="outlined" color="secondary" style={{ marginTop: 20 }} onClick={goBack}>
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: 20, marginLeft: 4 }}
              onClick={handleConfirm}
            >
              Complete
            </Button>
          </Stack>
        ) : (
          // <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          <HashLoader color="#59f1f6" size={50} />
        )}
      </Paper>
    </>
  );
};
export default FinishStep;
