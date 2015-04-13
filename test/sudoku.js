'use strict';
var should = require('should');
var sudokus = require('./data/sudokus');

describe('row count', function () {
 it('should have 9 rows', function (done) {
   var count = sudokus.valid.length;
   count.should.equal(9);
   done();
 });
});