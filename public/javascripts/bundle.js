(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var validateSudoku = require('./validateSudoku');
var utilities = require('./utilities');

module.exports = (function(){
  console.log('hello world');
})();
},{"./utilities":2,"./validateSudoku":3}],2:[function(require,module,exports){
module.exports = {
  
};
},{}],3:[function(require,module,exports){
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
    if(! this.isSetTotalCorrect(set, gridSize)) return false;
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
