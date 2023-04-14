const fontSelector = document.getElementById('font-select-label');
const typefaceSelector = document.getElementById('typeface-selector');
const fontSelectLabel = document.getElementById('font-select-label');
const root = document.documentElement;
const rootStyle = getComputedStyle(root);
const transitionTiming = rootStyle.getPropertyValue('--transition-delay').slice(0, -1);

const toggleHide = function(elem) {
  elem.classList.toggle('hidden');
}

const stopTimeout = function(elem) {
  if(elem.timeoutId) {
    clearTimeout(elem.timeoutId);
  }
}

const showFontMenu = function() {
  for(let i = 0; i < typefaceSelector.classList.length; i++) {
    if(typefaceSelector.classList[i] === 'hidden') {
      toggleHide(typefaceSelector);
      return;
    }
  }
}

const hideFontMenu = function() {
  if(typefaceSelector.classList.length > 0) {
    for(let i = 0; i < typefaceSelector.classList.length; i++) {
      if(typefaceSelector.classList[i] === 'hidden') {
        return;
      }
    }
  }
  if(typefaceSelector.timeoutId) {
    clearTimeout(typefaceSelector.timeoutId);
  }
  typefaceSelector.timeoutId = setTimeout(() => {
    toggleHide(typefaceSelector);
  }, parseFloat(transitionTiming) * 1000);
}

fontSelector.addEventListener('click', showFontMenu);
fontSelector.addEventListener('mouseleave', hideFontMenu);
typefaceSelector.addEventListener('mouseleave', hideFontMenu);
fontSelector.addEventListener('mouseenter', () => {
  stopTimeout(typefaceSelector);
});
typefaceSelector.addEventListener('mouseenter', () => {
  stopTimeout(typefaceSelector);
});

// Testing Stuff
const themeControls = (function() {

  let fontElements;
  let fontControls;
  let fontLabel;
  let dropDownMenus = [];
  let themeElements;

  function init() {
    fontElements = document.querySelectorAll('.font-primary');
    fontControls = document.querySelectorAll('[data-font]');
    fontLabel = document.getElementById('font-select-label').childNodes[0];

    // Locate all menu containers
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
          }
          if(childClasses[j] === "dropdown-menu-contents") {
            menuContents = childElements[i];
          };
        }
      }
      // Create a new menu object and push it on to the list of page menus
      dropDownMenus.push(new Menu(element, menuHeader, menuContents));
    });
    console.dir(dropDownMenus[0]);
  };

  // Create a menu object for each dropdown menu element
  function Menu(element, header, contents) {
    this.element = element;
    this.header = header;
    this.contents = contents;
  };

  Menu.prototype.testFunc = function() {
    return this.name;
  };

  function getFontControls() {
    return fontControls;
  };

  function reloadElements() {

  };

  function addElements() {

  };

  function removeElements() {

  };

  function changeStyle(fontSelector) {
    let font = fontSelector.dataset.font
    fontElements.forEach(element => {
      element.style.fontFamily = `${font}`;
    });
    fontLabel.textContent = fontSelector.innerHTML;
  };

  return {
    init,
    getFontControls,
    reloadElements,
    addElements,
    removeElements,
    changeStyle
  };

})();

themeControls.init();

themeControls.getFontControls().forEach(element => {
  element.addEventListener('click', function() {
    themeControls.changeStyle(element);
  });
});