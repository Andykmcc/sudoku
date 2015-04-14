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

  var convertYToInput = function(eventY){
    var perc = Math.round((eventY/screenHeight) * 10) === 10 ? 9 : Math.round((eventY/screenHeight) * 10);
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
