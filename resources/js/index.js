const fontSelector = document.getElementById('font-select-label');
const typefaceSelector = document.getElementById('typeface-selector');
const root = document.documentElement;
const rootStyle = getComputedStyle(root);
const transitionTiming = rootStyle.getPropertyValue('--transition-delay').slice(0, -1);

const toggleHide = function(elem) {
  elem.classList.toggle('hidden');
}

const stopTimeout = function(elem) {
  clearTimeout(elem.timeoutId);
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
  console.dir(typefaceSelector);
  typefaceSelector.timeoutId = setTimeout(() => {
    toggleHide(typefaceSelector);
  }, parseFloat(transitionTiming) * 1000);
}

/* Need to clean up how the timeouts are organized. Right now if you leave the main menu clicker, it sets a timeout that is separate from the timeout when you leave the actual menu...or something like that. If the mouse leaves the menu clicker, after short delay, and doesn't enter the menu it should disappear. If it enters the menu the timeout should clear. If it leaves the menu, after a short delay and then enters the menu clicker, the timeout should clear. If it leaves either, after a short delay, it should trigger and hide the menu.
*/
fontSelector.addEventListener('click', showFontMenu);
fontSelector.addEventListener('mouseout', hideFontMenu);
fontSelector.addEventListener('mouseenter', () => {
  stopTimeout(typefaceSelector);
});
typefaceSelector.addEventListener('mouseenter', () => {
  stopTimeout(typefaceSelector);
});