import axios from 'axios';

export default async function getDataFromSWAPI(endpoint, id = null) {
  try {
    const api = 'https://swapi.co/api/';
    let response = null;
    let url = `${api}${endpoint}`;
    if (id !== null) url += `/${id}`;
    response = await axios.get(url);
    return await response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}