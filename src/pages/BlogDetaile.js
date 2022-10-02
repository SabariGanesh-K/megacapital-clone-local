import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/Page'
import MHidden from 'components/@material-extend/MHidden'
import { imageURL } from '../utils';
import axios from '../utils/axios';
import moment from 'moment';
import { useNavigate } from 'react-router';
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent
} from '@mui/material';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useParams } from 'react-router-dom'

export default function BlogDetaile(props){
    const { slug } = useParams(); 
    const navigate = useNavigate();
    const [BlogInfo, setBlogInfo] =  useState([]);
    const { account } = useActiveWeb3React();
    const network = useSelector((state) => state.network.chainId);

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getSingleBlog/${slug}`);
            if (response.data) { 
                setBlogInfo(response.data.data);
            } 
          } catch (error) { };
        })();
    }, [account, network]);

    return(
        <Page style={{backgroundColor:"#171819"}}>
            <MHidden width="mdDown">
                <Grid paddingLeft={'11%'} paddingRight={'11%'}>
                    <Grid  align="center" justifyContent="center" paddingTop="60px">
                        <Box component="h1" class="text-info">{BlogInfo.title}</Box>
                        <Box component='button' borderRadius={1} padding='10px 5px' margin='0px 10px' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12, cursor: 'pointer' }} onClick={() => navigate('/blog')}>{'Back'}</Box>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md="12">
                            <Grid container direction="column" sx={{width:"100%"}}>
                                <Box width="100%">
                                    <p style={{'padding-top':'10px'}}>{BlogInfo.sdescription}</p><br />
                                    <img src={BlogInfo.image} width="70%" />
                                    <p style={{'padding-top':'10px'}}>{BlogInfo.description}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid paddingLeft={'5%'} paddingRight={'5%'}>
                    <Grid  align="center" justifyContent="center" paddingTop="60px">
                        <Box component="h1" class="text-info">{BlogInfo.title}</Box>
                        <Box component='button' borderRadius={1} padding='10px 5px' margin='0px 10px' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12, cursor: 'pointer' }} onClick={() => navigate('/blog')}>{'Back'}</Box>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md="12">
                            <Grid container direction="column" sx={{width:"100%"}}>
                                <Box width="100%">
                                    <p style={{'padding-top':'10px'}}>{BlogInfo.sdescription}</p><br />
                                    <img src={BlogInfo.image} width="70%" />
                                    <p style={{'padding-top':'10px'}}>{BlogInfo.description}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MHidden>
        </Page>
    );
}