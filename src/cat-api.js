import axios from 'axios';

const API_KEY ='live_uedl1peqOqbjiKzFag3zqTNypcR2zUFTRiqcohGEBM9aoVoRA0BllqxS3JImGsxK';
const API_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${API_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${API_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
