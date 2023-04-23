// themeControl initializes all the data and functions necessary to operate
// the theme and font changing controls
const themeControls = (function() {

  // Elements required for user selected fonts
  let primaryFontElements;
  let secondaryFontElements;
  let fontControls;
  let fontLabel;

  // Elements required for menu controls
  let dropDownMenus = [];

  // Elements required for light-dark mode
  let colorThemeActive = false;
  let toggleSwitches = [];
  let themeElements = {};

  // Capture any necessary variables declared in CSS :root
  const rootStyle = getComputedStyle(document.documentElement);
  const transitionTiming = rootStyle.getPropertyValue('--transition-delay').slice(0, -1);

  function init() {

    loadFontElements();

    // Locate all menu containers
    // -----------------------------------------------------
    let menus = document.querySelectorAll('.dropdown-menu');
    menus.forEach(element => {
      let menuHeader;
      let menuContents;
      let childElements = element.children;

      // Search the children for the header and contents elements
      for(let i = 0; i < childElements.length; i++) {
        let childClasses = childElements[i].classList;
        for(let j = 0; j < childClasses.length; j++) {
          if(childClasses[j] === "dropdown-menu-header") {
            menuHeader = childElements[i];
          };
          if(childClasses[j] === "dropdown-menu-contents") {
            menuContents = childElements[i];
          };
        };
      };
      // Create a new menu object and push it on to the list of page menus
      dropDownMenus.push(new Menu(element, menuHeader, menuContents));
    });
    // -----------------------------------------------------
    
    // Locate all toggle switches
    // -----------------------------------------------------
    let toggles = document.querySelectorAll('.toggle');
    toggles.forEach(element => {
      let toggleButton;
      let childElements = element.children;
      let toggleContainer = element.parentElement;
      let svgElement = element.nextElementSibling;
      for(let i = 0; i < childElements.length; i++) {
        let childClasses = childElements[i].classList;
        for(let j = 0; j < childClasses.length; j++) {
          if(childClasses[j] === "toggle-switch") {
            toggleButton = childElements[i];
          };
        };
      };

      // Create a new toggleSwitch object and push it on to the list
      toggleSwitches.push(new ToggleControl(toggleContainer, element, toggleButton, svgElement));
    });    
    // -----------------------------------------------------

    // Locate all color theme elements
    // -----------------------------------------------------
    themeElements.background = [];
    themeElements.boxShadow = [];
    themeElements.textInput = [];

    document.querySelectorAll('.bg-theme-color').forEach(element => {
      themeElements.background.push(element);
    });
    document.querySelectorAll('.box-shadow').forEach(element => {
      themeElements.boxShadow.push(element);
    });
    document.querySelectorAll('input[type="text"]').forEach(element => {
      themeElements.textInput.push(element);
    });
    // -----------------------------------------------------

    // Initialize event listeners
    fontControls.forEach(element => {
      element.addEventListener('click', function() {
        changeStyle(element);
      });
    });

    toggleSwitches.forEach(item => {
      item.parent.addEventListener('click', function() {
        item.switchToggle();
      })
    });

    dropDownMenus.forEach(menuContainer => {
      menuContainer.element.addEventListener('click', function() {
        showFontMenu(menuContainer.contents);
      });
      menuContainer.element.addEventListener('mouseleave', function() {
        hideFontMenu(menuContainer.contents);
      });
      menuContainer.contents.addEventListener('mouseleave', function() {
        hideFontMenu(menuContainer.contents);
      });
      menuContainer.element.addEventListener('mouseenter', function() {
        stopTimeout(menuContainer.contents);
      });
      menuContainer.contents.addEventListener('mouseenter', function() {
        stopTimeout(menuContainer.contents);
      });

    });

  loadThemeState();
  // End of init() call  
  };


  // Create a menu object for each dropdown menu element
  function Menu(element, header, contents) {
    this.element = element;
    this.header = header;
    this.contents = contents;
  };

  function ToggleControl(parent, element, toggleButton, svgElement) {
    this.parent = parent;
    this.element = element;
    this.toggleButton = toggleButton;
    this.svg = svgElement;
  };

  ToggleControl.prototype.switchToggle = function() {
    let style = this.toggleButton.style.transform;
    if(!style) {
      colorThemeActive = true;
      this.element.style.backgroundColor = 'var(--active-lavender)';
      this.svg.childNodes[0].style.stroke = 'var(--active-lavender)';
      this.toggleButton.style.transform = 'translateX(125%)';
    } else {
      colorThemeActive = false;
      this.element.style.backgroundColor = '';
      this.svg.childNodes[0].style.stroke = '';
      this.toggleButton.style.transform = '';
    }
    loadThemeState();
  };

  function loadFontElements() {
    primaryFontElements = document.querySelectorAll('.font-primary');
    secondaryFontElements = document.querySelectorAll('.font-secondary');
    fontControls = document.querySelectorAll('[data-font]');
    fontLabel = document.getElementById('font-select-label').childNodes[0];
  };

  function stopTimeout(elem) {
    if(elem.timeoutId) {
      clearTimeout(elem.timeoutId);
    }
  };

  function toggleHide(elem) {
    elem.classList.toggle('hidden');
  };

  function showFontMenu(contents) {
    for(let i = 0; i < contents.classList.length; i++) {
      if(contents.classList[i] === 'hidden') {
        toggleHide(contents);
        return;
      }
    }
  };

  function hideFontMenu(contents) {
    if(contents.classList.length > 0) {
      for(let i = 0; i < contents.classList.length; i++) {
        if(contents.classList[i] === 'hidden') {
          return;
        }
      }
    }
    if(contents.timeoutId) {
      clearTimeout(contents.timeoutId);
    }
    contents.timeoutId = setTimeout(() => {
      toggleHide(contents);
    }, parseFloat(transitionTiming) * 1000);
  };

  function loadThemeState() {
    if(colorThemeActive) {
      themeElements.background.forEach(element => {
        element.classList.add('bg-dark');
      });
      themeElements.boxShadow.forEach(element => {
        element.classList.add('box-shadow-dark');
      });
      themeElements.textInput.forEach(element => {
        element.classList.add('text-input-dark');
      });
    } else {
      themeElements.background.forEach(element => {
        element.classList.remove('bg-dark');
      });
      themeElements.boxShadow.forEach(element => {
        element.classList.remove('box-shadow-dark');
      });
      themeElements.textInput.forEach(element => {
        element.classList.remove('text-input-dark');
      });
    }

  };

  function changeStyle(fontSelector) {
    let font = fontSelector.dataset.font
    primaryFontElements.forEach(element => {
      element.style.fontFamily = `${font}`;
    });
    
    // Specific style changes for the language elements based on font selected
    switch(font) {
      case 'var(--sans-serif)':
        secondaryFontElements.forEach(element => {
          element.style.fontWeight = '700';
          element.style.transform = 'translateY(-50%) skew(-10deg)';
        });
        break;
      case 'var(--serif)':
        secondaryFontElements.forEach(element => {
          element.style.fontWeight = '400';
          element.style.transform = 'translateY(-50%) skew(0deg)';
        });
        break;
      case 'var(--mono)':
        secondaryFontElements.forEach(element => {
          element.style.fontWeight = '700';
          element.style.transform = 'translateY(-50%) skew(0deg)';
        });
        break;
      default:
        console.log('Error selected font for secondary font elements');
    };

    fontLabel.textContent = fontSelector.innerHTML;
  };

  // Initialize the state and functionality of the UI
  init();

  return {
    loadFontElements
  };

})();

// Begin module for creating HTML layouts & content
const contentCreate = (() => {

  const dictionaryEntry = document.querySelector('.dictionary-entry');

  function parse(data) {

    if(!data.success) {
      errorContent(data.data);
    } else {
      console.dir(data.data);
    }

  };

  function errorContent(data) {
    dictionaryEntry.innerHTML = '<div id="error-container" class="font-primary"><p id="emoji">&#x1F615;</p><h3 id="error-title"></h3><p id="error-message" class="medium"></p></div>';

    const errorTitle = document.getElementById('error-title');
    const errorMessage = document.getElementById('error-message');

    errorTitle.innerHTML = data.title;
    errorMessage.innerHTML = `${data.message} ${data.resolution}`;

    console.dir(data);
    themeControls.loadFontElements();

  };

  function wordContainer() {
  
    dictionaryEntry.innerHTML = '<div class="word-container"><div class="word-container-child"><h1 id="word" class="font-primary"></h1><p id="phonetics"></p></div><div class="word-container-child"><svg id="play-button" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg></div></div>';
  
    // const wordContainerEl = document.createElement('div');
    // wordContainerEl.setAttribute('class', 'word-container');
    // dictionaryEntry.appendChild(wordContainerEl);
  
    // let subEl = document.createElement('div');
    // subEl.setAttribute('class', 'word-container-child');
    // wordContainerEl.appendChild(subEl);
    // subEl = document.createElement('div');
    // subEl.setAttribute('class', 'word-container-child');
    // wordContainerEl.appendChild(subEl);
  
    // let h1El = document.createElement('h1');
    // h1El.setAttribute('id', 'word');
    // h1El.setAttribute('class', 'font-primary');
    // wordContainerEl.children[0].append(h1El);
  
  };

  return {
    parse
  };

})();

// Global variables required for search
const searchObj = {
  form: document.getElementById('search-form'),
  input: document.getElementById('word-search'),
  url: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
};

// Begin module for fetching & caching API data
const cachedSearch = (function(searchObj) {

  form = searchObj.form;
  input = searchObj.input;
  url = searchObj.url;

  const dataCache = [];

  function search() {

    let word = input.value;
    input.value = "";
  
    // Check the dataCache first
    let cacheResult = searchCache(word);
    
    if(cacheResult) {
      console.dir(cacheResult);
      return { success: true, data: cacheResult };
    } else {
      // This will concatenate the API url with the searched word
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
  results = await cachedSearch.search();
  contentCreate.parse(results);
});