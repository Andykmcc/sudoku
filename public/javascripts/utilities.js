/*
  Various utility methods that deal with the DOM. 
  Basically a few handy methods that would come 
  with jQuery or zepto. 
 */
'use strict';
var validateSudoku = require('./validateSudoku');

module.exports = {
  // converts the sudoku table into a 2D array. 
  convertTableToArray: function(table){
    var sudokuArr = [];
    var rows = table.querySelectorAll('tr');

    // this could be done a a reduce but a simple for
    // loop is for cross browser compat. and perf. 
    for(var i = 0, l = rows.length; i < l; i++){
      var rowArr = [];
      var row = rows[i];
      var inputs = row.querySelectorAll('.js-input-number');
      for(var j = 0, k = inputs.length; j < k; j++){
        var input = inputs[j];
        rowArr.push(parseInt(input.value, 10));
      }
      sudokuArr.push(rowArr);
    }
    // return the 2D array.
    return sudokuArr;
  },

  // this method determines if the sudoku is valid
  checkSudoku: function(sudoku, gridSize){
    var sudokuArr = this.convertTableToArray(sudoku);

    if(!this.isSudokuComplete(sudoku, gridSize)){
      // if it is incomplete return styling to default state
      this.removeClass(sudoku, 'has-error');
      this.removeClass(sudoku, 'is-finished');
    }
    else if(validateSudoku.validate(sudokuArr, gridSize)){
      // if complete and valid style with success styles. 
      this.removeClass(sudoku, 'has-error');
      this.addClass(sudoku, 'is-finished');
    }
    else{
      // if complete but invalid add error styling. 
      this.addClass(sudoku, 'has-error');
      this.removeClass(sudoku, 'is-finished');
    }
  },

  addClass: function(el, className){
    if (el.classList){
      el.classList.add(className);
    }
    else{
      el.className += ' ' + className;
    }

    return el;
  },

  removeClass: function(el, className){
    if (el.classList){
      el.classList.remove(className);
    }
    else{
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    return el;
  },

  // returns an array or all the values in the sudoku.
  // used as a faster way to check if sudoku is complete.
  getSudokuValues: function(sudoku){
    var inputs = sudoku.querySelectorAll('.js-input-number');
    var values = [];

    for(var i = 0, l = inputs.length; i < l; i++){
      var val = inputs[i].value;
      if(val.length){
        values.push(val);
      }
    }

    return values;
  },

  isSudokuComplete: function(sudoku, gridSize){
    return this.getSudokuValues(sudoku).length === (gridSize*gridSize)
  }

};