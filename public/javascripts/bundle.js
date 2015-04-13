(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  // doesRowHaveDups: function(row){
  //   var seen = {};
  //   var dups = false;

  //   for(var i = 0, l = row.length; i < l; i++){
  //     if(seen[row[i]] === undefined){
  //       seen[row[i]] = 1;
  //     }
  //     else{
  //       seen[row[i]] = seen[row[i]]+1;
  //       dups = true;
  //     }
  //   }

  //   return dups;
  // },

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
