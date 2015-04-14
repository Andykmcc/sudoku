'use strict';
var utilities = require('./utilities');
var touchUtilities = new (require('./touchUtilities'))();

module.exports = (function(){
  var touchSupport = 'ontouchstart' in document.documentElement;
  var gridSize = 9;
  var sudoku = document.querySelector('.js-sudoku');

  sudoku.addEventListener('change', function(event){
    event.preventDefault();
    utilities.checkSudoku(event.currentTarget, gridSize);
  });

  if(touchSupport){
    touchUtilities.init();
  }

})();