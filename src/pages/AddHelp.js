import {
    Box,
    Stack,
    Select,
    MenuItem,
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
  
  export default function AddHelp() {
    const { slug } = useParams(); 
    const [processing, setProcessing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const network = useSelector((state) => state.network.chainId);
    const { library, account } = useActiveWeb3React();
    const [formValues, setFormValues] = useState([{ title: '', type: '', image: '', description: ''}]);
    const [hTitle, setHTitle] = useState();
    const [helpId, setHelpId] = useState();

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getSingleHelp/${slug}`);
            if (response.data) { 
                var result = response.data.data; console.log(JSON.parse(result.data));
                setHTitle(result.htitle); setFormValues(JSON.parse(result.data)); setHelpId(result._id);
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

    const slugGenerate = (title) => {
        return title.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const handleUpdate = async () => {
        console.log(JSON.stringify(formValues));
        try {
            if(hTitle!==''){
                const response = await axios.put(`/api/updateHelp/${helpId}`, { htitle: hTitle, slug: slugGenerate(hTitle), data: JSON.stringify(formValues) });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setHTitle(''); setFormValues([{ title: '', type: '', image: '', description: ''}]); 
                    navigate(`/helpList`);
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
            if(hTitle!==''){
                const response = await axios.post(`/api/createHelp`, { htitle: hTitle, slug: slugGenerate(hTitle), data: JSON.stringify(formValues) });
                if (response.data) {
                    let message = response.data.message;
                        enqueueSnackbar('success', {
                        variant: 'success'
                    }); setHTitle(''); setFormValues([{ title: '', type: '', image: '', description: ''}]); 
                    navigate(`/helpList`);
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

    const addFormFields = () => {
        setFormValues([...formValues, { title: "", type: "", image: '', description: '' }])
    }

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }  
  
    return (
      <Page title="Help">
        <Container maxWidth="lg" className="pt-5"> 
          <Card
            sx={{ width: 1, p: 3, transition: 'all .3s', cursor: 'pointer', '&:hover': { boxShadow: (theme) => theme.customShadows.z24 } }}
          >
            <Typography variant="h4">{ slug ? 'Edit Help' : 'Add New Help' }
                <Box
                    component='button'
                    borderRadius={1}
                    padding='10px 5px'
                    style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12 }}
                    onClick={() => navigate('/helpList')}
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
                    label="Help Title"
                    type="text"
                    value={hTitle}
                    name="title"
                    sx={{ width: 1 }}
                    onChange={(e) => setHTitle(e.target.value)}
                    InputLabelProps={{ shrink: hTitle?true:false }}  
                />
            </Stack>
            {formValues.map((element, index) => ( 
                <Stack sx={{ mt: 2 }} key={index} spacing={3}>
                    <TextField
                        fullWidth
                        required
                        label="Title"
                        type="text"
                        value={element.title || ""}
                        name="title"
                        sx={{ width: 1 }}
                        onChange={e => handleChange(index, e)}
                        InputLabelProps={{ shrink: element.title?true:false }}
                    />

                    <Select
                        label="Type"
                        name="type"
                        value= {element.type}
                        onChange={e => handleChange(index, e)}
                    >
                        <MenuItem value="Image">Image</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                    </Select>

                    <TextField
                        fullWidth
                        label="URL"
                        type="text"
                        required
                        name="image"
                        value={element.image || ""}
                        sx={{ width: 1 }}
                        onChange={e => handleChange(index, e)}
                        InputLabelProps={{ shrink: element.image?true:false }} 
                    />

                    <TextField
                        fullWidth
                        multiline
                        InputProps={{ rows: 3 }}
                        name="description"
                        required
                        value={element.description || ""}
                        label="Description"
                        sx={{ width: 1 }}
                        onChange={e => handleChange(index, e)}
                        InputLabelProps={{ shrink: element.description?true:false }} 
                    />
                    {
                        index ? 
                        <div style={{'text-align':'right'}}>
                        <button type="button"  className="btn btn-info text-light mt-2 mx-4" style={{background:'red', width: '10%'}} onClick={() => removeFormFields(index)}>Remove</button> </div>
                        : null
                    }
                </Stack>
            ))}
            <button className="btn btn-info text-light mt-2 mx-4" type="button" onClick={() => addFormFields()}>Add More</button>

            <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
                <Button size="large" variant="contained" class="btn btn-info text-light mt-2 mx-4" onClick={slug ? handleUpdate : handleCreate}>
                {processing ? <HashLoader color="#59f1f6" size={30} /> : 'Submit'}
                </Button>
            </Stack>
          </Card>
        </Container>
      </Page>
    );
  }
  