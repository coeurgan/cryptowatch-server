'use strict';

var mongoose = require('mongoose');
var crypto = require('../models/cryptoModel');
/*
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cryptowatch'); 
var model = require
var controller = require('../controllers/cryptoController');
*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let expect = chai.expect;

chai.use(chaiHttp);

beforeEach(function (done) {
  function clearDB() {
    //console.log("nettoyage de la base" + mongoose.connection.name);
    for (var i in mongoose.connection.collections) {
        //console.log("nettoyage de " + mongoose.connection.name + "/" + mongoose.connection.collections[i].name);
        mongoose.connection.collections[i].remove({}, function(err) { 
            //console.log('collection '+mongoose.connection.collections[i].name+' removed') 
        });
    }
    return done();
  }


  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

beforeEach(function (done) {
  function fillDB()
  {
     crypto.create(
     [
       {code:'BTC',
        quantity: 1.025, 
        target:300000
        }
     ], done);
 }


  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.db.test, function (err) {
      if (err) {
        throw err;
      }
      return fillDB();
    });
  } else {
    return fillDB();
  }
});

describe('Crypto controller module', () => {
    

    
    /*
  * Test the /GET route
  */
  describe('/GET cryptos', () => {
      it('it should GET all the cryptos', (done) => {
        chai.request(server)
            .get('/cryptos')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.equal(1);
                
              done();
            });
      });
      
        it('it should GET BTC information', (done) => {
            chai.request(server)
                .get('/cryptos/BTC')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.code).to.equal('BTC');
                  done();
                });
          });
      
  });
})

