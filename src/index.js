import SlimSelect from 'slim-select';
import {
  fetchBreeds,
  fetchCatByBreed,
  showLoader,
  hideLoader,
  showCatInfo,
  hideCatInfo,
  showError,
  hideError,
} from './cat-api.js';

document.addEventListener('DOMContentLoaded', function () {
  const breedSelect = new SlimSelect({
    select: '.breed-select',
  });

  breedSelect.onChange = function () {
    handleBreedSelect();
  };
});

const breedSelect = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

loaderElement.style.display = 'none';
errorElement.style.display = 'none';
catInfoElement.style.display = 'none';

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function handleBreedSelect() {
  const breedId = breedSelect.selected().value();

  if (breedId) {
    hideCatInfo();
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
      .then(cat => {
        showCatInfo(cat);
      })
      .catch(error => {
        console.error(error);
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  }
}

showLoader();

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    hideLoader();
  });
