import {
    Box,
    Stack,
    Typography,
    Button,
    Card,
    CardHeader,
    Divider,
    TextField,
    TextareaAutosize,
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
  import { useParams } from 'react-router-dom'
  
  const TitleStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    height: 44,
    color: 'inherit',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
  }));
  
  export default function NewsCreation() {
    const { slug } = useParams(); 
    const [processing, setProcessing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const network = useSelector((state) => state.network.chainId);
    const { library, account } = useActiveWeb3React();
    const [newsTitle, setNewsTitle] = useState();
    const [newsImage, setNewsImage] = useState();
    const [newsSdesc, setNewsSdesc] = useState();
    const [newsDesc, setNewsDesc] = useState();
    const [newsId, setNewsId] = useState();

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getSingleNews/${slug}`, {});
            if (response.data) { 
                var result = response.data.data; 
                setNewsTitle(result.title); setNewsImage(result.image); setNewsSdesc(result.sdescription); setNewsDesc(result.description); setNewsId(result._id);
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

    const slugGenerate = (blogTitle) => {
        return blogTitle.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    const handleUpdate = async () => {
        try {
            if(newsTitle!=='' && newsImage!=='' && newsDesc!=='' && newsSdesc!==''){
                const response = await axios.put(`/api/updatenews/${newsId}`, { title: newsTitle, slug: slugGenerate(newsTitle), image: newsImage, sdescription: newsSdesc, description: newsDesc });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setNewsTitle(''); setNewsImage(''); setNewsSdesc(''); setNewsDesc('');
                    navigate(`/NewsList`);
                } else {
                    enqueueSnackbar('failed', {
                        variant: 'danger'
                    });
                }
            }
        } catch (error) {
            enqueueSnackbar('Oops, Something went wrong!', {
              variant: 'error'
            });
        }
    }
  
    const handleCreate = async () => {
        try {
            if(newsTitle!=='' && newsImage!=='' && newsDesc!=='' && newsSdesc!==''){
                const response = await axios.post(`/api/createNews`, { title: newsTitle, slug: slugGenerate(newsTitle), image: newsImage, sdescription: newsSdesc, description: newsDesc });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setNewsTitle(''); setNewsImage(''); setNewsSdesc(''); setNewsDesc('');
                    navigate(`/newsList`);
                } else {
                    enqueueSnackbar('failed', {
                        variant: 'danger'
                    });
                }
            }
        } catch (error) {
            enqueueSnackbar('Oops, Something went wrong!', {
              variant: 'error'
            });
        }
    };
  
    return (
      <Page title="News List">
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
            <Typography variant="h4">{ slug ? 'Edit News' : 'Add New News' }
                <Box
                    component='button'
                    borderRadius={1}
                    padding='10px 5px'
                    style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12 }}
                    onClick={() => navigate('/newsList')}
                >
                    {'Back'}
                </Box>
            </Typography>
            <Divider />

            <Stack sx={{ mt: 2 }} spacing={3}>
                <TextField
                    fullWidth
                    autoFocus
                    required
                    label="Title"
                    type="text"
                    value={newsTitle}
                    name="title"
                    sx={{ width: 1 }}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    InputLabelProps={{ shrink: newsTitle?true:false }}  
                />

                <TextField
                    fullWidth
                    label="Image URL"
                    type="text"
                    required
                    name="image"
                    value={newsImage}
                    sx={{ width: 1 }}
                    onChange={(e) => setNewsImage(e.target.value)}
                    InputLabelProps={{ shrink: newsImage?true:false }} 
                />

                <TextField
                    fullWidth
                    multiline
                    InputProps={{ rows: 3 }}
                    name="sdescription"
                    required
                    value={newsSdesc}
                    label="Short Description"
                    sx={{ width: 1 }}
                    onChange={(e) => setNewsSdesc(e.target.value)}
                    InputLabelProps={{ shrink: newsSdesc?true:false }} 
                />

                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    InputProps={{ rows: 5 }}
                    name="description"
                    required
                    value={newsDesc}
                    label="Description"
                    sx={{ width: 1 }}
                    onChange={(e) => setNewsDesc(e.target.value)}
                    InputLabelProps={{ shrink: newsDesc?true:false }} 
                />
            </Stack>
            <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
                <Button size="large" variant="contained" class="btn btn-info text-light mt-2 mx-4" onClick={slug ? handleUpdate : handleCreate}>
                {processing ? <HashLoader color="#59f1f6" size={30} /> : 'Create News'}
                </Button>
            </Stack>
          </Card>
        </Container>
      </Page>
    );
  }
  