'use strict';


var mongoose = require('mongoose'),

Crypto = mongoose.model('Cryptos');
 var service = require('../services/cryptoService');


exports.list = function(req, response) {
  Crypto.find({}, function(err, cryptos) {
   
    if (err)
      response.send(err);
    //var completedCryptos = [];

    service.complete(cryptos, function(completedCryptos) {
        //console.log("completedCryptos : " + completedCryptos);
        response.json(completedCryptos);
    });
  });
};



exports.create = function(req, res) {
    console.log("exports.create");
  var new_crypto = new Crypto(req.body);
  new_crypto.save(function(err, crypto) {
    if (err)
      res.send(err);
    res.json(crypto);
  });
};

exports.read = function(req, response) {
    Crypto.findOne({"code" : req.params.cryptoId}, function(err, crypto) {
        if (err)
            response.send(err);
        var cryptos = [];
        cryptos.push(crypto)
        service.complete(cryptos, function(completedCryptos) {
            //console.log("completedCryptos : " + completedCryptos);
            response.json(completedCryptos[0]);
        });
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

exports.optionResponse = function(req,res) {
    var message = 'OPTION REQUEST RECEIVED';
    console.log(message);
    res.sendStatus(200);
};

