import axios from 'axios';
import objToParamString from 'utils/objToParamString';

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: { Accept: 'application/json' },
    timeout: 60 * 5000
  });

  /*const headers = {
    'Content-Type': 'multipart/form-data',
  }*/

  /*==========    GET REQUESTS    ==========*/
  const getDeals = async () => api.get('api/bsc/ido');
  const getEvent = async () => api.get('api/calender/get-events');
  const getBscIdo = async (params) => api.get(`api/bsc/ido?filter=13`);
  const getVCDeals = async (body) => api.get(`api/bsc/ido?filter=12`);
  const getProjectDetails = async (address, params) => api.get(`api/bsc/pool/${address}?${objToParamString(params)}`);
  const getFollowers = async (username) => api.get(`api/get-followers/${username}`);
  const getRandomImages = async (result = 3) => axios.get(`https://randomuser.me/api/?inc=picture&results=${result}`)
  const ipfs = async (id = "QmXRAQ7YecZrV6Yyew2h1Vh9kFHxyuLNEPPYooUDPpRcsf") => axios.get(`https://ipfs.io/ipfs/${id}`);
  /*==========    POST REQUESTS    ==========*/
  const createBscIdo = (body) => api.post('api/create-bsc-ido', body);
  const saveEvent = async (body) => api.post('api/calender/save-event', body);

  /*==========    DELETE REQUESTS    ==========*/

  /*==========    PUT REQUESTS    ==========*/

  return { createBscIdo, getBscIdo, getVCDeals, getProjectDetails, getDeals, getEvent, saveEvent,getFollowers,getRandomImages,ipfs};
};

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const apis = createBackendServer(SERVER_URL);

export default apis;
