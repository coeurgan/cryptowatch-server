'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CryptoSchema = new Schema({
  code: {
    type: String,
    required: 'Code is mandatory'
  },
  quantity: {
    type: Number,
    required: 'Quantity is mandatory'
  },
  target: {
    type: Number,
    required: 'Target market CAP is mandatory'
  }
});

module.exports = mongoose.model('Cryptos', CryptoSchema);