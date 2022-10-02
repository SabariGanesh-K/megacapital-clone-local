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
  
  export default function Blog() {
    const { slug } = useParams(); 
    const [processing, setProcessing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const network = useSelector((state) => state.network.chainId);
    const { library, account } = useActiveWeb3React();
    const [blogTitle, setBlogTitle] = useState();
    const [blogImage, setBlogImage] = useState();
    const [blogSdesc, setBlogSdesc] = useState();
    const [blogDesc, setBlogDesc] = useState();
    const [blogId, setBlogId] = useState();

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getSingleBlog/${slug}`, {});
            if (response.data) { 
                var result = response.data.data; 
                setBlogTitle(result.title); setBlogImage(result.image); setBlogSdesc(result.sdescription); setBlogDesc(result.description); setBlogId(result._id);
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
            if(blogTitle!=='' && blogImage!=='' && blogDesc!=='' && blogSdesc!==''){
                const response = await axios.put(`/api/updateBlog/${blogId}`, { title: blogTitle, slug: slugGenerate(blogTitle), image: blogImage, sdescription: blogSdesc, description: blogDesc });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setBlogTitle(''); setBlogImage(''); setBlogSdesc(''); setBlogDesc('');
                    navigate(`/blogList`);
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
            if(blogTitle!=='' && blogImage!=='' && blogDesc!=='' && blogSdesc!==''){
                const response = await axios.post(`/api/createBlog`, { title: blogTitle, slug: slugGenerate(blogTitle), image: blogImage, sdescription: blogSdesc, description: blogDesc });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setBlogTitle(''); setBlogImage(''); setBlogSdesc(''); setBlogDesc('');
                    navigate(`/blogList`);
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
      <Page title="Blog List">
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
            <Typography variant="h4">{ slug ? 'Edit Blog' : 'Add New Blog' }
                <Box
                    component='button'
                    borderRadius={1}
                    padding='10px 5px'
                    style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12 }}
                    onClick={() => navigate('/blogList')}
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
                    value={blogTitle}
                    name="title"
                    sx={{ width: 1 }}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    InputLabelProps={{ shrink: blogTitle?true:false }}  
                />

                <TextField
                    fullWidth
                    label="Image URL"
                    type="text"
                    required
                    name="image"
                    value={blogImage}
                    sx={{ width: 1 }}
                    onChange={(e) => setBlogImage(e.target.value)}
                    InputLabelProps={{ shrink: blogImage?true:false }} 
                />

                <TextField
                    fullWidth
                    multiline
                    InputProps={{ rows: 3 }}
                    name="sdescription"
                    required
                    value={blogSdesc}
                    label="Short Description"
                    sx={{ width: 1 }}
                    onChange={(e) => setBlogSdesc(e.target.value)}
                    InputLabelProps={{ shrink: blogSdesc?true:false }} 
                />

                <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    InputProps={{ rows: 5 }}
                    name="description"
                    required
                    value={blogDesc}
                    label="Description"
                    sx={{ width: 1 }}
                    onChange={(e) => setBlogDesc(e.target.value)}
                    InputLabelProps={{ shrink: blogDesc?true:false }} 
                />
            </Stack>
            <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
                <Button size="large" variant="contained" class="btn btn-info text-light mt-2 mx-4" onClick={slug ? handleUpdate : handleCreate}>
                {processing ? <HashLoader color="#59f1f6" size={30} /> : 'Create Blog'}
                </Button>
            </Stack>
          </Card>
        </Container>
      </Page>
    );
  }
  