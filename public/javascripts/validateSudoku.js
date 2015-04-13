'use strict';

module.exports = {

  row: function(sudoku, rowIndex, gridSize){
    return this.checkSet(sudoku[rowIndex], gridSize);
  },

  column: function(sudoku, columnIndex, gridSize){
    return this.checkSet(this.flattenColumn(sudoku, columnIndex), gridSize)
  },

  checkSet: function(set, gridSize){
    if(set.length !== gridSize) return false;
    if(! this.isRowTotalCorrect(set, gridSize)) return false;
    return true;
  },

  isRowTotalCorrect: function(row, gridSize){
    var desiredTotal = this.getRowTotalFromGridSize(gridSize);
    var total = 0;

    for(var i = 0, l = row.length; i < l; i++){
      total = total + row[i];
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

  getRowTotalFromGridSize: function(gridSize){
    var total = 0;
    while(gridSize){
      total += gridSize--;
    }
    return total;
  },

  flattenColumn: function(sudoku, columnIndex){
    var set = [];

    for(var i = 0, l = sudoku.length; i < l; i++){
      set.push(sudoku[columnIndex][i]);
    }

    return set;
  }

};
