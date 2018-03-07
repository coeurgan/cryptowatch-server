'use strict';


var mongoose = require('mongoose'),

Crypto = mongoose.model('Cryptos');

exports.list = function(req, response) {
  Crypto.find({}, function(err, cryptos) {
    var service = require('../services/cryptoService');
    if (err)
      response.send(err);
    //var completedCryptos = [];

    service.complete(cryptos, function(completedCryptos) {
        console.log("completedCryptos : " + completedCryptos);
        response.json(completedCryptos);
    });
  });
};



exports.create = function(req, res) {
  var new_crypto = new Crypto(req.body);
  new_crypto.save(function(err, crypto) {
    if (err)
      res.send(err);
    res.json(crypto);
  });
};

exports.read = function(req, res) {
  Crypto.findOne({"code" : req.params.cryptoId}, function(err, crypto) {
    if (err)
      res.send(err);
    res.json(crypto);
  });
};

exports.update = function(req, res) {
  Crypto.findOneAndUpdate({"code" : req.params.cryptoId}, req.body, {new: true}, function(err, crypto) {
    if (err)
      res.send(err);
    res.json(crypto);
  });
};

exports.delete = function(req, res) {
  Crypto.remove({"code" : req.params.cryptoId} , function(err, crypto) {
    if (err)
      res.send(err);
    res.json({ message: 'crypto successfully deleted' });
  });
};

