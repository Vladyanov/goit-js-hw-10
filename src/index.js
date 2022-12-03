import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import country from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let items = [];

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.countryInfo'),
};

const getListTemplate = ({ flags, name }) => `<li class="country-list__item">
        <img src="${flags.png}" alt="${name.official}" width="26" />
        <span class="country-list__text">${name.official}</span>
      </li>`;

const getItemTemplate = ({ flags, name, capital, population, languages }) => ``;

const renderItem = () => {
  refs.countryInfo.insertAdjacentElement('beforeend', markup);
};

const renderList = () => {
  const list = items.map(getListTemplate);
};

const handleData = countries => {
  console.log(countries);
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries.map(getListTemplate).join('');
    console.log(markup);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  }

  if (countries.length === 1) {
  }
};

const handleInput = e => {
  const value = e.currentTarget.value.trim();
  country
    .fetchCountries(value)
    .then(data => handleData(data))
    .catch(error => console.log(error));
  console.log(value);
};

refs.searchInput.addEventListener('input', handleInput);

// debounce(handleInput, DEBOUNCE_DELAY);
