(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./touchUtilities":2,"./utilities":3}],2:[function(require,module,exports){
/*
  This is kind of exparimental. it is basically a way to 
  do the sudoku without having contantly deal with the 
  virtual keyboard popping up on the screen all the time. 
 */
module.exports = function(){
  'use strict';

  var screenHeight = null;

  var touchNumber = null;

  var currentInput = null;

  var touchMoveCallback = function(event){
    var inputNumber = convertYToInput(event.targetTouches[0].clientY);

    currentInput.value = touchNumber.textContent = inputNumber;
    triggerChange(currentInput);
  };

  var touchEndCallback = function(){
    currentInput = touchNumber.textContent = null;
  };

  var touchStartCallback = function(event){
    currentInput = event.target;
  };

  // this function converts touches at the top of the screen to 9
  // and touches at the bottom of the screen to 1 and the rest 
  // fall between. 
  var convertYToInput = function(eventY){
    var perc = Math.round(((screenHeight-eventY)/screenHeight) * 10) === 10 ? 9 : Math.round(((screenHeight-eventY)/screenHeight) * 10);
    var x = perc === 0 ? 1 : perc;

    return x;
  };

  var triggerChange = function(el){
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    el.dispatchEvent(event);
  };

  this.init = function(){
    screenHeight = window.innerHeight;
    touchNumber = document.querySelector('.js-touch-number');

    document.addEventListener('touchmove', touchMoveCallback);
    document.addEventListener('touchend', touchEndCallback);
    document.addEventListener('touchstart', touchStartCallback);
  };

};

},{}],3:[function(require,module,exports){
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
},{"./validateSudoku":4}],4:[function(require,module,exports){
/*
  There methods are not attached to the DOM. They are used
  to verify the sudoku and can be easily tested beacuse 
  they are simple computation, no DOM or AJAX.
 */
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
