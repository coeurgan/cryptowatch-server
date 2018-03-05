'use strict';

var controller = require('../controllers/cryptoController');


describe('Crypto controller module', () => {
    it('should export a list function', () => {
      expect(controller.list).to.be.a('function')
    })
})