'use strict';
var utilities = require('./utilities');
var touchUtilities = new (require('./touchUtilities'))();

module.exports = (function(){
  // simple detection for touch support. not full proof but gets the ob done. 
  var touchSupport = 'ontouchstart' in document.documentElement;
  // set grid size e.g. 9x9 or 3x3... etc. 
  var gridSize = 9;
  // cache the puzzel DOM element. 
  var sudoku = document.querySelector('.js-sudoku');

  // listen for changes that bubble up from inputs. 
  sudoku.addEventListener('change', function(event){
    event.preventDefault();
    utilities.checkSudoku(event.currentTarget, gridSize);
  });

  // if touch is available enable the touch UI.
  if(touchSupport){
    touchUtilities.init();
  }

})();