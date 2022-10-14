const base_url = 'https://restcountries.com/v3.1';
const fields_url = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
    
    return fetch(`${base_url}/name/${name}?fields=${fields_url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
      
        });
}
