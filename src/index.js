import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import country from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const clearItems = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
};

const getListTemplate = ({ flags, name }) => `<li class="country-list__item">
        <img src="${flags.png}" alt="${name.official}" width="26" />
        <span class="country-list__text">${name.official}</span>
      </li>`;

const getItemTemplate = ({ flags, name, capital, population, languages }) => {
  let language = Object.values(languages).join(', ');

  return `<img src="${flags.png}" alt="${name.official}" width="80" />
        <span class="country-list__text">${name.official}</span>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Language: </b>${language}</p>`;
};

const handleData = countries => {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const markupList = countries.map(getListTemplate).join('');
    refs.countryList.insertAdjacentHTML('beforeend', markupList);
  }

  if (countries.length === 1) {
    const markupItem = getItemTemplate(countries[0]);
    refs.countryInfo.insertAdjacentHTML('beforeend', markupItem);
  }
};

const handleError = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

const handleInput = e => {
  clearItems();
  const value = e.target.value.trim();
  if (value === '') {
    clearItems();
  }

  country.fetchCountries(value).then(handleData).catch(handleError);
  console.log(value);
};

refs.searchInput.addEventListener(
  'input',
  debounce(handleInput, DEBOUNCE_DELAY)
);
