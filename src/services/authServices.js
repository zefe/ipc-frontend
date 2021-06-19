import { instance } from './axios';

const login = (data) => {
  return instance.post(`/api/auth`, data);
};

const signup = (data) => {
  return instance.post(`/api/auth/signup`, data);
};

const renewToken = () => {

  let token = localStorage.getItem('token') || '';

  return instance.get(`/api/auth/renew`, {
    headers: {
      'x-token':token
    }
  });
};

export default {
    login,
    signup,
    renewToken
  };