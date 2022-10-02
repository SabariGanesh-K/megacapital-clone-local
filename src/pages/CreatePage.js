import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAddress,
  setError,
  setParsed,
  setApproved,
  setAllowance,
  setTotalSupply
} from '../redux/slices/tokenListing';
import { useLocation, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Container,
  Box,
  Paper,
  TextField,
  Alert as MuiAlert,
  Stack,
  Typography,
  Divider,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Link,
  Dialog,
  DialogContent
} from '@mui/material';
import MainInfo from './create/MainInfo';
import AdditionalInfo from './create/AdditionalInfo';
import FinishStep from './create/FinishStep';
import { useNavigate } from 'react-router';
import { useTokenContract } from '../hooks/useContract';
import { IDO_ADDRESS } from '../config/constants';
import { useWeb3React } from '@web3-react/core';
import Loader from 'react-loader-spinner';
import HashLoader from 'react-spinners/HashLoader';
import { formatUnits, commify } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { useSnackbar } from 'notistack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Page from 'components/Page';

const steps = [
  {
    title: 'Approve Token',
    desc: 'Enter the token address and approve'
  },
  {
    title: 'Presale Information',
    desc: 'Enter the Presale information'
  },
  {
    title: 'Project Information',
    desc: 'Add project links, description and select tier'
  },
  {
    title: 'Submit',
    desc: 'Submit your presale'
  }
];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Create() {
  const { account } = useWeb3React();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const network = useSelector((state) => state.network.chainId);
  const address = useSelector((state) => state.tokenListing.address);
  const error = useSelector((state) => state.tokenListing.error);
  const symbol = useSelector((state) => state.tokenListing.symbol);
  const name = useSelector((state) => state.tokenListing.name);
  const totalSupply = useSelector((state) => state.tokenListing.totalSupply);
  const decimals = useSelector((state) => state.tokenListing.decimals);
  const approved = useSelector((state) => state.tokenListing.approved);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  // 0xD556Be2846DC9da80C3551D83c42A7Ad94bdADD8
  const [isApproving, setIsApproving] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const tokenContract = useTokenContract(address);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      if (address != '') {
        try {
          const symbol = await tokenContract.symbol();
          const name = await tokenContract.name();
          const decimals = await tokenContract.decimals();
          const totalSupply = await tokenContract.totalSupply();
          if (!unmounted) {
            dispatch(setTotalSupply(totalSupply));
            dispatch(setError(''));
            dispatch(
              setParsed({
                symbol,
                name,
                decimals
              })
            );
          }
          console.log({
            symbol,
            name,
            decimals
          });
          console.log(IDO_ADDRESS[network]);
          const allowance = await tokenContract.allowance(account, IDO_ADDRESS[network]);

          console.log(allowance);
          const balance = await tokenContract.balanceOf(account);
          if (!unmounted) {
            if (balance.lte(BigNumber.from(0))) {
              dispatch(setError('No balance'));
              dispatch(setApproved(false));
            }
            if (balance.gt(allowance)) dispatch(setApproved(false));
            else {
              dispatch(setApproved(true));
              dispatch(setAllowance(balance));
            }
          }
        } catch (err) {
          console.log(err);
          dispatch(setError('Invalid Token Address'));
          dispatch(setApproved(false));
        }
      } else {
        dispatch(setError(''));
        dispatch(setApproved(false));
      }
      setIsParsing(false);
    })();
    return () => {
      unmounted = true;
    };
  }, [address, network, account]);

  const handleTokenAddress = async (e) => {
    if (!account) {
      enqueueSnackbar('Please login with your wallet!', {
        variant: 'error'
      });
      return;
    }
    setIsParsing(true);
    dispatch(setAddress(e.target.value));
  };
  const handleApprove = async (e) => {
    if (!isApproving) {
      try {
        setIsApproving(true);
        const balance = await tokenContract.balanceOf(account);
        const tx = await tokenContract.approve(IDO_ADDRESS[network], balance);
        await tx.wait();
        dispatch(setAllowance(balance));
        setIsApproving(false);
        goNext();
      } catch (err) {
        setIsApproving(false);
        enqueueSnackbar('Failed in approving!', {
          variant: 'error'
        });
      }
    }
  };

  const goNext = () => {
    if (activeStep < 3)
      setActiveStep((current) => {
        return current + 1;
      });
  };
  const goBack = () => {
    if (activeStep > 0)
      setActiveStep((current) => {
        return current - 1;
      });
  };
  const goComplete = (address) => {
    navigate(`/presale/${address}`);
  };

  return (
    <Page title="Create Presale">
      <Container maxWidth="lg">
        <Box sx={{ mt: 5 }}>
          <Stepper alternativeLabel activeStep={activeStep} sx={{ mb: 5 }}>
            {steps.map((label, index) => (
              <Step key={label.title} completed={index < activeStep}>
                <StepLabel>
                  <Stack fontSize="1.2rem">{label.title}</Stack>
                  <Typography fontSize="0.8rem">{label.desc} </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == 0 ? (
            <Paper
              sx={{
                p: 10,
                mx: 'auto'
                // background: 'rgba(255, 255, 255, 0.2)'
                // backdropFilter: 'blur(6px)'
              }}
            >
              {/* ====================zubair====================== */}

              {/* <AdditionalInfo goBack={goBack} goNext={goNext}></AdditionalInfo> */}

              {/* ====================zubair====================== */}

              <Stack>
                <TextField
                  fullWidth
                  label="Token Address"
                  type="text"
                  error={Boolean(error)}
                  helperText={error}
                  value={address}
                  onChange={handleTokenAddress}
                  sx={{
                    width: 1
                  }}
                />
              </Stack>
              {isParsing ? (
                <>
                  <Loader type="ThreeDots" color="#00BFFF" height={30} width={30} />
                  {/* <HashLoader color="#59f1f6" /> */}
                </>
              ) : address != '' && error == '' && !approved ? (
                <Stack sx={{ marginTop: '30px' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <span>Name</span>
                    <span>{name}</span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" justifyContent="space-between">
                    <span>Symbol</span>
                    <span>{symbol}</span>
                  </Stack>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" justifyContent="space-between">
                    <span>Total Supply</span>
                    <span>{commify(formatUnits(totalSupply, decimals))}</span>
                  </Stack>
                  {/* <Stack direction="row" justifyContent="space-between">
                    <span>Decimals</span>
                    <span>{decimals}</span>
                  </Stack> */}
                  <Stack direction="row" justifyContent="center">
                    {isApproving ? (
                      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
                    ) : (
                      <Button variant="contained" color="secondary" style={{ marginTop: 20 }} onClick={handleApprove}>
                        Approve
                      </Button>
                    )}
                  </Stack>
                  <Alert
                    variant="outlined"
                    severity="warning"
                    sx={{ mt: 2, fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    Make sure the token has 'Exclude transfer fee' and 'Exclude Max Transaction' if you use Tax/Fees or
                    Max Transaction limits.
                  </Alert>
                </Stack>
              ) : address != '' && error == '' && approved ? (
                <Stack sx={{ marginTop: '30px' }}>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <Stack direction="row" justifyContent="center">
                    <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={goNext}>
                      Next
                    </Button>
                  </Stack>
                  <Alert
                    variant="outlined"
                    severity="warning"
                    sx={{ mt: 2, fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto' }}
                  >
                    Make sure the token has 'Exclude transfer fee' and 'Exclude Max Transaction' if you use Tax/Fees or
                    Max Transaction limits.
                  </Alert>
                </Stack>
              ) : (
                ''
              )}
            </Paper>
          ) : activeStep == 1 ? (
            <MainInfo goBack={goBack} goNext={goNext}></MainInfo>
          ) : activeStep == 2 ? (
            <AdditionalInfo goBack={goBack} goNext={goNext}></AdditionalInfo>
          ) : (
            <FinishStep goBack={goBack} goComplete={goComplete}></FinishStep>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default Create;
