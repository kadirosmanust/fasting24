import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Content-Type': 'application/json',
    },
    });


axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


axiosInstance.interceptors.response.use(function (response) {
    const statusCode = response.status;

    if(statusCode === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response;
  }, function (error) {

    return Promise.reject(error);
});


export default axiosInstance;
