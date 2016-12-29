/* global describe it beforeEach expect */
'use strict'

let chai = require('chai')
let gulpfile = require('../gulpfile')
var expect = chai.expect
var join = require('path').join

chai.should()

let gulp = require('gulp')
// let runSequence = require('run-sequence').use(gulp)
//
// let simpleTask = require('./simpleTask')
// let submodule = require('./submodule')

describe('gulpfile gulp input stream', function () {
  describe('src()', function () {
    it('should return a stream', function (done) {
      var stream = gulp.src(join(__dirname, './fixtures/*.coffee'))
      expect(stream).to.exist
      expect(stream.on).to.exist
      done()
    })
  })
})
