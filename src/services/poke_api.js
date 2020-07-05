import axios from 'axios';

const POKE_API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default POKE_API;
