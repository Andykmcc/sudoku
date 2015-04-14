(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var utilities = require('./utilities');

module.exports = (function(){
  var gridSize = 9;
  var sudoku = document.querySelector('.js-sudoku');

  sudoku.addEventListener('change', function(event){
    event.preventDefault();
    utilities.checkSudoku(event.currentTarget, gridSize);
  });

})();
},{"./utilities":2}],2:[function(require,module,exports){
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

    if(!this.isSudokuComplete(sudoku, gridSize)){
      this.removeClass(sudoku, 'has-error');
      this.removeClass(sudoku, 'is-finished');
    }
    else if(validateSudoku.validate(sudokuArr, gridSize)){
      this.removeClass(sudoku, 'has-error');
      this.addClass(sudoku, 'is-finished');
    }
    else{
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
},{"./validateSudoku":3}],3:[function(require,module,exports){
'use strict';

module.exports = {

  validate: function(sudoku, gridSize){
    var valid = true;
    for(var i = 0, l = sudoku.length; i < l; i++){
      if(!this.row(sudoku, i, gridSize)){
        valid = false;
        break;
      }
      if(!this.column(sudoku, i, gridSize)){
        valid = false;
        break;
      }
    }
    return valid;
  },

  row: function(sudoku, rowIndex, gridSize){
    return this.checkSet(sudoku[rowIndex], gridSize);
  },

  column: function(sudoku, columnIndex, gridSize){
    return this.checkSet(this.flattenColumn(sudoku, columnIndex), gridSize)
  },

  checkSet: function(set, gridSize){
    if(set.length !== gridSize) return false;
    if(!this.isSetTotalCorrect(set, gridSize)) return false;
    return true;
  },

  isSetTotalCorrect: function(set, gridSize){
    var desiredTotal = this.getSetTotalFromGridSize(gridSize);
    var total = 0;

    for(var i = 0, l = set.length; i < l; i++){
      total = total + set[i];
    }

    return total === desiredTotal;
  },

  getSetTotalFromGridSize: function(gridSize){
    var total = 0;
    while(gridSize){
      total += gridSize--;
    }
    return total;
  },

  flattenColumn: function(sudoku, columnIndex){
    var set = [];

    for(var i = 0, l = sudoku.length; i < l; i++){
      set.push(sudoku[i][columnIndex]);
    }

    return set;
  }

};

},{}]},{},[1]);
