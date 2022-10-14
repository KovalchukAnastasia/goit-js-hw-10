import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryEl = document.querySelector('.country-list')
const countryCard = document.querySelector('.country-info')

const searchCountry = debounce((event) => {
    event.preventDefault();
    const inputCountry = inputEl.value.trim();
    resetMarkup();
    if (inputCountry === "") {
        return;
    } else {
        fetchCountries(inputCountry)
            .then(data => {
                resetMarkup();
                console.log(data);
                if (data.length > 10) {
                    Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
                    console.log("data.length > 10");
                } else if (data.length === 1) {
                    countryCard.innerHTML = createMarkupCard(data);
                    console.log(createMarkupCard(data));
                } else if (data.length <= 10) {
                    console.log("data.length<=10")
                    countryEl.innerHTML = createMarkupList(data);
                }
            })
            .catch(error => {
                Notiflix.Notify.failure(`Oops, there is no country with that name`);
                resetMarkup();
            });
    }

}, DEBOUNCE_DELAY); 

inputEl.addEventListener('input', searchCountry);
    

function createMarkupCard(name) {

    return name.map(item =>
    `<div>
        <img src="${item.flags.svg}" alt="${item.flags.svg}" width="100" height="70"></img>
      <h2 class="country-title">${item.name.official}</h2>
      <ul class="country-list">
        <li><span class="country-header">Capital: </span> ${item.capital}</li>
        <li><span class="country-header">Population: </span> ${item.population.toLocaleString()} people</li>
        <li><span class="country-header">Languages: </span> ${Object.values(item.languages)}</li>
      </ul>
      </div>`).join('');
     
}

function createMarkupList(name) {
    return name.map(item =>
        `<li class="country-item">
        <img class="country-item-img" src="${item.flags.svg}" alt="${item.flags.svg}" width="50" height="30">
        </img>
        <p class="country-item-text">${item.name.official}</p>
      </li>`).join('');
}


function resetMarkup() {
    countryEl.innerHTML = '';
    countryCard.innerHTML = '';
}



