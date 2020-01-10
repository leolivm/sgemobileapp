import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {NetworkInfo} from 'react-native-network-info';

async function getData() {
  const network = await NetworkInfo.getSSID();
  const valid = await AsyncStorage.getItem('valid');
  const internal = await AsyncStorage.getItem('internal');
  const port = await AsyncStorage.getItem('port');
  const wifi = await AsyncStorage.getItem('wifi');

  const url =
    network === wifi ? `http://${internal}:${port}` : `http://${valid}:${port}`;
  return url;
}

const api = axios.create();
api.interceptors.request.use(
  async config => {
    config.baseURL = await getData();
    return config;
  },
  error => Promise.reject(error),
);

export default api;
