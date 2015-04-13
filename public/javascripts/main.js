'use strict';
var utilities = require('./utilities');

module.exports = (function(){
  var gridSize = 9;
  var sudoku = document.querySelector('.js-sudoku');

  sudoku.addEventListener('submit', function(event){
    event.preventDefault();
    utilities.checkSudoku(event.target, gridSize);
  });

})();