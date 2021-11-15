import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/',
});

export default clienteAxios;
