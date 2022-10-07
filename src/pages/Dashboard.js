import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import {PublicKey} from '@solana/web3.js'
import { ExportAbi } from 'utils/exportAbi';
// material
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  TextField
} from '@mui/material';
import {  useLayoutEffect } from 'react';
import apis from 'services';
import { getPools } from 'redux/slices/pools';
import { SearchContext } from 'contexts/SearchContext';
import { useIDOContract, useStakingContract, useTokenContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
import useSettings from 'hooks/useSettings';
// components

import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden'
import { imageURL } from '../utils';
import { useSnackbar } from 'notistack';
import axios from 'axios';
// import { ExportAbi } from 'utils/exportAbi';

// ----------------------------------------------------------------------

export default function Stakepad() {
  const { themeStretch } = useSettings();
  const { hash } = useLocation();

   
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const idoContract = useIDOContract();

  const [search, setSearch] = useContext(SearchContext);

  //Pagination part
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);

  const [tab, setTab] = useState(0);
  const [paneTab, setPaneTab] = useState(0);
  const [filter, setFilter] = useState(-1);
  const [sort, setSort] = useState('createdAt');
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(30);
    const [projectsLen,setprojectslen] = useState(0);
    const [allocationprice,setallocationprice] = useState(0)
  const network = useSelector((state) => state.network.chainId);
  const pools = useSelector((state) => state.pools.pools);
  const totalPage = useSelector((state) => state.pools.totalPage);
  useEffect(() => {
    (async () => {
      
      try {
       
        const response = await apis.getDeals();
        if (response.statusText !== 'OK') return console.log('RESPONSE ->', response);

        const pools = response.data.pools;

        setprojectslen(pools.length)
        let val=0;
        pools.forEach((item)=>{
            val+=parseInt( item.maxAllocationPerUser);
        })
             
        
        setallocationprice(val);
        // console.log("DATA IS",pools);
        // setDeals([])
        // setDeals(pools);
        
      } catch (e) {
        console.error('error occurred while fetching deals');
      }
    })();
  }, []);
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, page, search, tab, sort, filter, account));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, filter, network, page, search, sort, tab]);


  useEffect(() => {
    switch (hash) {
      case '#my-contributions':
        setTab(1);
        break;
      case '#my-alarms':
        setTab(2);
        break;
      case '#my-presales':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [hash]);
  useEffect(()=>{

  },[])
  const TabPanes = [
      { index : 0, name : "MGV BSC"},
      { index : 1, name : "MEGA MATIC"},
      { index : 2, name : "MEGA AVAX"},
      { index : 3, name : "MEGA FTM"},
  ]
  const [usermail,setusermail] = useState("");
  
  return (
    <Page title="Megacapital"  style={{backgroundColor:"#171819"}} >
      {/* <Container maxWidth='md'> */}
            <MHidden width="mdDown">
                <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop="30px"  >
                    <Grid container direction="row" position="relative" display="flex">
                        <Grid item direction="row" height="60px" display="flex">
                            <Box bgcolor={'#232323'} borderRadius={1} justifyContent="center" display="flex">
                                {TabPanes.map(pane => (
                                paneTab === pane.index ?
                                <Box component="button" onClick={() => setPaneTab(pane.index)} style={{color:"white", backgroundColor:"#56C5FF", border:"none", borderRadius:4}} padding="10px">{pane.name}</Box> : 
                                <Box component="button" onClick={() => setPaneTab(pane.index)} style={{color:"#56C5FF", backgroundColor:"rgb(255, 255, 255, 0)", border:"none"}} padding="10px">{pane.name}</Box>
                                ))}
                            </Box>
                        </Grid>
                        <Box component="button" position="absolute" right="5px" style={{backgroundColor: "#24B6E6", border:"none", height:'58px', color:"white", borderRadius:8, width:"120px" }}> KYC </Box>
                    </Grid>
                    <ProgressCard></ProgressCard>
                    <Grid container direction={"row"} marginTop="30px" spacing={2} >
                        <Grid item md="6"><AddressCard src={imageURL('email.svg')} title="Email" address={usermail}></AddressCard></Grid>
                        <Grid item md="6"><AddressCard src={imageURL('solana-sol-logo 1.png')} title="Solana address" address="1231sdsxssds....124" token={1}></AddressCard></Grid>
                    </Grid>
                    <Grid marginTop="20px" color="#56C5FF" fontSize="34px">
                        Projects
                    </Grid>
                    <Grid container direction={"row"} marginTop="30px" spacing={2} >
                        <Grid item md="6"><ProjectCard title="Allocated Projects" amount= {projectsLen} ></ProjectCard></Grid>
                        <Grid item md="6"><ProjectCard title="Total Allocated" amount={allocationprice}></ProjectCard></Grid>
                    </Grid>
                    <Grid marginTop="20px" color="#56C5FF" fontSize="34px">
                        My Projects
                    </Grid>
                    <MyProjectCard angle="down"></MyProjectCard>
                    {/* <MyProjectCard angle="up"></MyProjectCard> */}
                    <MyLocationCard></MyLocationCard>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid paddingLeft={'5%'} paddingRight={'5%'} paddingTop="30px"  >
                    <Grid container direction="row" position="relative" display="flex" borderRadius={2}>
                        <Grid item xs={6} padding="5px">
                            <Box component="button" borderRadius={1} width="100%" color="white" border="1px solid #56C5FF" padding="3px 8px" backgroundColor="rgb(255, 255, 255, 0)">
                                MEGA BSC
                            </Box>
                        </Grid>
                        <Grid item xs={6} padding="5px">
                            <Box component="button" width="100%" borderRadius={1} padding="3px 8px" style={{backgroundColor: "#24B6E6", border:"none", color:"white"}}> KYC </Box>
                        </Grid>
                    </Grid>
                    <ProgressCard></ProgressCard>
                    <Grid container marginTop="30px" spacing={2} >
                        <Grid item xs="12"><AddressCard src={imageURL('email.svg')}  title="Email" address="Info@megacapital.io"></AddressCard></Grid>
                        <Grid item xs="12"><AddressCard src={imageURL('solana-sol-logo 1.png')} title="Solana address" address="1231sdsxssds....124" token={1}></AddressCard></Grid>
                    </Grid>
                    <Grid marginTop="20px" color="#56C5FF" fontSize="20px"  display="flex" justifyContent="center">
                        Projects
                    </Grid>
                    <Grid container direction={"row"} marginTop="10px" spacing={2} >
                        <Grid item xs="6"><ProjectCard title="Allocated Projects"amount= {projectsLen} ></ProjectCard></Grid>
                        <Grid item xs="6"><ProjectCard title="Total Allocated" amount={allocationprice}></ProjectCard></Grid>
                    </Grid>
                    <Grid marginTop="20px" marginBottom="20px" color="#56C5FF" fontSize="20px"  display="flex" justifyContent="center">
                        My Projects
                    </Grid>
                    <MyProjectCard angle="down"></MyProjectCard>
                    <MyLocationCard></MyLocationCard>
                </Grid>
            </MHidden>
      {/* </Container> */}
    </Page>
  );
}
function VoteCard(props){
    return(
            <Grid container bgcolor={'#272727'} direction="row" sx={{width:"100%"}} padding="5px" marginTop="40px">
                <Grid item container md="7" sm="12" direction="row" >
                    <Box item component="img" src="img/catecoin.webp"></Box>
                    <Box item marginTop='13px' marginLeft="10px"> {props.name}</Box>
                </Grid>
                <Grid item md="1"sm="3" >
                    <Box marginTop='13px'>NFT</Box>
                </Grid>
                <Grid item md="1.5" sm="3">
                    <Button class="btn btn-info text-light mx-2 px-5 mt-2">YES</Button>
                </Grid>
                <Grid item md="1.5" sm="3">
                    <Button class="btn btn-outline-info mx-2 px-5 mt-2">NO</Button>
                </Grid>
                <Grid item md="1" sm="3">
                    <Button><i class="Nft-arrow fa-solid fa-angle-down text-info mx-5 pt-3"></i></Button>
                </Grid>
            </Grid>
    );
}
function ProgressCard(){
    // const { library, account } = useActiveWeb3React();
    const [value, setValue] = React.useState(30);
    const conds = {alpha:1000,beta:2000,gamma:3000,delta:4000,epsilon:5000}
    const [tier, settier] = useState('');
    const contr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const polygonContract = new ethers.Contract(contr, ExportAbi, signer); 

    // const polygonContract = useTokenContract(contr);
    useEffect(()=>{
        const requestAccounts = async () => {
            await provider.send("eth_requestAccounts", []);
            // setloggedinstatus(true)
          }
        const getbalance = async() =>{
            let bal = await polygonContract.balanceOf("0x5c1a4F5AE38D4199868D53ad28B1095930a1485D")
            // alert(bal)
            alert(bal)
            
            if(bal<=conds.alpha){
                settier("Alpha");
            }
            else if(bal<=conds.beta){
                settier("Beta")
            }
            else if(bal<=conds.delta){
                settier("Gamma")
            }
            else if(bal<=conds.epsilon){
                settier("Epsilon")
            }
            else{
                settier("Zeta")
            }
        }
        try {
            requestAccounts()
            getbalance()
        } catch (error) {
            console.log("some",error);
        }
    
    

    },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
    <Grid container direction="row" marginTop="30px">
        <Grid item container md="3" direction="column" style={{backgroundColor:"#232323", borderRadius:5}}>
            <Grid item  padding="10px"><Box component="img" width="100%" height="100px" position="relative" src={imageURL('bit.png')} ></Box></Grid>
            <Grid item  padding="10px" display="flex" position="relative" marginTop="10px">
                <Box fontSize="19px">MEGA</Box>
                <Box position="absolute" padding="5px 10px 5px 10px" borderRadius={0.5} right="12px" style={{backgroundColor:"rgba(255, 255, 255, 0.1)", color:"white"}}> {tier} </Box>
            </Grid>
            <Grid item marginTop="10px"><Box component="button" border="none" borderRadius={1} height="30px" width="100%" style={{backgroundColor:"#56C5FF", color:"white"}}>INFO</Box></Grid>
        </Grid>
        <MHidden width="mdDown">
        <Grid container item width="73%" marginLeft="2%" paddingLeft="20px" style={{backgroundColor:"#232323", borderRadius:5}}>
            <Grid md="8"> <Box marginTop="20px" component="h3" color="#56C5FF">Progress</Box></Grid>
            <Grid container direction="row">
                <Grid item md="2.4"><MySlideBar current={1.59} title="Alpha"></MySlideBar></Grid>
                <Grid item md="2.4"><MySlideBar current={3.18} title="Beta"></MySlideBar></Grid>
                <Grid item md="2.4"><MySlideBar current={6.35} title="Gamma"></MySlideBar></Grid>
                <Grid item md="2.4"><MySlideBar current={12.70} title="delta"></MySlideBar></Grid>
                <Grid item md="2.4"><MySlideBar current={25.40} title="Epilson"></MySlideBar></Grid>
                <Grid item md="2.4"><MySlideBar current={50.81} title="Zeta"></MySlideBar></Grid>
            </Grid>
        </Grid>
        </MHidden>
        <MHidden width="mdUp">
            <Grid backgroundColor="#232323" borderRadius={1} container marginTop="20px" paddingBottom="30px" >
                <Grid item xs={12} marginTop="20px" justifyContent="center" display="flex" color="#56C5FF">Tier</Grid>
                <Grid item xs={12} marginTop="30px">
                    <Box position="relative" display="flex">
                        <Box width="100%" height="10px" borderRadius={2} backgroundColor="white"/>
                        <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(50/100*100%)`} backgroundColor="#56C5FF"/>
                        {/* <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(${props.current}/100*100%)`} backgroundColor="#56C5FF"/> */}
                    </Box>
                </Grid>
                <Grid item xs={12} justifyContent="center"  display="flex">
                    <Box color="white">Alpha</Box>
                    <Box color="white">...MGV</Box>
                </Grid>
            </Grid>
        </MHidden>
    </Grid>
    );
}
function MySlideBar(props){
    return(
        <>
        <Box sx={{ width: "97%" }}>
        
        <Box position="relative" display="flex">
            <Box width="100%" height="10px" borderRadius={2} backgroundColor="white"/>
            <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(${props.current}/100*100%)`} backgroundColor="#56C5FF"/>
        </Box>
        </Box>
        <Box position="relative">
            <Box position="absolute" left="1px" color="white">{props.title}</Box>
            {/* <Box position="absolute" right="15px" color="#696974">0 MEGA</Box> */}
        </Box>
        </>
    );
}
function AddressCard(props){
   
    // 0x00172998d5130D93399c0d9FC14af0762aD9aAeB
    const contr = '0x8cB675ed507Bf4eDb18Cf0D141e0d7e3E1A81a27';
    const abi =   [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newval",
              "type": "string"
            }
          ],
          "name": "changeMail",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newval",
              "type": "string"
            }
          ],
          "name": "changeSolanaAdd",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "returnUserData",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "mail",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "solanaAdd",
                  "type": "string"
                }
              ],
              "internalType": "struct Lock.User",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      const [mailtoggle,setmailtoggle] = useState(false);
const [newmail,setnewmail] = useState("");
const [address,setaddress] = useState(props.address);
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contr, abi, signer);  
      useEffect(()=>{
        const requestAccounts = async () => {
            await provider.send("eth_requestAccounts", []);
            // setloggedinstatus(true)
          }
          const getDatas = async() =>{
            let data = await contract.returnUserData(); 
            // alert("xwaswa",data.mail)
            if (props.title[0]=="E"){
                setaddress(data.mail)
            }
            else{
                setaddress(data.solanaAdd)
            }
          }
          requestAccounts()
          getDatas()
      },[])
     
      

const togglemail = () =>{
  setmailtoggle(!mailtoggle);
}
const handlemailchange = (e) =>{

    setnewmail(e.target.value);
}
const handlesubmit = async() =>{
    if (props.title[0]=="E"){
        if(newmail.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            
            await contract.changeMail(newmail)
            setaddress(newmail);
            setmailtoggle(!mailtoggle)
        }
        else{
            alert("Enter valid mail address")
        }
    }
    else{
        try {
            let pubkey = new PublicKey(newmail)
            let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
            if (isSolana){
              
                await contract.changeSolanaAdd(newmail.toString())
                setaddress(newmail);
                setmailtoggle(!mailtoggle)
            }
            else{
                alert("Enter valid solana address");
            }
        } catch (error) {
            alert("Enter valid solana address");
        }
     
    }
   
}


    return(
        <>
        <MHidden width="mdDown">
            <Grid container direction="row" bgcolor={"#303030"} padding="20px" borderRadius={1}>
                <Grid item md="2" display="flex" align="center" justifyContent="center">
                    {/* <Box component="i" class="e-icon fa-solid fa-envelope text-info"></Box> */}
                    <Box backgroundColor="rgba(255, 255, 255, 0.1)" width="70px" height="70px" borderRadius="50%" padding="15px"
                        justifyContent="center" display="flex"><Box component="img" src={props.src}></Box></Box>
                    {/* src="my_public/images/address-logo.png" */}
                </Grid>
                <Grid item md="8" spacing={3} direction="column" alignItems="left" display="flex" marginTop="5px" >
                    <Grid fontSize="24px" color="white" sm="12">{props.title}</Grid>
                    <Grid fontSize="15px" color="white" sm="12">{address}
                        {(props.token === 1) ? <Box component="button"onClick={() => {navigator.clipboard.writeText(address)}} backgroundColor="#303030" border="none"><Box component="img" src={imageURL('copy.png')} /></Box> : <Box/>}
                        </Grid>
                </Grid>
                { ! mailtoggle &&       <Grid item container md="2" display="flex" justifyContent="center">
                  <Box onClick={togglemail} component="button" borderRadius={1} marginTop="10px" style={{
                        border:"none",
                        backgroundColor: "#56C5FF",
                        fontSize: "18px",
                        color:'white',
                        height:'65%',
                        width : '100%',
                        justifyContent:"center",
                        alignItems:"center",
                        display:"flex"
                    }}>EDIT</Box> </Grid>}
                    {mailtoggle &&               <Grid item container md="5" display="flex" justifyContent="center" flexDirection="row"> <TextField style={{
                        border:"none",
                        margin:'2%',
                        fontSize: "18px",
                        justifyContent:"center",
                        alignItems:"center",
                        display:"flex",
                        height:'65%',
                        width : '100%',
                       
                    }}
  id="outlined-name"
  label="Name"
  value={newmail}
  onChange={handlemailchange}
/>  <Box onClick={handlesubmit} component="button" borderRadius={1} marginTop="10px" style={{
                        border:"none",
                        backgroundColor: "#56C5FF",
                        fontSize: "18px",
                        color:'white',
                        height:'50%',
                        width : '50%',
                        justifyContent:"center",
                        alignItems:"center",
                        display:"flex"
                    }}>ADD</Box> </Grid> }
               
            </Grid>
        </MHidden>
        <MHidden width="mdUp">
            <Grid container direction="row" bgcolor={"#303030"} padding="15px" borderRadius={1}>
                <Grid item xs="2" display="flex" align="center" justifyContent="center">
                    {/* <Box component="i" class="e-icon fa-solid fa-envelope text-info"></Box> */}
                    <Box backgroundColor="rgba(255, 255, 255, 0.1)" width="50px" height="50px" borderRadius="50%" padding="10px"><Box component="img" src={props.src}></Box></Box>
                    {/* src="my_public/images/address-logo.png" */}
                </Grid>
                <Grid item xs="8" spacing={3} direction="column" paddingLeft="10px" alignItems="left" display="flex" marginTop="0px" >
                    <Grid fontSize="18px" color="white" sm="12">{props.title}</Grid>
                    <Grid fontSize="15px" color="white" sm="12">{props.address}
                        {(props.token === 1) ? <Box component="button" backgroundColor="#303030" border="none"><Box component="img" src={imageURL('copy.png')} /></Box> : <Box/>}
                        </Grid>
                </Grid>
                <Grid item container xs="2" >
                    <Box component="button" borderRadius={0.5} padding="3 8" style={{
                        backgroundColor: "#56C5FF",
                        fontSize: "12px",
                        color:'#FFFFFF',
                        height:'25px',
                        width : '50px',
                        border:"none"
                    }}>EDIT</Box>
                </Grid>
            </Grid>
        </MHidden>
        </>
    );
}
function ProjectCard(props){
    return(
        <>
        <MHidden width="mdDown">
        <Grid bgcolor={"#232323"} padding="20px" borderRadius={1}>
        <Grid fontSize="24px" color="white">{props.title}</Grid>
        <Grid color="#56C5FF" fontSize="34px">{props.amount}</Grid>
        </Grid>
        </MHidden>
        <MHidden width="mdUp">
        <Grid bgcolor={"#232323"} padding="20px" borderRadius={1}>
        <Grid color="#56C5FF" fontSize="14px">{props.title}</Grid>
        <Grid fontSize="19.38px" color="white">{props.amount}</Grid>
        </Grid>
        </MHidden>
        </>
    );
}
function MyProjectCard(props){
    const { pathname, hash } = useLocation();
    const [data,setData] = useState([]);
    const [deals,setDeals] = useState([]);
    const [len,setlen] = useState(0);
    // const [deals,setdeals] = useState([]);
    const tokenAddress = pathname.split('/')[pathname.split('/').length - 1];
    useEffect(() => {
        (async () => {
          
          try {
            if(deals.length==0){
            const response = await apis.getDeals();
            if (response.statusText !== 'OK') return console.log('RESPONSE ->', response);
    
            const pools = response.data.pools;
    
            // console.log("DATA IS",pools);
            setDeals([])
            setDeals(pools);
            // alert(pools.length/2 +1)
            if(pools.length%2==0){
                setlen(pools.length/2)
            }
            else{
                setlen((pools.length/2))
            }
            }
          } catch (e) {
            console.error('error occurred while fetching deals');
          }
        })();
      }, []);
    // useEffect(() => {
    //     (async () => {
    //       const response = await apis.getProjectDetails(tokenAddress, {});
    //       if (response.statusText === 'OK') {
    //         const { pool } = response.data;
    //         setData(pool);
    //         console.log("data is",data);
    //       }
    //     })();
    //   }, []);
// let len= ((deals.length%2==0)?deals.length/2:deals.length/2-1)


    return(
        <>
        { deals.length>0 &&
         deals.map((item,k)=>{
            return(
            <div key = {k}>
     <MHidden width="mdDown">
        <Grid container direction="row" bgcolor={"#232323"} borderRadius={1} padding="15px" marginTop="20px">
            <Grid item md="1">
                <Box component="img" src={imageURL('geni-logo.png')}></Box>
            </Grid>
            <Grid item md="3" align="left" justifyCenter="flex-start">
                <Grid><Box backgroundColor="rgba(255, 255, 255, 0.1)" display="flex" justifyContent="center" width="50%" color="white">{item.status} </Box></Grid>
                <Grid color="white"> {item.name}  </Grid>
            </Grid>
            <Grid item md="2" align="left" justifyCenter="flex-start">
                <Grid color="white">Start In</Grid>
                <Grid color="white"> {item.startDateTime} </Grid>
            </Grid>
            <Grid item md="2" align="left" justifyCenter="flex-start">
                <Grid color="white">End In</Grid>
                <Grid color="white">{item.endDateTime}</Grid>
            </Grid>
            <Grid item md="2" align="left" justifyCenter="flex-start">
                <Grid color="white">Allocation</Grid>
                <Grid color="white"> {item.maxAllocationPerUser} </Grid>
            </Grid>
            <Grid item md="2" alignItems="center" justifyContent="right" display="flex" paddingRight="15px">
                {props.angle === "down" ? <Box component="img" src={imageURL('angle_down.png')}/>
                : <Box component="img" src={imageURL('angle_up.png')}/>}
            </Grid>
        </Grid>
        </MHidden>
            </div>
            )
        })}
        {deals.length==0 &&    <Grid item sm="12" md="6" display="flex" justifyContent={'flex-center'}><Box component="h5" fontFamily={'system-ui'} color="#56C5FF">
                    Loading...</Box></Grid>   }
   
        {/* <MHidden width="mdUp">
        <Grid item container xs={12} bgcolor={"#232323"} padding="15px" border="1px solid #56C5FF" borderRadius={1} boxShadow="0px 6px 50px #000000;">
            <Grid item xs="2">
                <Box component="img" src={imageURL('geni-logo.png')}/>
            </Grid>
            <Grid item xs="8" paddingLeft="10px" align="left" justifyCenter="flex-start">
                <Grid><Box backgroundColor="rgba(255, 255, 255, 0.1)" display="flex" justifyContent="center" width="50%" color="white">Ended</Box></Grid>
                <Grid color="white">GemUni IDO</Grid>
            </Grid>
            <Grid item xs="2" align="center" justifyCenter="center" paddingTop="23px">
                {props.angle === "down" ? <Box component="img" src={imageURL('angle_down.png')} />
                : <Box component="img" src={imageURL('angle_up.png')} />}
            </Grid>
        </Grid>
        <Grid item container xs={12}  bgcolor={"#232323"} padding="15px" marginTop="10px" borderRadius={1} boxShadow="0px 6px 50px #000000;">
            <Grid item xs="7" align="left" justifyCenter="flex-start">
                <Grid color="#F1F0F0" fontSize={15}>Start In</Grid>
                <Grid color="white" paddingTop="15px" fontSize={19}>17/01/22</Grid>
            </Grid>
            <Grid item xs="5" align="left" justifyCenter="flex-start">
                <Grid color="#F1F0F0" fontSize={15}>End In</Grid>
                <Grid color="white" paddingTop="15px" fontSize={19}>17/01/22</Grid>
            </Grid>
            <Grid item xs="7" align="left" marginTop="25px">
                <Grid color="#F1F0F0" fontSize={15}>Allocation</Grid>
                <Grid color="white" paddingTop="15px" fontSize={19}>300</Grid>
            </Grid>
        </Grid>
        </MHidden> */}
        </>
    );
}

function MyLocationCard(){
    const addTokenToMetamask = async() =>{
        
        const tokenAddress = '0x0d40De1c494278252060bb65bA61AD00EDF78d58';
const tokenSymbol = 'MVG';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
    }
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { account } = useActiveWeb3React();
    const network = useSelector((state) => state.network.chainId);
    // const [isLoading, setIsLoading] = useState(true);
    const [pools, SetPools] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get(`/api/bsc/stake`, {});
          if (response.data) {
            SetPools(response.data.data);
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
    // const auth = useAuth(network);
    return(
        <>
        <MHidden width="mdDown">
        <Grid container direction="row" bgcolor="#232323" width="100%" marginTop="30px" borderRadius={1}>
            <Grid container padding='15px'>
                <Grid item sm="12" md="6" display="flex" justifyContent={'flex-start'}><Box component="h5" fontFamily={'system-ui'} color="#56C5FF">
                    Your Location</Box></Grid>
                <Grid  item sm="12" md="6" display="flex" justifyContent={'flex-end'}><Box component="button" onClick={addTokenToMetamask} backgroundColor="#56C5FF" color="white" borderRadius={0.5} border="none" fontFamily={'system-ui'} padding="5px">Add token to metamask</Box></Grid>
            </Grid>
            <Grid container direction="row" bgcolor="rgba(86, 197, 255, 0.1)" height="40px" paddingTop="5px">
                <Grid md="0.5" display="flex" justifyContent="center" color="white">No.</Grid>
                <Grid md="1.5" display="flex" justifyContent="center" color="white">Allocations</Grid>
                <Grid md="1.5" display="flex" justifyContent="center" color="white">Percentage</Grid>
                <Grid md="3" display="flex" justifyContent="center" color="white">Date</Grid>
                <Grid md="3" display="flex" justifyContent="center" color="white">Listing Date</Grid>
                <Grid md="1.5" display="flex" justifyContent="center" color="white">Claimed</Grid>
                <Grid md="1" display="flex" justifyContent="center" color="white">Action</Grid>
            </Grid>
            {pools.length>0 && pools.map((item,k)=>{
                <AllocationList number={k+1}  name={item.tokenName} symb = {item.tokenSymbol} addr = {item.tokenAddress} start={item.startAt} rate = {item.rewardRate}  />
            },[]) 
            }
            {pools.length==0 &&  <Grid item sm="12" md="6" display="flex" justifyContent={'flex-center'}><Box component="h5" fontFamily={'system-ui'} color="#56C5FF">
                    Loading...</Box></Grid>  }
        </Grid>
        </MHidden>
        {/* 56C5FF */}
        {/* No,allocation,percentage,date,listing date,claim,action */}
        <MHidden width="mdUp">
        <Grid container direction="row" bgcolor="#232323" width="100%" marginTop="30px" borderRadius={1}>
            <Grid container padding='15px'>
                <Grid item xs="12" display="flex" justifyContent='center'>
                    <Box component="h5" fontFamily={'system-ui'} color="#56C5FF">
                    Allocation</Box></Grid>
                <Grid item xs="12" display="flex" justifyContent={'flex-end'} marginBottom="30px">
                    <Box component="button" width="100%" backgroundColor="#56C5FF" color="white" borderRadius={0.5} border="none" 
                    fontFamily={'system-ui'} padding="5px">Add token to metamask</Box></Grid>
                <Grid item xs={7} fontSize={15} color="white">Allocations</Grid>
                <Grid item xs={5} fontSize={15} color="white">Percentage</Grid>
                <Grid item xs={7} fontSize={20} color="white">4000 GOLD</Grid>
                <Grid item xs={5} fontSize={20} color="white">10.00%</Grid>
            </Grid>
            <Grid container padding="10px">
                <Grid item xs={12} marginTop="20px" fontSize={15} color="white">Date</Grid>
                <Grid item xs={12} marginTop="10px" fontSize={20} color="white">22/02/2022 to 22/10/2022</Grid>
                <Grid item xs={12} marginTop="20px" fontSize={15} color="white">Claimed</Grid>
                <Grid item xs={12} marginTop="15px" fontSize={20} marginBottom="15px" color="white">0.0000</Grid>
                <Grid item xs="12" display="flex" justifyContent={'flex-end'} marginBottom="10px">
                    <Box component="button" width="100%" backgroundColor="rgba(255, 255, 255, 0.1)" color="#56C5FF" borderRadius={0.5} border="none" 
                    fontFamily={'system-ui'} padding="5px">Claim</Box></Grid>
            </Grid>
        </Grid>
        </MHidden>
        </>
    );
}
function AllocationList(props){
    // const tokenContract = useTokenContract(props.addr);
    const { library, account } = useActiveWeb3React();
    const [staked,setstaked] = useState(0);
    const [rewards, setreward] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const stakingContract = useStakingContract(props.addr);
    useEffect(()=>{
        const getData = async() =>{
            try{
                let stakedr = await stakingContract.balances(account);
                setstaked(stakedr);
                let rewardsr = await stakingContract.earned(account);
                setreward(rewardsr);
            }
            catch(error){
console.log(error);
            }
        }
       getData()
    },[])
  
    const handleHarvest = async () => {
        
        try {
          const tx = await stakingContract.getReward();
          await tx.wait();
        //   navigate(`/stakepad`);
        } catch (err) {
            enqueueSnackbar('Error', {
                variant: 'danger'
              });
          return;
        }
      };
    return(
        <Grid container marginTop='10px' direction="row" height="40px"  fontSize="19px">
            <Grid md="0.5" display="flex" justifyContent="center" color="white">{props.number}</Grid>
            <Grid md="1.5" display="flex" justifyContent="center" color="white">{staked} {props.tokenName}</Grid>
            <Grid md="1.5" display="flex" justifyContent="center" color="white"> {props.rate} %</Grid>
            <Grid md="3" display="flex" justifyContent="center" color="white">  {props.start} to 22/10/2022</Grid>
            <Grid md="3" display="flex" justifyContent="center" color="white"> {props.start} </Grid>
            <Grid md="1.5" display="flex" justifyContent="center" color="white"> {rewards}</Grid>
            <Grid md="1" display="flex" justifyContent="center" bgColor="#303030" width="100%" color="#56C5FF">
                <Box  component="button" onClick={handleHarvest} display="flex" justifyContent="center" backgroundColor="rgba(255, 255, 255, 0.1)" width="70px" height="30px">Claim</Box>
            </Grid>
        </Grid>
    );
}