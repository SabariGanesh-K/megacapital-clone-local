import {
    Box,
    Stack,
    Typography,
    Button,
    Card,
    CardHeader,
    Divider,
    TextField,
    Container,
    Alert,
    AlertTitle,
    linearProgressClasses,
    Link, Table, TableBody, TableHead, TableCell, TableRow
  } from '@mui/material';
  import { DateTimePicker } from '@mui/lab';
  import React, { useCallback, useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useTokenContract } from '../hooks/useContract';
  import { useWeb3React } from '@web3-react/core';
  import useActiveWeb3React from 'hooks/useActiveWeb3React';
  import { styled } from '@mui/material/styles';
  import { useNavigate } from 'react-router';
  import Label from 'components/Label';
  import Page from 'components/Page';
  import { BigNumber } from 'ethers';
  import { LOCK_ADDRESS } from '../config/constants';
  import { formatUnits, parseUnits, commify } from '@ethersproject/units';
  import { useSnackbar } from 'notistack';
  import { useLockContract } from 'hooks/useContract';
  import Loader from 'react-loader-spinner';
  import HashLoader from 'react-spinners/HashLoader';
  import CopyClipboard from 'components/CopyToClipboard';
  import axios from '../utils/axios';
  import { ethers } from 'ethers';
  
  const TitleStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    height: 44,
    color: 'inherit',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
  }));
  
  export default function HelpList() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const network = useSelector((state) => state.network.chainId);
    const { library, account } = useActiveWeb3React();
    const [ HelpLists, SetHelpLists] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getHelp`, {});
            if (response.data) { 
                SetHelpLists(response.data.data);
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
  
    function deleteHelp (event, id) {
        (async () => {
            try {
                const response = await axios.delete(`/api/deleteHelp/${id}`, {});
                if (response.data) { 
                    enqueueSnackbar('Deleted Successfully', {
                        variant: 'success'
                    });
                    window.location.reload();
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
    };
  
    return (
      <Page title="Help List">
        <Container maxWidth="lg" className="pt-5">
          <Card
            sx={{
              width: 1,
              p: 3,
              transition: 'all .3s',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z24
              }
            }}
          >
            <Typography variant="h4">Help List
            <Box
                component='button'
                borderRadius={1}
                padding='10px 5px'
                margin='0px 10px'
                style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white', float: 'right',fontSize: 12 }}
                onClick={() => navigate('/addHelp')}
            >
                {'Add New Help'}
            </Box></Typography>
            <Divider />
            <Stack sx={{ mt: 2 }} spacing={3}>
                <Table>
                    <TableHead>
                        <TableCell>S.No</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Action</TableCell>
                    </TableHead>
                    <TableBody>
                    {HelpLists.map((item, key) => (
                        <TableRow key={key}>
                            <TableCell>{key+1}</TableCell>
                            <TableCell>{item.htitle}</TableCell>
                            <TableCell><a href={`/editHelp/${item.slug}`}>Edit</a>&nbsp;<a onClick={(event) => deleteHelp(event, item._id)}>Delete</a></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Stack>
          </Card>
        </Container>
      </Page>
    );
  }
  