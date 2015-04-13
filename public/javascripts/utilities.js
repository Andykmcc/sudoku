'use strict';
var validateSudoku = require('./validateSudoku');

module.exports = {

  convertTableToArray: function(table){
    var sudokuArr = [];
    var rows = table.querySelectorAll('tr');

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

    return sudokuArr;
  },

  checkSudoku: function(sudoku, gridSize){
    var sudokuArr = this.convertTableToArray(sudoku);

    if(validateSudoku.validate(sudokuArr, gridSize)){
      this.removeClass(sudoku, 'has-error');
    }
    else{
      this.addClass(sudoku, 'has-error');
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
  }

};