// Module containing html element creation code
import contentCreate from './contentCreate.js';

// Global variables required for search
const searchObj = {
  form: document.getElementById('search-form'),
  input: document.getElementById('word-search'),
  url: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
};

// Working with browser history
const updateHistory = function(searchTerm) {

  history.pushState({ term: searchTerm }, `Searching ${searchTerm}`, `/?search=${searchTerm}`);

};

// Begin module for fetching & caching API data
const cachedSearch = (function(searchObj) {

  let form = searchObj.form;
  let input = searchObj.input;
  let url = searchObj.url;

  const dataCache = [];

  function search() {

    let word = input.value;
    input.value = "";
  
    // Check the dataCache first
    let cacheResult = searchCache(word);
    
    if(cacheResult) {
      return { success: true, data: cacheResult };
    } else {
      // Concatenate the API url with the searched word
      let searchUrl = `${url}${word}`;
      return fetchData(searchUrl);
    }
  };

  async function fetchData(fetchUrl) {

    try {
      const response = await(fetch(fetchUrl));
      if(response.ok) {
        const data = await response.json();
        if(!data) {
          throw new Error('Data not available');
        }
        pushToCache(data[0]);
        return { success: true, data: data[0] };
      } else {
        if(response.status === 404) {
          const data = await response.json();
          if(!data) {
            throw new Error('Data not available');
          }
          console.log('404: data resource not found');
          return { success: false, data: data };
        } else {
          throw new Error('There was an error with the network resource');
        }
      }
    }
    catch (error) {
      console.log("Error encountered: ", error);
    }
  };

  function pushToCache(item) {
    dataCache.push(item);
    if(dataCache.length > 19) {
      dataCache.shift();
    }
  };

  function searchCache(term) {
    for(let item of dataCache) {
      if(item.word === term) {
        return item;
      }
    }
    return null;
  }

  return {
    search,
    fetchData,
    searchCache
  };

})(searchObj);

searchObj.form.addEventListener('submit', async function(event) {
  
  event.preventDefault();

  const searchParent = searchObj.input.parentElement;
  if(searchObj.input.value === '') {
    searchParent.classList.add('error');
    searchObj.input.classList.add('error');
  } else {
    let word = searchObj.input.value;
    searchParent.classList.remove('error');
    searchObj.input.classList.remove('error');
    let results = await cachedSearch.search();

    // Call to create the fetched content
    let success = contentCreate.parse(results);
    updateHistory(word);

  }
});

// Delegated event listener for synonyms & antonyms clicks
document.body.addEventListener('click', async function(event) {

  if(event.target.classList.contains('syn-ant')) {

    event.preventDefault();
    window.scrollTo(0, 0);
    
    searchObj.input.value = event.target.innerText.trim();
    let word = searchObj.input.value;
    let results = await cachedSearch.search();

    // Call to create the fetched content
    let success = contentCreate.parse(results);
    updateHistory(word);

  }

});

// Updates the page content when the user clicks forward or back in the browser
window.addEventListener('popstate', async function(event) {

  let query = new URLSearchParams(window.location.search);
  
  if(query.size > 0) {
    searchObj.input.value = query.get('search');
    let word = searchObj.input.value;
    let results = await cachedSearch.search();
  
    // Call to create the fetched content
    let success = contentCreate.parse(results);
  } else {
    // Refreshes the page, resets to index, if there is no history/query
    history.go();
  }

});