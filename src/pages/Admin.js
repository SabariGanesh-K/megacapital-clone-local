import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
import MHidden from 'components/@material-extend/MHidden';
import Page from 'components/Page';
// material
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

// hooks
// components

// ----------------------------------------------------------------------
function CustomCard(props) {
  return (
    <>
      <MHidden width="mdDown">
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }}>
          <Box style={{ fontSize: '15px', color: '#24B6E6' }}>{props.name}</Box>
        </Grid>
      </MHidden>
      <MHidden width="mdUp">
        <Grid style={{ backgroundColor: '#232323', borderRadius: 10, padding: '20px' }}>
          <Box style={{ fontSize: '15px', color: '#24B6E6' }} textAlign="center">
            {props.name}
          </Box>
        </Grid>
      </MHidden>
    </>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  return (
    <Page title="Megacapital" style={{ backgroundColor: '#171819' }}>
      <Grid container paddingLeft={'5%'} paddingRight={'5%'} paddingTop="30px">
        <Grid container direction="row" position="relative" display="flex" borderRadius={2}>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              borderRadius={1}
              width="100%"
              color="white"
              border="1px solid #56C5FF"
              padding="3px 8px"
              backgroundColor="rgb(255, 255, 255, 0)"
            >
              <Box component={Link} to={'/create'}  sx={{ textDecoration: 'none' }}>
                CREATE DEALS
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              width="100%"
              borderRadius={1}
              padding="3px 8px"
              style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
              onClick={() => navigate('/create-stake')}
            >
              {' '}
              POOLS{' '}
            </Box>
          </Grid>

          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              borderRadius={1}
              width="100%"
              color="white"
              border="1px solid #56C5FF"
              padding="3px 8px"
              backgroundColor="rgb(255, 255, 255, 0)"
            >
              <Box component="a" href="/calender?admin=true" target={'_blank'} sx={{ textDecoration: 'none' }}>
                CALENDER
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              width="100%"
              borderRadius={1}
              padding="3px 8px"
              style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
            >
              {' '}
              KYC{' '}
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              width="100%"
              borderRadius={1}
              padding="3px 8px"
              style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
            >
              <Box component="a" href="/blogList" sx={{ textDecoration: 'none' }}>
                BLOG
              </Box>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              borderRadius={1}
              width="100%"
              color="white"
              border="1px solid #56C5FF"
              padding="3px 8px"
              backgroundColor="rgb(255, 255, 255, 0)"
              onClick={() => navigate('/newsList')}
            >
              {' '}
              News{' '}
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={12} padding="5px">
            <Box
              component="button"
              width="100%"
              borderRadius={1}
              padding="3px 8px"
              style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
            >
              <Box component="a" href="/helpList" sx={{ textDecoration: 'none' }}>
                Help
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
