'use strict';


var Crypto = require('../models/cryptoModel');
var controller = require('../controllers/cryptoController');
var chai = require('chai');
var expect = chai.expect;


describe('Crypto controller module', () => {
    it('should be defined', () => {
      expect(controller).to.be.an('object');
    })
    it('should export a list function', () => {
      expect(controller.list).to.be.a('function')
    })
})
