'use strict';
var should = require('should');
var sudokus = require('./data/sudokus');
var validateSudoku = require('../public/javascripts/validateSudoku');

describe('valid row', function () {
 it('should be true', function (done) {
   validateSudoku.row(sudokus.valid[0], 9).should.be.exactly(true);
   done();
 });
});

describe('incomplete row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.incomplete[0], 9).should.be.exactly(false);
   done();
 });
});

describe('duplicates row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.duplicates[0], 9).should.be.exactly(false);
   done();
 });
});

describe('invalidBox row', function () {
 it('should be false', function (done) {
   validateSudoku.row(sudokus.invalidBox[0],9 ).should.be.exactly(false);
   done();
 });
});

describe('get row total from grid size', function () {
 it('9x9 should be 45', function (done) {
   validateSudoku.getRowTotalFromGridSize(9).should.equal(45);
   done();
 });
 it('3x3 should be 6', function (done) {
   validateSudoku.getRowTotalFromGridSize(3).should.equal(6);
   done();
 });
});

describe('valid row total', function () {
 it('should be true', function (done) {
   validateSudoku.isRowTotalCorrect(sudokus.valid[0], 9).should.be.exactly(true);
   done();
 });
});

describe('incomplete row total', function () {
 it('should be false', function (done) {
   validateSudoku.isRowTotalCorrect(sudokus.incomplete[0], 9).should.be.exactly(false);
   done();
 });
});