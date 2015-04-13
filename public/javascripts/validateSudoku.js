'use strict';

module.exports = {

  row: function(row, gridSize){
    if(row.length !== gridSize) return false;
    if(! this.isRowTotalCorrect(row, gridSize)) return false;
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

  doesRowHaveDups: function(row){
    var seen = {};
    var dups = false;

    for(var i = 0, l = row.length; i < l; i++){
      if(seen[row[i]] === undefined){
        seen[row[i]] = 1;
      }
      else{
        seen[row[i]] = seen[row[i]]+1;
        dups = true;
      }
    }

    return dups;
  },

  getRowTotalFromGridSize: function(gridSize){
    var total = 0;
    while(gridSize){
      total += gridSize--;
    }
    return total;
  }

};
