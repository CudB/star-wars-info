import axios from 'axios';

export default async function getDataFromSWAPI(endpoint, id = null) {
  try {
    let response = null;
    if (id !== null) {
      response = await axios.get(`https://swapi.co/api/${endpoint}/${id}`);
      return await response.data;
    } else {
      response = await axios.get(`https://swapi.co/api/${endpoint}`);
      return await response.data;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}