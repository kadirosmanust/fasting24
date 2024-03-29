import axios from './axios';

const getRequest = async (url: string, params?: unknown) =>
  axios.get(url, {
    params,
  });

const postRequest = async (url: string, data?: unknown, params?: unknown) =>
  axios.post(url, data, {
    params,
  });

const putRequest = async (url: string, data?: unknown, params?: unknown) =>
  axios.put(url, data, {
    params,
  });

export { getRequest, postRequest, putRequest };
