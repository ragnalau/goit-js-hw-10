import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function toggleError(show) {
  error.style.display = show ? 'block' : 'none';
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = '<option value="">Select a breed</option>'; 

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
        <img src="${cat.url}" alt="Cat Image" />
        <h2>${cat.breeds[0].name}</h2>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
  catInfo.style.display = 'block';
}

async function loadBreeds() {
  try {
    toggleLoader(true);
    toggleError(false);
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
  } catch (err) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  if (!breedId) {
    catInfo.style.display = 'none';
    return;
  }

  try {
    toggleLoader(true);
    toggleError(false);
    const [cat] = await fetchCatByBreed(breedId);
    displayCatInfo(cat);
  } catch (err) {
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
});


window.addEventListener('load', loadBreeds);
