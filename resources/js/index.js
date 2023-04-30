// Module containing html element creation code
import contentCreate from './contentCreate.js';

// Global variables required for search
const searchObj = {
  form: document.getElementById('search-form'),
  input: document.getElementById('word-search'),
  url: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
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
  // This prevents the page from submitting and reloading
  event.preventDefault();
  let results = await cachedSearch.search();
  contentCreate.parse(results);
});