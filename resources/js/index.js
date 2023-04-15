// themeControl initializes all the data and functions necessary to operate
// the theme and font changing controls
const themeControls = (function() {

  let fontElements;
  let fontControls;
  let fontLabel;
  let dropDownMenus = [];
  let themeElements;

  // Capture any necessary variables declared in CSS :root
  const rootStyle = getComputedStyle(document.documentElement);
  const transitionTiming = rootStyle.getPropertyValue('--transition-delay').slice(0, -1);

  function init() {
    fontElements = document.querySelectorAll('.font-primary');
    fontControls = document.querySelectorAll('[data-font]');
    fontLabel = document.getElementById('font-select-label').childNodes[0];

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
          }
          if(childClasses[j] === "dropdown-menu-contents") {
            menuContents = childElements[i];
          };
        }
      }
      // Create a new menu object and push it on to the list of page menus
      dropDownMenus.push(new Menu(element, menuHeader, menuContents));
    });
    // -----------------------------------------------------
    
    // Initialize event listeners
    fontControls.forEach(element => {
      element.addEventListener('click', function() {
        changeStyle(element);
      });
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
      menuContainer.element.addEventListener('mouseenter', () => {
        stopTimeout(menuContainer.contents);
      });
      menuContainer.contents.addEventListener('mouseenter', () => {
        stopTimeout(menuContainer.contents);
      });

    });

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

  init();

  return {
    reloadElements,
    addElements,
    removeElements
  };

})();