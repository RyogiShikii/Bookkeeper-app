import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || 'https://5b3dae8d95bf8d0014a1d78a.mockapi.io/api/v1/records'

export const getAll = ()=> axios.get(`${api}/api/v1/records`);

export const create = (body)=> axios.post(`${api}/api/v1/records`,body);
