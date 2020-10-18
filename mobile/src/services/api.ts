import axios from 'axios';

const api = axios.create({
  baseURL: 'http://loacalhost:3333',
});

export default api;
