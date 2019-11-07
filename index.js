'use strict';

const baseURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'mFRKOATqycfUwfW2qEiSXOhd76IkOJCGRUwgohAv';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h1>${responseJson.data[i].fullName}</h1></li>
        <li><h4>${responseJson.data[i].description}</h4></li>
        <li><a href=${responseJson.data[i].url} target="_blank">Click For Site</a></li>`
    );}
  $('#results').removeClass('hidden');

  console.log('why am i not displaying');
}

function getParkInfo(query, stateCode, maxResults=10) {
  const states = $('#js-search-term-state').val().replace(' ', '');
  const params = {
    api_key: apiKey,
    q: query,
    stateCode: states,
    // stateCode: $('.adding-state').val(),
    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = baseURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Oops, something went wrong: ${error.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const searchState = $('#js-search-term-state').val();
    const maxResults = $('#js-max-results').val();
    getParkInfo(searchTerm, searchState, maxResults);
  });
//   addState();
}

// function addState() {
//   $('.add-state').on('click', function() {
//     $('.adding-state').removeClass('hidden');
//     console.log('adding state');
//   });
// }

$(watchForm);