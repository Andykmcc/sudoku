'use strict';
var should = require('should');
var sudokus = require('./data/sudokus');
var validateSudoku = require('../public/javascripts/validateSudoku');

describe('valid column', function () {
 it('should be true', function (done) {
   validateSudoku.column(sudokus.valid, 0, 9).should.be.exactly(true);
   done();
 });
});

describe('incomplete column', function () {
 it('should be false', function (done) {
   validateSudoku.column(sudokus.duplicates, 0, 9).should.be.exactly(false);
   done();
 });
});

describe('invalidBox column', function () {
 it('should be false', function (done) {
   validateSudoku.column(sudokus.invalidBox, 0, 9).should.be.exactly(false);
   done();
 });
});

describe('valid row', function () {
 it('should be true', function (done) {
   validateSudoku.row(sudokus.valid, 0, 9).should.be.exactly(true);
   done();
 });
});

describe('incomplete row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.incomplete, 0, 9).should.be.exactly(false);
   done();
 });
});

describe('duplicates row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.duplicates, 0, 9).should.be.exactly(false);
   done();
 });
});

describe('invalidBox row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.invalidBox, 0, 9).should.be.exactly(false);
   done();
 });
});

describe('get row total from grid size', function () {
 it('9x9 should be 45', function (done) {
   validateSudoku.getSetTotalFromGridSize(9).should.equal(45);
   done();
 });
 it('3x3 should be 6', function (done) {
   validateSudoku.getSetTotalFromGridSize(3).should.equal(6);
   done();
 });
});

describe('valid row total', function () {
 it('should be true', function (done) {
   validateSudoku.isSetTotalCorrect(sudokus.valid[0], 9).should.be.exactly(true);
   done();
 });
});

describe('incomplete row total', function () {
 it('should be false', function (done) {
   validateSudoku.isSetTotalCorrect(sudokus.incomplete[0], 9).should.be.exactly(false);
   done();
 });
});

describe('flatten sudoku column', function(){
  it('should be [5,6,1,8,4,7,9,2,3]',function(done){
    validateSudoku.flattenColumn(sudokus.valid, 0).should.containDeepOrdered([5,6,1,8,4,7,9,2,3]);
    done();
  });
});
