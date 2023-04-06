const fontSelector = document.getElementById('font-select-label');
const typefaceSelector = document.getElementById('typeface-selector');
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