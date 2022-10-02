import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Link, ListItemIcon, ListItemText, Button, Stack, Typography, Divider } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import { useDispatch, useSelector } from 'react-redux';
import { setupNetwork } from 'utils/wallet';
import { switchNetwork } from 'redux/slices/network';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import MHidden from 'components/@material-extend/MHidden';
import { imageURL } from '../../utils';

// ----------------------------------------------------------------------

const CHAINS = [
  {
    value: Number(process.env.REACT_APP_ETHEREUM_CHAINID),
    label: 'Ethereum',
    icon: '/chains/eth.png'
  },
  {
    value: Number(process.env.REACT_APP_BSC_CHAINID),
    label: 'Binance Smart Chain',
    icon: '/chains/bsc.png'
  },
  {
    value: Number(process.env.REACT_APP_FTM_CHAINID),
    label: 'FTM',
    icon: '/chains/ftm.png'
  },
  {
    value: Number(process.env.REACT_APP_AVAX_CHAINID),
    label: 'AVAX',
    icon: '/chains/avax.png'
  },
  {
    value: Number(process.env.REACT_APP_MATIC_CHAINID),
    label: 'MATIC',
    icon: '/chains/polygon.png'
  }
];

// ----------------------------------------------------------------------

export default function NetworkPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [curID, setCurrentIndex] = useState(0);
  const network = useSelector((state) => state.network.chainId);
  const dispatch = useDispatch();
  const { chainId } = useActiveWeb3React();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = async (id) => {
    alert('Coming Soon');
    console.log(id);
    setOpen(false);

    const result = await setupNetwork(id);
    if (result === -1) dispatch(switchNetwork(id));
  };

  return (
    <>
      <MHidden width="mdDown">
        {/* <Box
          component="select"
          marginRight="10px"
          variant="outlined"
          ref={anchorRef}
          height="40px"
          onClick={handleOpen}
          fontSize={'12px'}
          onChange={() => alert('Coming Soon')}
          sx={{ color: 'primary.light', borderColor: 'primary.light', fontSize: '12px !important' }}
          className="p-2 rounded bg-dark btn text-white shadow-0 position-relative"
          id="cars"
        > */}
        {/* {(process.env.REACT_APP_MODE == 'testnet' ? TEST_CHAINS : CHAINS).find((ele) => ele.value == network)?.label} */}
        {/* <option>Networks</option>
          <option>
            <Box component={'image'} src={imageURL('angle_down.png')} sx={{ width: 20 }} /> BSC
          </option>
          <option>ETH</option>
          <option>FTM</option>
          <option>AVAX</option>
          <option>MATIC</option>
        </Box> */}

        <Box
          component="button"
          width={'100%'}
          marginRight="10px"
          ref={anchorRef}
          fontSize={'12px'}
          onClick={handleOpen}
          className="p-2 rounded bg-dark btn text-white shadow-0 position-relative justify-content-center"
          display="flex"
          // onChange={() => alert('Coming Soon')}
          // width="100px" height="42px"
        >
          <Stack direction="row" alignItems="center" spacing={1} display="flex" justifyContent="center">
            {/* <Box component="img" src={CHAINS.find((ele) => ele.index === curID)?.icon} sx={{ width: 20 }} /> */}
            <MHidden width="mdDown">
              <Box variant="body2" fontSize={'12px'}>
                Networks
              </Box>
            </MHidden>
            <Box component="img" src={imageURL('angle_down.png')} sx={{ width: 20 }} />
          </Stack>
        </Box>

        <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} backgroundColor="#232323">
          <Box sx={{ py: 1 }} backgroundColor="#232323" fontSize={'12px'}>
            {CHAINS.map((option) => (
              <MenuItem
                key={option.value}
                // selected={option.value === network}
                backgroundColor="#232323"
                onClick={() => handleClose(option.index)}
                sx={{ py: 1, px: 2.5 }}
              >
                <Stack direction="row" alignItems="center">
                  <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                  {/* <MHidden width="mdDown"> */}
                  <Box variant="body2" marginLeft="8px" fontSize={'12px'}>
                    {option.label}
                  </Box>
                  {/* </MHidden> */}
                </Stack>
              </MenuItem>
            ))}
          </Box>
        </MenuPopover>
      </MHidden>
      {/* <MHidden width="mdUp">
        <Box
          component="select"
          variant="outlined"
          ref={anchorRef}
          height="40px"
          width="100%"
          // onClick={handleOpen}
          sx={{ color: 'primary.light', borderColor: 'primary.light', fontSize: '12px !important' }}
          className="p-2 rounded bg-dark btn text-white shadow-0 position-relative"
          id="cars"
        > */}
      {/* {(process.env.REACT_APP_MODE == 'testnet' ? TEST_CHAINS : CHAINS).find((ele) => ele.value == network)?.label} */}
      {/* <option sx={{ fontSize: '12px' }}>Networks</option>
          <option>
            <Box component={'image'} src={imageURL('angle_down.png')} sx={{ width: 20 }} /> BSC
          </option>
          <option>ETH</option>
          <option>FTM</option>
          <option>AVAX</option>
          <option>MATIC</option>
        </Box>
      </MHidden> */}
      {/* <Button
        variant="outlined"
        ref={anchorRef}
        onClick={handleOpen}
        // sx={{ color: 'primary.light', borderColor: 'primary.light' }}
        className="p-2 rounded bg-dark btn text-white shadow-0 position-relative"
      >
        {CHAINS.find((ele) => ele.value == network)?.label}
      </Button>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {CHAINS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === network}
              onClick={() => handleClose(option.value)}
              sx={{ py: 1, px: 2.5 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                <Typography variant="body2">{option.label}</Typography>
              </Stack>
            </MenuItem>
          ))} */}
      {/* <Divider />
          {(CHAINS).map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === network}
              onClick={() => handleClose(option.value)}
              sx={{ py: 1, px: 2.5 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 20 }} />
                <Typography variant="body2">{option.label}</Typography>
              </Stack>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem sx={{ py: 1, px: 2.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link
                href={
                  process.env.REACT_APP_MODE == 'testnet'
                    ? process.env.REACT_APP_MAINNET_URL
                    : process.env.REACT_APP_TESTNET_URL
                }
                target="_blank"
                color="primary"
                fontSize={16}
              >
                {process.env.REACT_APP_MODE == 'testnet' ? 'Switch to Mainnet' : 'Switch to Testnet'}
              </Link>
            </Stack>
          </MenuItem>
        </Box>
      </MenuPopover> */}
    </>
  );
}
