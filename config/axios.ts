import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const forecastEndpoint = (params: any) =>
  `/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

export const searchEndpoint = (params: any) =>
  `/search.json?key=${apiKey}&q=${params.cityName}`;

const instance = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  timeout: 10000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
