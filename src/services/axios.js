import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://users-demo-api.herokuapp.com"
});
