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

export default function HelpCenter(props){
    const { slug } = useParams(); 
    const navigate = useNavigate();
    const [helpList, setHelpList] =  useState([]);
    const [helpData, setHelpData] =  useState([]);
    const { account } = useActiveWeb3React();
    const network = useSelector((state) => state.network.chainId);

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`/api/getSingleHelp/${slug}`);
            if (response.data) { 
                setHelpList(response.data.data);
                setHelpData(JSON.parse(response.data.data.data));
            } 
          } catch (error) { };
        })();
    }, [account, network]);

    return(
        <Page style={{backgroundColor:"#171819"}}>
            <MHidden width="mdDown">
              <Grid paddingLeft={'11%'} paddingRight={'11%'}>
                    <Grid  align="center" justifyContent="center" paddingTop="60px">
                    <Box component="h1" class="text-info">{helpList.htitle}</Box>
                    <Box component='button' borderRadius={1} padding='10px 5px' margin='0px 10px' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12, cursor: 'pointer' }} onClick={() => navigate('/helpcenter')}>{'Back'}</Box>
                    </Grid>
                  <Grid container spacing={2}>
                      <Grid item md="12">
                        <Grid container direction="column" sx={{width:"100%"}}>
                          <Box width="100%">
                            {helpData.map((itemData, keys) => (
                                <>
                                <h3 style={{'padding-bottom':'10px'}}>{itemData.title}</h3>
                                {itemData.type=='Image' ? <img src={itemData.image} width="70%" />: <iframe width="100%" src={itemData.image}></iframe>}
                                <p style={{'padding-top':'10px'}}>{itemData.description}</p>
                                </>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                  </Grid>
              </Grid>
            </MHidden>
            <MHidden width="mdUp">
            <Grid paddingLeft={'11%'} paddingRight={'11%'}>
                    <Grid  align="center" justifyContent="center" paddingTop="60px">
                    <Box component="h1" class="text-info">{helpList.htitle}</Box>
                    <Box component='button' borderRadius={1} padding='10px 5px' margin='0px 10px' style={{ backgroundColor: '#dc3545', border: 'none', color: 'white', float: 'right',fontSize: 12, cursor: 'pointer' }} onClick={() => navigate('/helpcenter')}>{'Back'}</Box>
                    </Grid>
                  <Grid container spacing={2}>
                      <Grid item md="12">
                        <Grid container direction="column" sx={{width:"100%"}}>
                          <Box width="100%">
                            {helpData.map((itemData, keys) => (
                                <>
                                <h3 style={{'padding-bottom':'10px'}}>{itemData.title}</h3>
                                {itemData.type=='Image' ? <img src={itemData.image} width="70%" />: <iframe width="100%" src={itemData.image}></iframe>}
                                <p style={{'padding-top':'10px'}}>{itemData.description}</p>
                                </>
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                  </Grid>
              </Grid>
            </MHidden>
        </Page>
    );
}