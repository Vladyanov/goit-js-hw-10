import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.countryInfo'),
};

const handleInput = e => {
  const { value } = e.currentTarget;
  fetch(`https://restcountries.com/v3.1/name/${value}`)
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  console.log(value);
};

refs.searchInput.addEventListener('input', handleInput);
