import axios from 'axios';
import { BASE_URL } from './apiConfig';

export const fetchGroupsAndPersons = () => {
  return axios.all([
    axios.get(`${BASE_URL}/groups`),
    axios.get(`${BASE_URL}/persons`)
  ]);
};
