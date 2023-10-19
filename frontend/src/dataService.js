import axios from 'axios';
import { BASE_URL } from './apiConfig';

export const fetchGroupsAndPersons = () => {
  return axios.all([
    axios.get(`${BASE_URL}/groups`),
    axios.get(`${BASE_URL}/persons`)
  ]);
};

export const addGroups = () => {
  const body = {
    name: document.getElementById('add-group').value
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  return axios.post(`${BASE_URL}/groups`, body, headers);
}

export const addPersons = () => {
  const body = {
    name: document.getElementById('add-person').value
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  return axios.post(`${BASE_URL}/persons`, body, headers);
}

export const addPersonToGroup = () => {
  const groupId = document.getElementById('groupId').value;
  const personId = document.getElementById('personId').value;
  const url = `${BASE_URL}/groups/${groupId}/add-person/${personId}`;
  
  return axios.post(url);
}

