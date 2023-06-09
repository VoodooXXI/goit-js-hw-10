// Funcția pentru a face cererea HTTP pentru colecția de rase
const apiKey =
  'live_PC2iVW9cXLSUeiKvrOtmdL8GeH6tSoXdG4Sorq2YWfnrLHMRr8bovoXYQ4nZHXEL';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds.');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      showError(error.message);
    });
}

// Funcția pentru a face cererea HTTP pentru informațiile despre pisică în funcție de rasă
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat information.');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      showError(error.message);
    });
}

// Funcția pentru afișarea erorii
function showError(errorMessage) {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}

// Funcția pentru afișarea loaderului
export function showLoader() {
  const loaderElement = document.querySelector('.loader');
  loaderElement.style.display = 'block';
}

// Funcția pentru ascunderea loaderului
export function hideLoader() {
  const loaderElement = document.querySelector('.loader');
  loaderElement.style.display = 'none';
}

// Funcția pentru afișarea informațiilor despre pisică
export function showCatInfo(cat) {
  const catInfoElement = document.querySelector('.cat-info');

  const catImage = document.createElement('img');
  catImage.src = cat[0].url;
  catInfoElement.appendChild(catImage);

  const catName = document.createElement('p');
  catName.textContent = cat[0].breeds[0].name;
  catInfoElement.appendChild(catName);

  const catDescription = document.createElement('p');
  catDescription.textContent = cat[0].breeds[0].description;
  catInfoElement.appendChild(catDescription);

  const catTemperament = document.createElement('p');
  catTemperament.textContent = cat[0].breeds[0].temperament;
  catInfoElement.appendChild(catTemperament);

  catInfoElement.style.display = 'block';
}

// Funcția pentru ascunderea informațiilor despre pisică
export function hideCatInfo() {
  const catInfoElement = document.querySelector('.cat-info');
  catInfoElement.innerHTML = '';
  catInfoElement.style.display = 'none';
}
